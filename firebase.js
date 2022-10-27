// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// import { } from 'firebase-admin';

const firebaseConfig = {
  apiKey: 'AIzaSyB5ZZOR0k6vO4WCkIf796GweDXwOZn07Go',
  authDomain: 'mbkchat-5b996.firebaseapp.com',
  projectId: 'mbkchat-5b996',
  storageBucket: 'mbkchat-5b996.appspot.com',
  messagingSenderId: '446833616777',
  appId: '1:446833616777:web:01b7fb8be33872169b2358',
  measurementId: 'G-8L2Q44Y3W8',
};

// if (typeof window !== 'undefined' && !firebase.apps) {
//   firebase.initializeApp(firebaseConfig);
// }

// Initialize Firebase

const app = !firebase.getApps().length ? firebase.initializeApp(firebaseConfig) : firebase.getApp();
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
// export const analytics = getAnalytics(app);
