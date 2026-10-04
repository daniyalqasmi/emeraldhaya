import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Default configuration with fallback to environment variables
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoEmeraldHayaKey2026",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "emerald-haya-store.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "emerald-haya-store",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "emerald-haya-store.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "107358688516",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:107358688516:web:emerald_haya_client_app",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-EMERALDHAYA"
};

// Check if credentials are real production keys vs default template
export const isLiveFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_API_KEY !== "YOUR_API_KEY" &&
  import.meta.env.VITE_FIREBASE_API_KEY !== "AIzaSyDemoEmeraldHayaKey2026"
);

// Initialize Firebase App safely
let app;
try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
} catch (e) {
  console.warn("Firebase initialization notice:", e);
}

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
