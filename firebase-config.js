// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCNiYovmpPqCN6t9GQp9LslA8ecnpuwiq0',
    authDomain: 'apppoint-352909.firebaseapp.com',
    projectId: 'apppoint-352909',
    storageBucket: 'apppoint-352909.appspot.com',
    messagingSenderId: '144043617238',
    appId: '1:144043617238:web:4ca4529581a24533b19277',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
