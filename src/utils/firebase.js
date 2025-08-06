import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCknmvbBO4Lf0By8OwFGlgDIpw5mKm1ZD8",
  authDomain: "netflixgpt-25da1.firebaseapp.com",
  projectId: "netflixgpt-25da1",
  storageBucket: "netflixgpt-25da1.firebasestorage.app",
  messagingSenderId: "676864558898",
  appId: "1:676864558898:web:e8dbd2c3293eac2f22392b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
