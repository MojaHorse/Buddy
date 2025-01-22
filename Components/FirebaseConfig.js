import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDOS4iDagQDftqHh-TohhPhC5BMFInyU7k",
  authDomain: "buddy-82620.firebaseapp.com",
  projectId: "buddy-82620",
  storageBucket: "buddy-82620.firebasestorage.app",
  messagingSenderId: "675642661759",
  appId: "1:675642661759:web:60c5fe5229bf77d55e584a",
  measurementId: "G-1J8DS4LXT7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

export { app, analytics, db };
