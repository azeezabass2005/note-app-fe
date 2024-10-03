// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIJt9dmGVVhOpD_5j5vup2n1GQW8EatCY",
  authDomain: "noteapp-dd58e.firebaseapp.com",
  projectId: "noteapp-dd58e",
  storageBucket: "noteapp-dd58e.appspot.com",
  messagingSenderId: "1001226357071",
  appId: "1:1001226357071:web:872ec91c415effe4de1d3a",
  measurementId: "G-09DLWQF106"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)