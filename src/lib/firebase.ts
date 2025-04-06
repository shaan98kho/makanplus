import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBFVX9la0UMG6RAfGLpOMZ-agOtf4E9ikM",
  authDomain: "makanplus-e9139.firebaseapp.com",
  projectId: "makanplus-e9139",
  storageBucket: "makanplus-e9139.firebasestorage.app",
  messagingSenderId: "844676094868",
  appId: "1:844676094868:web:af76ee096a75d406c48d81"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app)

export { app, db, auth, firebaseConfig };