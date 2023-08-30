import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from 'firebase/firestore';
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAPJ_IeIE8lORucarlnrbGQcVJ5tUiResk",
  authDomain: "whats-app-clone-609da.firebaseapp.com",
  databaseURL: "https://whats-app-clone-609da-default-rtdb.firebaseio.com",
  projectId: "whats-app-clone-609da",
  storageBucket: "whats-app-clone-609da.appspot.com",
  messagingSenderId: "893121741382",
  appId: "1:893121741382:web:344156accb0713348a0047",
  measurementId: "G-D257HRQGHB"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();



export {auth, provider};
export default db;

