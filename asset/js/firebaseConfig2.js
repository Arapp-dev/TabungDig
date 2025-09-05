import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
  import { getDatabase, ref, set, get ,child ,remove ,update} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAHf3p08KQPrErQRuwpVefaKRfZ0n7YGOg",
    authDomain: "databasehistoryfinlog.firebaseapp.com",
    databaseURL: "https://databasehistoryfinlog-default-rtdb.firebaseio.com",
    projectId: "databasehistoryfinlog",
    storageBucket: "databasehistoryfinlog.firebasestorage.app",
    messagingSenderId: "892136158083",
    appId: "1:892136158083:web:a344ff3a152f858d74fcb6"
  };

  // Initialize Firebase
  const app2 = initializeApp(firebaseConfig , "app2");
  const db = getDatabase(app2)

  export {db as db2,ref as ref2 , set as set2, get as get2 , child as child2 , remove as remove2 ,update as update2}