import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, type User, } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { readable } from 'svelte/store';

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

/**
  * @description Svelte store for the current user
  * @returns a store with the current firebase user
  */
function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn("Firebase auth unavailable or not in browser.")
    const { subscribe } = readable<User | null>(null);
    return { subscribe };
  }

  const { subscribe } = readable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user)
    });
    return () => unsubscribe();
  });

  return { subscribe, };
}

export const user = userStore();
