// src/firebaseConfig.js or firebaseConfig.js
 
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
 
// ⚠️ STEP 1: STUDENTS MUST REPLACE THESE PLACEHOLDERS
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
// Initialize Cloud Firestore and export it
export const db = getFirestore(app);
 
// Export the app if needed for other services
export default app;
