import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
      } from 'firebase/auth';

const firebaseConfig = {
  apiKey:"AIzaSyCJPgIQ330g9nXtyoIm7nNu84KBbiC2L38",
  authDomain:"zzzz-43fb1.firebaseapp.com",
  projectId:"zzzz-43fb1",
  storageBucket: "zzzz-43fb1.appspot.com",
  messagingSenderId: "509164825828",
  appId:"1:509164825828:web:2dcd26379d996607c050f1",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(firebaseApp);

export {firestore, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged};

