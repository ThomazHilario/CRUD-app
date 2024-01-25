// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2J3u-zfSnpbQE0ca_xBZOGsMX-ihzhXI",
  authDomain: "cadastro-de-clientes-5afa8.firebaseapp.com",
  projectId: "cadastro-de-clientes-5afa8",
  storageBucket: "cadastro-de-clientes-5afa8.appspot.com",
  messagingSenderId: "370561383046",
  appId: "1:370561383046:web:853b3f006e97dc07122f07",
  measurementId: "G-5YCBQDR6J9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Pegando referencia do banco
const database = getFirestore(app);

// Autenticação de usuarios
const auth = getAuth(app)

// Autenticacao do storage
const storage = getStorage(app)

export {auth, database, storage}