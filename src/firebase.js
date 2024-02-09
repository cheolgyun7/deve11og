// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAU2tKuqjD6p7SmA5IzBKN7Gvxn5ddWA4w',
  authDomain: 'test-app-772b8.firebaseapp.com',
  projectId: 'test-app-772b8',
  storageBucket: 'test-app-772b8.appspot.com',
  messagingSenderId: '996959188329',
  appId: '1:996959188329:web:a1d40cef8f21d16937b9f8'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
