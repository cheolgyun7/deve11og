// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD0H9YwNzpGGG3kMRGV6MS-odOE92Hy_ms',
  authDomain: 'insert-board.firebaseapp.com',
  projectId: 'insert-board',
  storageBucket: 'insert-board.appspot.com',
  messagingSenderId: '179893443594',
  appId: '1:179893443594:web:79a3c43aa03462569cd3f3'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
