// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBcIzOKjwa210xMswsrQ58RnKdy2F31VIE',
  authDomain: 'wallet-nextjs-firebase.firebaseapp.com',
  projectId: 'wallet-nextjs-firebase',
  storageBucket: 'wallet-nextjs-firebase.appspot.com',
  messagingSenderId: '2900585514',
  appId: '1:2900585514:web:dc76c78b666c83ddc72753',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
