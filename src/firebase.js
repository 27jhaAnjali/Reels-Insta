// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwccoyuNfyCNSR2_0tNNlss1Gd_f9pcew",
    authDomain: "reels-7ee1f.firebaseapp.com",
    projectId: "reels-7ee1f",
    storageBucket: "reels-7ee1f.appspot.com",
    messagingSenderId: "759142423802",
    appId: "1:759142423802:web:d6c4ba0540005d21937d43"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth=firebase.auth();

const firestore = firebase.firestore();

export const database = {
    users : firestore.collection('users'),
    posts : firestore.collection('posts'),
    comments : firestore.collection('comments'),
    getTimestamp: firebase.firestore.FieldValue.serverTimestamp()
}
export const storage=firebase.storage()