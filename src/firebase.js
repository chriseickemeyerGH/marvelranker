import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA8c-T_d3TPZKkEzX5eR8Jkx0NFF2NR1MA",
  authDomain: "votertest-52c39.firebaseapp.com",
  databaseURL: "https://votertest-52c39.firebaseio.com",
  projectId: "votertest-52c39",
  storageBucket: "votertest-52c39.appspot.com",
  messagingSenderId: "325101307784",
  appId: "1:325101307784:web:a2dc7f6e78351466"
};

firebase.initializeApp(config);

export default firebase;
