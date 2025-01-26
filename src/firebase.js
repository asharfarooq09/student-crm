import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbRL3OJskjJtgoS5C4JGIQDYUlNIJikGs",
  authDomain: "student-flow-crm.firebaseapp.com",
  projectId: "student-flow-crm",
  storageBucket: "student-flow-crm.firebasestorage.app",
  messagingSenderId: "86132586769",
  appId: "1:86132586769:web:d14a1eb599a01bf015b4b0",
  measurementId: "G-WNR3XC0548"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);