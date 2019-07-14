import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
/*<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/6.3.0/firebase-app.js"></script>*/

/*<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#config-web-app -->*/

// Your web app's Firebase configuration
  var config = {
    apiKey: "AIzaSyCsOHr1Y2l35wSYt_Zg8vE7inO_9O30p1c",
    authDomain: "bearchat-app.firebaseapp.com",
    databaseURL: "https://bearchat-app.firebaseio.com",
    projectId: "bearchat-app",
    storageBucket: "",
    messagingSenderId: "465344246644",
    appId: "1:465344246644:web:4622decaba1f840b"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

export default firebase;