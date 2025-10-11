// lib/firebase.ts
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBNmY_upIIEGVL-_L4E-k2qz4YvNEsjDwA",
    authDomain: "recipify-4b2e4.firebaseapp.com",
    projectId: "recipify-4b2e4",
    storageBucket: "recipify-4b2e4.firebasestorage.app",
    messagingSenderId: "834052224413",
    appId: "1:834052224413:web:12d0b751e2ce6b8bb8ab74",
    measurementId: "G-H3W66XLM76"
  };

const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
