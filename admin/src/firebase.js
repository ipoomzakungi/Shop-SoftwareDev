// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIp4ABsZG57HwFMy1WceNZmUvyQQSWRRs",
  authDomain: "shop-35e67.firebaseapp.com",
  projectId: "shop-35e67",
  storageBucket: "shop-35e67.appspot.com",
  messagingSenderId: "173919433478",
  appId: "1:173919433478:web:0b21c64619eb726f4ae487",
  measurementId: "G-Y9WXZZBT9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;