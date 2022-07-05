import firebase from 'firebase/compat/app';
import 'firebase/compat/app';
import 'firebase/compat/firestore';

export const firebaseConfig = {
    apiKey: 'AIzaSyCNiYovmpPqCN6t9GQp9LslA8ecnpuwiq0',
    authDomain: 'apppoint-352909.firebaseapp.com',
    projectId: 'apppoint-352909',
    storageBucket: 'apppoint-352909.appspot.com',
    messagingSenderId: '144043617238',
    appId: '1:144043617238:web:4ca4529581a24533b19277',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
