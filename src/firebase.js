import firebase from "firebase/app";
import "firebase/auth";
// firebase config
const config = {
  apiKey: "AIzaSyBjG3a8vNhUaJU-RmmtbCcOZrY8RMqE-lM",
  authDomain: "seafood-wholesale-ecommerce.firebaseapp.com",
  projectId: "seafood-wholesale-ecommerce",
  storageBucket: "seafood-wholesale-ecommerce.appspot.com",
  messagingSenderId: "950888178333",
  appId: "1:950888178333:web:38e1811f89776254256a74",
  measurementId: "G-62XRY3FFWD",
};
// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
