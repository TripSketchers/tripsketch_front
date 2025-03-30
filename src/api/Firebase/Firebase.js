// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCalUYv1bv8AyTT0-rQl0nNBK9Gc-c1SgQ",
  authDomain: "tripsketch-9021d.firebaseapp.com",
  projectId: "tripsketch-9021d",
  storageBucket: "tripsketch-9021d.firebasestorage.app",
  messagingSenderId: "155678519571",
  appId: "1:155678519571:web:38377f2879fc419d606ae6",
  measurementId: "G-CW427EG7Y0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);    //storage 객체를 가져와 줌