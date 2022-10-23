// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { createContext } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB5ZZOR0k6vO4WCkIf796GweDXwOZn07Go',
  authDomain: 'mbkchat-5b996.firebaseapp.com',
  projectId: 'mbkchat-5b996',
  storageBucket: 'mbkchat-5b996.appspot.com',
  messagingSenderId: '446833616777',
  appId: '1:446833616777:web:01b7fb8be33872169b2358',
  measurementId: 'G-8L2Q44Y3W8',
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const FirebaseContext = createContext(null);
// export const analytics = getAnalytics(app);
