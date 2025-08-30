
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBiCQ1ABcqiH88U21EfDUqGB_08o-TlaYY",
    authDomain: "auth-55e63.firebaseapp.com",
    projectId: "auth-55e63",
    storageBucket: "auth-55e63.firebasestorage.app",
    messagingSenderId: "558157064814",
    appId: "1:558157064814:web:e4262f7630323c6ef1d47f"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)

    const container1 = document.querySelector(".container1")
    const container2 = document.querySelector(".container2")
    const slider = document.querySelector(".slider")
    const slider2 = document.querySelector(".slider2")
    const slider3 = document.querySelector(".slider3")
    const slider4 = document.querySelector(".slider4")


  const submitLog = document.getElementById("btn_signin")
  const submitReg = document.getElementById("btn_signup")

  submitReg.addEventListener("click",function (){
      const namareg = document.getElementById("reg-Nama").value;
      const emailReg = document.getElementById("reg-email").value;
      const passwordReg = document.getElementById("reg-password").value;
      createUserWithEmailAndPassword(auth, emailReg, passwordReg)
      .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          alert("Membuat akun...")
          slider.classList.remove("sliderslide");
        slider2.classList.remove("sliderslide2");
        slider3.classList.remove("sliderslide3");
        slider4.classList.remove("sliderslide4");
        setTimeout(() => {
            
            container1.classList.remove("slide2");
            container2.classList.remove("slide1");
        }, 1000);
        alert("LOGIN DENGAN AKUN YANG ANDA BUAT")
          // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });
  })
    submitLog.addEventListener("click",function (){
        const emailLog = document.getElementById("email").value;
        const passwordLog = document.getElementById("password").value;
        signInWithEmailAndPassword(auth, emailLog, passwordLog)
        .then((userCredential) => {
            // Signed in 
        const user = userCredential.user;
        alert("Masuk akun...")
        slider.classList.add("sliderslide");
        slider2.classList.add("sliderslide2");
        slider3.classList.add("sliderslide3");
        slider4.classList.add("sliderslide4");

            
            
        document.body.style.backgroundColor = "white"
       
        // ...
        setTimeout(() => {
          window.location.href = "index.html";  // Arahkan ke halaman utama
        }, 2000);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
           
        });
    });