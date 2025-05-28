// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { config } from "./config";
import { getFirestore } from "firebase/firestore";


// Initialize Firebase
const app = initializeApp(config.firebase);
export const db = getFirestore(app);
const analytics = getAnalytics(app);