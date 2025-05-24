// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
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
// 이미 초기화된 Firebase 앱이 있는 경우 재사용
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const storage = getStorage(app);

export { storage, auth }; // 필요에 따라 export