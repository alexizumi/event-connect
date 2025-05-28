// src/hooks/useRegistrations.ts
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../services/firebase';
import { useAuth } from './useAuth'; // Assuming you have an auth hook

export interface Registration {
  id?: string;
  userId: string;
  eventId: string;
  registeredAt: Date;
  userName: string;
  eventTitle: string;
  paymentId?: string | null;
  paymentStatus?: string | null;
  cancelledAt?: Date | null;
  status?: string;
}

export function useRegistrations() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerForEvent = async (eventId: string, eventTitle: string) => {
    if (!user) {
      setError('You must be logged in to register for events');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const existingReg = await checkRegistration(eventId);
      if (existingReg) {
        setError('You are already registered for this event');
        return null;
      }

      const registration: Registration = {
        userId: user.uid,
        eventId,
        registeredAt: new Date(),
        userName: user.displayName || 'Anonymous User',
        eventTitle,
        paymentId: null,
        paymentStatus: null,
        cancelledAt: null,
        status: 'active',
      };

      const docRef = await addDoc(
        collection(db, 'registrations'),
        registration,
      );
      return { id: docRef.id, ...registration };
    } catch (err) {
      console.error('Error registering for event:', err);
      setError('Failed to register for event');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const checkRegistration = async (eventId: string) => {
    if (!user) return false;

    try {
      const q = query(
        collection(db, 'registrations'),
        where('userId', '==', user.uid),
        where('eventId', '==', eventId),
      );

      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (err) {
      console.error('Error checking registration:', err);
      return false;
    }
  };

  const cancelRegistration = async (eventId: string) => {
    if (!user) {
      setError('You must be logged in to cancel registration');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const q = query(
        collection(db, 'registrations'),
        where('userId', '==', user.uid),
        where('eventId', '==', eventId),
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('No registration found');
        return false;
      }

      await deleteDoc(doc(db, 'registrations', querySnapshot.docs[0].id));
      return true;
    } catch (err) {
      console.error('Error canceling registration:', err);
      setError('Failed to cancel registration');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerForEvent,
    checkRegistration,
    cancelRegistration,
    loading,
    error,
  };
}
