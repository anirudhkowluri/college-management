// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfCC0c_X5Ba_d3eaMAJMe_pXppiWcL1JI",
  authDomain: "student-management-ed123.firebaseapp.com",
  projectId: "student-management-ed123",
  storageBucket: "student-management-ed123.appspot.com",
  messagingSenderId: "321270948285",
  appId: "1:321270948285:web:ea426dcffbe87dc991b2d4",
  measurementId: "G-CDKDWEC0R6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
