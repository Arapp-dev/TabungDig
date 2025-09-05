import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
  import { getDatabase, ref, set, get ,child ,remove ,update} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDybTvXoPxI9as3aoem_n0hVJME3u5Vph4",
  authDomain: "database-a9536.firebaseapp.com",
  databaseURL: "https://database-a9536-default-rtdb.firebaseio.com",
  projectId: "database-a9536",
  storageBucket: "database-a9536.firebasestorage.app",
  messagingSenderId: "589733774370",
  appId: "1:589733774370:web:74c6fe821f0808a459b67b"
};


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase(app);
  const dbref = ref(db)

  export { auth ,dbref, db , app , ref, set, get, child , createUserWithEmailAndPassword , signInWithEmailAndPassword , remove ,update }
