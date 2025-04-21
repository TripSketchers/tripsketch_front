// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBirVSmeAX6HCZXBgBS3ykISTam33hmS8A",
  authDomain: "tripsketch-6cb8b.firebaseapp.com",
  projectId: "tripsketch-6cb8b",
  storageBucket: "tripsketch-6cb8b.firebasestorage.app",
  messagingSenderId: "364965269614",
  appId: "1:364965269614:web:949590c92dc84b5844d67f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); //storage 객체를 가져와 줌
