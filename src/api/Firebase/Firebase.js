// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH5d7k4qo7LFPA_HLdzVVrHCljoAxBWDM",
  authDomain: "tripsketch-66e46.firebaseapp.com",
  projectId: "tripsketch-66e46",
  storageBucket: "tripsketch-66e46.firebasestorage.app",
  messagingSenderId: "48000945568",
  appId: "1:48000945568:web:259b23e3dd5ad485eae8c5"
};

// Initialize Firebase
// 이미 초기화된 Firebase 앱이 있는 경우 재사용
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const storage = getStorage(app);

export { storage, auth }; // 필요에 따라 export