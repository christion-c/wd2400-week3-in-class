// src/firebaseConfig.js or firebaseConfig.js
 
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
 
// ⚠️ STEP 1: STUDENTS MUST REPLACE THESE PLACEHOLDERS
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwvEU-45zN4iP0K9UgV1oZoSFz_cstJEs",
  authDomain: "rn-potluck-class-12e72.firebaseapp.com",
  projectId: "rn-potluck-class-12e72",
  storageBucket: "rn-potluck-class-12e72.firebasestorage.app",
  messagingSenderId: "156903421598",
  appId: "1:156903421598:web:e30de648b6635621b62d8f",
  measurementId: "G-5TM764V5RS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 
// Initialize Cloud Firestore and export it
export const db = getFirestore(app);
 
// Export the app if needed for other services
export default app;