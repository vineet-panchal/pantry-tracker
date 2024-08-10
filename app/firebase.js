// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCaAEfq86OnQ9Qwjb9nYsYVbuDGn3c_sI",
  authDomain: "pantry-tracker-reference-2.firebaseapp.com",
  projectId: "pantry-tracker-reference-2",
  storageBucket: "pantry-tracker-reference-2.appspot.com",
  messagingSenderId: "235381094034",
  appId: "1:235381094034:web:ead1580f7dbc3cebbb184b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);