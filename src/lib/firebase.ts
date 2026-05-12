import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAM3AiarmmT15XpGbdtYubhTm14S9KEoV0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sanad-e1a19.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sanad-e1a19",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sanad-e1a19.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "316120582038",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:316120582038:web:b61c3e0a17a77cb720bfb7",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-S7BK69ZZ41"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
