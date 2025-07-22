// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2wyURU0Hey0HXT9SAOgyEtDh2h5TKNrc",
  authDomain: "tripsketch-firebase.firebaseapp.com",
  projectId: "tripsketch-firebase",
  storageBucket: "tripsketch-firebase.firebasestorage.app",
  messagingSenderId: "336452739594",
  appId: "1:336452739594:web:5ee146485522f77d2135f3"
};

// Initialize Firebase
// 이미 초기화된 Firebase 앱이 있는 경우 재사용
// const app = initializeApp(firebaseConfig);
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const storage = getStorage(app);

export { storage, auth }; // 필요에 따라 export