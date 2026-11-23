import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCdDRXeoBlXCRmUurHkfvfZOW_Ci8oyfzM",
  authDomain: "iwamad-chat-9fea9.firebaseapp.com",
  databaseURL: "https://iwamad-chat-9fea9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iwamad-chat-9fea9",
  storageBucket: "iwamad-chat-9fea9.firebasestorage.app",
  messagingSenderId: "732780670169",
  appId: "1:732780670169:web:7f3e353122850d05ee22c8",
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
