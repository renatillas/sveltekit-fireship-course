import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBdiZbLpr83GR5KshPDzl0PicBXCW77-7U",
  authDomain: "fireship-sveltekit-app-rena.firebaseapp.com",
  projectId: "fireship-sveltekit-app-rena",
  storageBucket: "fireship-sveltekit-app-rena.appspot.com",
  messagingSenderId: "1053892167000",
  appId: "1:1053892167000:web:a080f80fcaa3f9cf71112d"
};

export const app = initializeApp(firebaseConfig)
export const db = getFirestore()
export const auth = getAuth()
export const storage = getStorage()
