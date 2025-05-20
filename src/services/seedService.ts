// src/services/seedService.ts

import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import {
  doc,
  getFirestore,
  setDoc,
  Timestamp,
  WriteBatch,
  writeBatch,
} from 'firebase/firestore';

// Firebase configuration
// Consider importing this from an environment file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Types for our Firestore documents
interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  role: 'user' | 'admin';
  createdAt: Timestamp;
  lastLogin: Timestamp;
  preferences: {
    notifications: boolean;
    categories: string[];
  };
  savedEvents: string[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
  createdAt: Timestamp;
}

interface EventLocation {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  virtual: boolean;
  meetingLink: string;
}

interface EventPrice {
  amount: number;
  currency: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  startDate: Timestamp;
  endDate: Timestamp;
  location: EventLocation;
  categoryId: string;
  organizerId: string;
  capacity: number;
  currentAttendees: number;
  imageURL: string;
  status: 'active' | 'cancelled' | 'completed';
  price: EventPrice;
  isPublic: boolean;
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface EventAttendee {
  userId: string;
  displayName: string;
  email: string;
  registeredAt: Timestamp;
  status: 'confirmed' | 'cancelled' | 'waitlist';
  checkInTime: Timestamp | null;
  notes: string | null;
}

interface Registration {
  id: string;
  eventId: string;
  userId: string;
  status: 'confirmed' | 'cancelled' | 'waitlist';
  registeredAt: Timestamp;
  cancelledAt: Timestamp | null;
  paymentStatus: 'completed' | 'pending' | 'failed' | 'free';
  paymentId: string | null;
  addedToCalendar: boolean;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Seeds the database with initial test data
 * @param useBatch Whether to use batch writes (recommended for production)
 * @returns Promise that resolves when seeding is complete
 */
export const seedDatabase = async (useBatch: boolean = true): Promise<void> => {
  if (process.env.NODE_ENV === 'production') {
    console.warn(
      'Warning: Attempting to seed database in production environment',
    );
    // You might want to add additional safeguards here
  }

  try {
    if (useBatch) {
      await seedWithBatch();
    } else {
      await seedWithIndividualWrites();
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

/**
 * Seeds the database using batch writes for better performance and atomicity
 */
const seedWithBatch = async (): Promise<void> => {
  const batchCommits: Promise<void>[] = [];
  let currentBatch: WriteBatch = writeBatch(db);
  let operationCount = 0;
  const MAX_OPERATIONS = 500; // Firestore limit is 500 operations per batch

  // Helper function to manage batch operations
  const addToBatch = (operation: () => void): void => {
    operation();
    operationCount++;

    if (operationCount >= MAX_OPERATIONS) {
      batchCommits.push(currentBatch.commit());
      currentBatch = writeBatch(db);
      operationCount = 0;
    }
  };

  // Users
  const user1: User = {
    uid: 'user123',
    email: 'maria.silva@example.com',
    displayName: 'Maria Silva',
    photoURL: 'https://example.com/maria.jpg',
    role: 'user',
    createdAt: Timestamp.fromDate(new Date('2024-04-25')),
    lastLogin: Timestamp.fromDate(new Date('2024-05-24')),
    preferences: {
      notifications: true,
      categories: ['tech', 'networking', 'education'],
    },
    savedEvents: ['event123', 'event456'],
  };

  const user2: User = {
    uid: 'user456',
    email: 'admin@eventconnect.com',
    displayName: 'Admin User',
    photoURL: 'https://example.com/admin.jpg',
    role: 'admin',
    createdAt: Timestamp.fromDate(new Date('2024-03-01')),
    lastLogin: Timestamp.fromDate(new Date('2024-05-24')),
    preferences: {
      notifications: true,
      categories: ['all'],
    },
    savedEvents: [],
  };

  addToBatch(() => currentBatch.set(doc(db, 'users', 'user123'), user1));
  addToBatch(() => currentBatch.set(doc(db, 'users', 'user456'), user2));

  // Categories
  const category: Category = {
    id: 'category123',
    name: 'Technology',
    description:
      'Tech-related events including workshops, meetups, and conferences',
    iconName: 'code',
    color: '#4285F4',
    createdAt: Timestamp.fromDate(new Date('2024-03-01')),
  };

  addToBatch(() =>
    currentBatch.set(doc(db, 'categories', 'category123'), category),
  );

  // Events
  const event: Event = {
    id: 'event123',
    title: 'React Workshop 2025',
    description: 'Learn the latest React features and best practices',
    longDescription:
      'Join us for a comprehensive workshop covering the latest React features, hooks, state management, and performance optimization techniques. This hands-on session is perfect for developers looking to level up their React skills. Bring your laptop and be ready to code along!',
    startDate: Timestamp.fromDate(new Date('2025-06-23T10:00:00')),
    endDate: Timestamp.fromDate(new Date('2025-06-23T14:00:00')),
    location: {
      address: 'Tech Hub, Av. Paulista 1000, São Paulo',
      coordinates: {
        latitude: -23.565868,
        longitude: -46.649011,
      },
      virtual: false,
      meetingLink: '',
    },
    categoryId: 'category123',
    organizerId: 'user456',
    capacity: 30,
    currentAttendees: 18,
    imageURL: 'https://example.com/react-workshop.jpg',
    status: 'active',
    price: {
      amount: 50,
      currency: 'BRL',
    },
    isPublic: true,
    tags: ['react', 'javascript', 'frontend', 'workshop'],
    createdAt: Timestamp.fromDate(new Date('2024-04-25')),
    updatedAt: Timestamp.fromDate(new Date('2024-04-25')),
  };

  addToBatch(() => currentBatch.set(doc(db, 'events', 'event123'), event));

  // Event Attendees (subcollection)
  const attendee: EventAttendee = {
    userId: 'user123',
    displayName: 'Maria Silva',
    email: 'maria.silva@example.com',
    registeredAt: Timestamp.fromDate(new Date('2024-04-27')),
    status: 'confirmed',
    checkInTime: null,
    notes: 'Would like to discuss job opportunities',
  };

  addToBatch(() =>
    currentBatch.set(
      doc(db, 'events', 'event123', 'attendees', 'user123'),
      attendee,
    ),
  );

  // Registrations
  const registration: Registration = {
    id: 'reg123',
    eventId: 'event123',
    userId: 'user123',
    status: 'confirmed',
    registeredAt: Timestamp.fromDate(new Date('2024-04-27')),
    cancelledAt: null,
    paymentStatus: 'completed',
    paymentId: 'payment123',
    addedToCalendar: true,
  };

  addToBatch(() =>
    currentBatch.set(doc(db, 'registrations', 'reg123'), registration),
  );

  // Commit any remaining operations
  if (operationCount > 0) {
    batchCommits.push(currentBatch.commit());
  }

  // Wait for all batch operations to complete
  await Promise.all(batchCommits);
};

/**
 * Seeds the database using individual write operations
 * Less efficient but simpler for small datasets
 */
const seedWithIndividualWrites = async (): Promise<void> => {
  // Users
  await setDoc(doc(db, 'users', 'user123'), {
    uid: 'user123',
    email: 'maria.silva@example.com',
    displayName: 'Maria Silva',
    photoURL: 'https://example.com/maria.jpg',
    role: 'user',
    createdAt: Timestamp.fromDate(new Date('2024-04-25')),
    lastLogin: Timestamp.fromDate(new Date('2024-05-24')),
    preferences: {
      notifications: true,
      categories: ['tech', 'networking', 'education'],
    },
    savedEvents: ['event123', 'event456'],
  } as User);

  await setDoc(doc(db, 'users', 'user456'), {
    uid: 'user456',
    email: 'admin@eventconnect.com',
    displayName: 'Admin User',
    photoURL: 'https://example.com/admin.jpg',
    role: 'admin',
    createdAt: Timestamp.fromDate(new Date('2024-03-01')),
    lastLogin: Timestamp.fromDate(new Date('2024-05-24')),
    preferences: {
      notifications: true,
      categories: ['all'],
    },
    savedEvents: [],
  } as User);

  // Categories
  await setDoc(doc(db, 'categories', 'category123'), {
    id: 'category123',
    name: 'Technology',
    description:
      'Tech-related events including workshops, meetups, and conferences',
    iconName: 'code',
    color: '#4285F4',
    createdAt: Timestamp.fromDate(new Date('2024-03-01')),
  } as Category);

  // Events
  await setDoc(doc(db, 'events', 'event123'), {
    id: 'event123',
    title: 'React Workshop 2025',
    description: 'Learn the latest React features and best practices',
    longDescription:
      'Join us for a comprehensive workshop covering the latest React features, hooks, state management, and performance optimization techniques. This hands-on session is perfect for developers looking to level up their React skills. Bring your laptop and be ready to code along!',
    startDate: Timestamp.fromDate(new Date('2025-06-23T10:00:00')),
    endDate: Timestamp.fromDate(new Date('2025-06-23T14:00:00')),
    location: {
      address: 'Tech Hub, Av. Paulista 1000, São Paulo',
      coordinates: {
        latitude: -23.565868,
        longitude: -46.649011,
      },
      virtual: false,
      meetingLink: '',
    },
    categoryId: 'category123',
    organizerId: 'user456',
    capacity: 30,
    currentAttendees: 18,
    imageURL: 'https://example.com/react-workshop.jpg',
    status: 'active',
    price: {
      amount: 50,
      currency: 'BRL',
    },
    isPublic: true,
    tags: ['react', 'javascript', 'frontend', 'workshop'],
    createdAt: Timestamp.fromDate(new Date('2024-04-25')),
    updatedAt: Timestamp.fromDate(new Date('2024-04-25')),
  } as Event);

  // Event Attendees (subcollection)
  await setDoc(doc(db, 'events', 'event123', 'attendees', 'user123'), {
    userId: 'user123',
    displayName: 'Maria Silva',
    email: 'maria.silva@example.com',
    registeredAt: Timestamp.fromDate(new Date('2024-04-27')),
    status: 'confirmed',
    checkInTime: null,
    notes: 'Would like to discuss job opportunities',
  } as EventAttendee);

  // Registrations
  await setDoc(doc(db, 'registrations', 'reg123'), {
    id: 'reg123',
    eventId: 'event123',
    userId: 'user123',
    status: 'confirmed',
    registeredAt: Timestamp.fromDate(new Date('2024-04-27')),
    cancelledAt: null,
    paymentStatus: 'completed',
    paymentId: 'payment123',
    addedToCalendar: true,
  } as Registration);
};

/**
 * Clears all seed data from the database
 * Useful for testing or resetting to a clean state
 */
export const clearSeedData = async (): Promise<void> => {
  try {
    const batch = writeBatch(db);

    // Delete users
    batch.delete(doc(db, 'users', 'user123'));
    batch.delete(doc(db, 'users', 'user456'));

    // Delete categories
    batch.delete(doc(db, 'categories', 'category123'));

    // Delete events and subcollections
    batch.delete(doc(db, 'events', 'event123', 'attendees', 'user123'));
    batch.delete(doc(db, 'events', 'event123'));

    // Delete registrations
    batch.delete(doc(db, 'registrations', 'reg123'));

    await batch.commit();
    console.log('Seed data cleared successfully!');
  } catch (error) {
    console.error('Error clearing seed data:', error);
    throw error;
  }
};

/**
 * Creates a development admin panel component to trigger seeding
 * This can be used in your Admin page during development
 */
export const createDevSeedingControls = (): {
  seedDb: () => Promise<void>;
  clearDb: () => Promise<void>;
} => {
  if (process.env.NODE_ENV !== 'development') {
    return {
      seedDb: async () => {
        console.warn('Seeding is only available in development mode');
      },
      clearDb: async () => {
        console.warn('Clearing is only available in development mode');
      },
    };
  }

  return {
    seedDb: () => seedDatabase(true),
    clearDb: clearSeedData,
  };
};

// Add to seedService.ts

export const createAdminUser = async (
  email: string,
  password: string,
): Promise<string> => {
  try {
    // Only allow in development
    if (process.env.NODE_ENV !== 'development') {
      throw new Error('Admin creation only allowed in development');
    }

    const auth = getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const uid = userCredential.user.uid;

    // Create admin user document
    await setDoc(doc(db, 'users', uid), {
      uid,
      email,
      displayName: 'Admin User',
      photoURL: null,
      role: 'admin',
      createdAt: Timestamp.now(),
      lastLogin: Timestamp.now(),
      preferences: {
        notifications: true,
        categories: ['all'],
      },
      savedEvents: [],
    } as User);

    console.log(`Admin user created with UID: ${uid}`);
    return uid;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};

// Export types for use in other parts of the application
export type {
  Category,
  Event,
  EventAttendee,
  EventLocation,
  EventPrice,
  Registration,
  User,
};
