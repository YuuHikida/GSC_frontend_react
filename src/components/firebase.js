// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyShkayBVjbCc-nFkm6Y1aEiEHwoqhFrM",
    authDomain: "arctic-conduit-432408-m8.firebaseapp.com",
    projectId: "arctic-conduit-432408-m8",
    storageBucket: "arctic-conduit-432408-m8.firebasestorage.app",
    messagingSenderId: "202287074098",
    appId: "1:202287074098:web:946bffe569ba1359e3652b"
  };

  // Initialize Firebase
const app   = initializeApp(firebaseConfig);
const auth  = getAuth(app);

export{auth};