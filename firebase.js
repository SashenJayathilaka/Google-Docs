import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmGcec3A9xbeOJCCnwpo4IKUws0-kSdec",
  authDomain: "tik-tok-clone-fa16b.firebaseapp.com",
  projectId: "tik-tok-clone-fa16b",
  storageBucket: "tik-tok-clone-fa16b.appspot.com",
  messagingSenderId: "1083536451775",
  appId: "1:1083536451775:web:75d0e52b5bf2cb3e1a3e0a",
  measurementId: "G-SB094ZP4WY"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
