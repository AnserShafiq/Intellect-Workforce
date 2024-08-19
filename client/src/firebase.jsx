// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCX9OGWMsU-li4Z1XJXE_XakMwKuEf1ocg",
    authDomain: "intellect-workforce-175f5.firebaseapp.com",
    projectId: "intellect-workforce-175f5",
    storageBucket: "intellect-workforce-175f5.appspot.com",
    messagingSenderId: "699785918642",
    appId: "1:699785918642:web:2c2d42fead4dc9b259f1ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);