import { initializeApp } from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxwSrKZKRy_k_LBi0EDQrD8Yc4CWsPWXg",
  authDomain: "significant-a7862.firebaseapp.com",
  projectId: "significant-a7862",
  storageBucket: "significant-a7862.firebasestorage.app",
  messagingSenderId: "1031773718721",
  appId: "1:1031773718721:web:d559f65fd69849a45eac40",
  measurementId: "G-ETCST0M4CT"
};

const app = initializeApp(firebaseConfig);
export { app };