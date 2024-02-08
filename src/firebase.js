// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBQdIe9qX9RtyflTQ6WOxqUHrsZwn-f_cs',
  authDomain: 'deve11og.firebaseapp.com',
  projectId: 'deve11og',
  storageBucket: 'deve11og.appspot.com',
  messagingSenderId: '320210316524',
  appId: '1:320210316524:web:2dccecd838fb5f40da89c9'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
