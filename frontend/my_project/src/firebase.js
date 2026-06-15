import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADxo8YroIKkwFIt0mIEPv_RoIecfPGDKw",
  authDomain: "inventorymanagementsyste-942b7.firebaseapp.com",
  projectId: "inventorymanagementsyste-942b7",
  storageBucket: "inventorymanagementsyste-942b7.firebasestorage.app",
  messagingSenderId: "594577877856",
  appId: "1:594577877856:web:a63b8ec91028763af84c05",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
