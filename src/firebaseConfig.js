// src/firebaseConfig.js


// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    // Your Firebase config
    apiKey: "AIzaSyDPGt9MGQJAl49dxpjPcds91goudiunhkw",
    authDomain: "imdbclone-1f845.firebaseapp.com",
    projectId: "imdbclone-1f845",
    storageBucket: "imdbclone-1f845.appspot.com",
    messagingSenderId: "402999584232",
    appId: "1:402999584232:web:d846a6033918420136305d",
    measurementId: "G-FZTCBV7J78"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
