// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB5ZZOR0k6vO4WCkIf796GweDXwOZn07Go',
  authDomain: 'mbkchat-5b996.firebaseapp.com',
  projectId: 'mbkchat-5b996',
  storageBucket: 'mbkchat-5b996.appspot.com',
  messagingSenderId: '446833616777',
  appId: '1:446833616777:web:01b7fb8be33872169b2358',
  measurementId: 'G-8L2Q44Y3W8',
};

let app;

if (typeof window !== 'undefined' && !firebase.getApps().length) {
  app = firebase.initializeApp(firebaseConfig);
  const authTemp = getAuth();
  setPersistence(authTemp, browserSessionPersistence);
}
// Initialize Firebase
// export const auth = app ? getAuth() : {};
export const auth = app && getAuth();
export const storage = app && getStorage();
export const db = app && getFirestore();
// export const analytics = getAnalytics(app);
