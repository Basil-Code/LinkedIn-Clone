import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5bLw8CbcV2q_mWXPI065rQug_oSZa1O8",
  authDomain: "linkedin-clone-bt.firebaseapp.com",
  projectId: "linkedin-clone-bt",
  storageBucket: "linkedin-clone-bt.appspot.com",
  messagingSenderId: "875897396845",
  appId: "1:875897396845:web:9ee1d9997d57f972982964",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
// const currentUser = auth.currentUser;

export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export { db };
