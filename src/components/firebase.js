// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwdthCcHxOz478l4wGGPpcGck7vSd5h08",
  authDomain: "anime-app-c3e92.firebaseapp.com",
  databaseURL: "https://anime-app-c3e92-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "anime-app-c3e92",
  storageBucket: "anime-app-c3e92.appspot.com",
  messagingSenderId: "913162721960",
  appId: "1:913162721960:web:be7edeef6b08580c9f809d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;