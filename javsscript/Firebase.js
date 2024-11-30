// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCTxMlYaue4-fLbvdqiV7AeIttRhIYYwKc",
    authDomain: "cat-and-coffee.firebaseapp.com",
    projectId: "cat-and-coffee",
    storageBucket: "cat-and-coffee.appspot.com",
    messagingSenderId: "325703037045",
    appId: "1:325703037045:web:b6e8f6d34190f487b8083c",
    measurementId: "G-6J01969JH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
