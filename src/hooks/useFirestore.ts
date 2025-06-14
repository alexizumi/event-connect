// src/hooks/useFirestore.ts
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../services/firebase';

export interface Event {
  id?: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
  createdBy: string;
  createdAt: Timestamp;
  location?: string;
  price?: number;
  eventUrl?: string;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getEvents = async () => {
    setLoading(true);
    try {
      const eventsCollection = collection(db, 'events');
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Event[];
      setEvents(eventsList);
    } catch (err) {
      setError('Failed to fetch events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getEvent = async (id: string) => {
    try {
      const eventDoc = doc(db, 'events', id);
      const eventSnapshot = await getDoc(eventDoc);
      if (eventSnapshot.exists()) {
        return { id: eventSnapshot.id, ...eventSnapshot.data() } as Event;
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const addEvent = async (eventData: Omit<Event, 'id' | 'createdAt'>) => {
    try {
      const newEvent = {
        ...eventData,
        createdAt: Timestamp.now(),
      };
      const docRef = await addDoc(collection(db, 'events'), newEvent);
      return { id: docRef.id, ...newEvent };
    } catch (err) {
      console.error(err);
      throw new Error('Failed to add event');
    }
  };

  const updateEvent = async (id: string, eventData: Partial<Event>) => {
    try {
      const eventRef = doc(db, 'events', id);
      console.log('Updating eventRef:', eventRef);
      await updateDoc(eventRef, eventData);
      return true;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to update event');
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'events', id));
      return true;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to delete event');
    }
  };

  return {
    events,
    loading,
    error,
    getEvents,
    getEvent,
    addEvent,
    updateEvent,
    deleteEvent,
  };
};
