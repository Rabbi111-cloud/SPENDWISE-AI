import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMC1wCWyuE3BiqMjTzOvrQ2sAciwaidR0",
  authDomain: "spendwise-ai-bb2fe.firebaseapp.com",
  projectId: "spendwise-ai-bb2fe",
  storageBucket: "spendwise-ai-bb2fe.firebasestorage.app",
  messagingSenderId: "823587670120",
  appId: "1:823587670120:web:fe599b8e3c7915a60f93dd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
