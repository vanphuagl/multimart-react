// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS3X2ZWxrs_XtW_KP58vOssfoL2h9k7Lo",
  authDomain: "multimart-shop.firebaseapp.com",
  projectId: "multimart-shop",
  storageBucket: "multimart-shop.appspot.com",
  messagingSenderId: "371282172701",
  appId: "1:371282172701:web:b7b9200a418bf3f254dff4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
