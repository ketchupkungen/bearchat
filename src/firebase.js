import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {
  apiKey: "AIzaSyCsOHr1Y2l35wSYt_Zg8vE7inO_9O30p1c",
    authDomain: "bearchat-app.firebaseapp.com",
    databaseURL: "https://bearchat-app.firebaseio.com",
    projectId: "bearchat-app",
    storageBucket: "bearchat-app.appspot.com",
    messagingSenderId: "465344246644",
    appId: "1:465344246644:web:4622decaba1f840b"
};
firebase.initializeApp(config);

export default firebase;
