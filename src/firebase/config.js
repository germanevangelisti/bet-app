import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCfdHdIEaqHDIZHPTMmJ3V_7TKF4WMcFhs",
  authDomain: "bet-app-d9203.firebaseapp.com",
  projectId: "bet-app-d9203",
  storageBucket: "bet-app-d9203.appspot.com",
  messagingSenderId: "417238423651",
  appId: "1:417238423651:web:8664c57554a74b8c858056",
  measurementId: "G-EFZMKG378M",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { collection, getDocs, db };
