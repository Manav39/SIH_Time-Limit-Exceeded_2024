import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDjXoLYTUH0jh_bk0lPKwrGpG2Ta54X0Yc",
  authDomain: "sih-tle.firebaseapp.com",
  projectId: "sih-tle",
  storageBucket: "sih-tle.appspot.com",
  messagingSenderId: "331123955779",
  appId: "1:331123955779:web:34a5a090750c13a7bd1cf6"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const FirebaseAuth = getAuth(app);
export const db = getFirestore(app);
