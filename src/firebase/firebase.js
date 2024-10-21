import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAwy-ewFa3c2GqaDDJsZqnLsliCwREZLOo",
  authDomain: "xman-6676a.firebaseapp.com",
  projectId: "xman-6676a",
  storageBucket: "xman-6676a.appspot.com",
  messagingSenderId: "183652235953",
  appId: "1:183652235953:web:ac15fc67bb4f0926be8090"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };