import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCJPgIQ330g9nXtyoIm7nNu84KBbiC2L38",
  authDomain: "zzzz-43fb1.firebaseapp.com",
  projectId: "zzzz-43fb1",
  storageBucket: "zzzz-43fb1.appspot.com",
  messagingSenderId: "509164825828",
  appId: "1:509164825828:web:2dcd26379d996607c050f1"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

export { firestore };