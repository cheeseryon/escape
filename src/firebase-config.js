import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
      } from 'firebase/auth';

const firebaseConfig = {
/*   apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID, */

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

