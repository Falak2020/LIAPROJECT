// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvl5JbwKPLQ-dRD0YvsZErsKPGnQoJvMY",
  authDomain: "fir-auth-e9322.firebaseapp.com",
  projectId: "fir-auth-e9322",
  storageBucket: "fir-auth-e9322.appspot.com",
  messagingSenderId: "531683786329",
  appId: "1:531683786329:web:121afdeb2a4f3dd1857b48"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}
else{
    app = firebase.app()
}


const auth = firebase.auth();

export {auth}