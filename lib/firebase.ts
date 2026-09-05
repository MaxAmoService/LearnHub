// Firebase Configuration — Lazy init (no module-scope Firebase calls)
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "learnhub-eca26.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "learnhub-eca26",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "learnhub-eca26.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "418003067191",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:418003067191:web:07d5378aa8466e21073ab2",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-7GQD24BRCR",
};

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _initAttempted = false;

function tryInit() {
  if (_initAttempted) return;
  _initAttempted = true;
  try {
    _app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    _auth = getAuth(_app);
    _db = getFirestore(_app);
  } catch (e) {
    console.warn("[Firebase] Init failed (missing API key?):", (e as Error).message);
  }
}

export function getApp(): FirebaseApp {
  tryInit();
  return _app!;
}

export function getAuthInstance(): Auth {
  tryInit();
  return _auth!;
}

export function getDb(): Firestore {
  tryInit();
  return _db!;
}
