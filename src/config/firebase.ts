import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  const extra = Constants.expoConfig?.extra;
  
  if (!extra) {
    console.error('Configuration extras:', extra);
    throw new Error('Missing Expo configuration extras. Make sure your .env file is properly set up.');
  }

  const requiredVars = [
    'firebaseApiKey',
    'firebaseAuthDomain',
    'firebaseProjectId',
    'firebaseStorageBucket',
    'firebaseMessagingSenderId',
    'firebaseAppId'
  ];

  const missingVars = requiredVars.filter(varName => !extra[varName]);
  
  if (missingVars.length > 0) {
    console.error('Available config:', Object.keys(extra));
    throw new Error(
      `Missing required Firebase configuration variables: ${missingVars.join(', ')}.\n` +
      'Please check your .env file and make sure all variables are set.'
    );
  }

  // Log the config for debugging (remove in production)
  console.log('Firebase config loaded:', {
    apiKey: extra.firebaseApiKey ? '**exists**' : '**missing**',
    authDomain: extra.firebaseAuthDomain ? '**exists**' : '**missing**',
    projectId: extra.firebaseProjectId ? '**exists**' : '**missing**',
  });

  return extra;
};

// Get and validate configuration
const config = validateFirebaseConfig();

const firebaseConfig = {
  apiKey: config.firebaseApiKey,
  authDomain: config.firebaseAuthDomain,
  projectId: config.firebaseProjectId,
  storageBucket: config.firebaseStorageBucket,
  messagingSenderId: config.firebaseMessagingSenderId,
  appId: config.firebaseAppId,
};

let app;
let auth;
let db;
let storage;

try {
  // Initialize Firebase (only if not already initialized)
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    // Initialize Auth with AsyncStorage persistence immediately after app initialization
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  } else {
    app = getApps()[0];
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  }

  // Initialize Firestore
  db = getFirestore(app);

  // Initialize Storage
  storage = getStorage(app);

  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw new Error(`Failed to initialize Firebase: ${error.message}`);
}

// Export initialized services
export { app, auth, db, storage };

// Export types
export type { FirestoreUser, FirestoreListing, FirestoreService } from '../../backend/config/firebase';

export default app; 