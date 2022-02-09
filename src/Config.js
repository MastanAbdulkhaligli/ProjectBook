import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJox4fbv8BlKf0oU_CSXFyBuGBvgaeNrk",
  authDomain: "simple-blog-915c1.firebaseapp.com",
  projectId: "simple-blog-915c1",
  storageBucket: "simple-blog-915c1.appspot.com",
  messagingSenderId: "770174100588",
  appId: "1:770174100588:web:18ef909039d7ec0575a449",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const storage = getStorage(app);
