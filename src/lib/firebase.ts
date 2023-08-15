import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, type Unsubscribe as AuthUnsubscribe, type User, signInWithPopup, GoogleAuthProvider, } from 'firebase/auth';
import { doc, getFirestore, onSnapshot, type Unsubscribe as SnapshotUnsubscribe } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { derived, readable, type Readable } from 'svelte/store';

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

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}


/**
  * @description Svelte store for the current user
  * @returns a store with the current firebase user
  */
function userStore() {
  let unsubscribe: AuthUnsubscribe;

  if (!auth || !globalThis.window) {
    console.warn("Firebase auth unavailable or not in browser.")
    const { subscribe } = readable<User | null>(null);
    return { subscribe };
  }

  const { subscribe } = readable<User | null>(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user)
    });
    return () => unsubscribe();
  });

  return { subscribe };
}

export const user = userStore();


export function docStore<T>(path: string) {
  let unsubscribe: SnapshotUnsubscribe;

  const docRef = doc(db, path);

  const { subscribe } = readable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, snapshot => {
      set(snapshot.data() as T ?? null);
    })

    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  }
}

interface UserData {
  username: string;
  bio: string;
  photoURL: string;
  links: any[];
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
  if ($user) {
    return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
  } else {
    set(null);
  }
})
