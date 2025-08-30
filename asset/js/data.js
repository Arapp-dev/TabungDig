 import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
   import { getDatabase } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";
   import { ref, set , get ,child , update ,remove  } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDybTvXoPxI9as3aoem_n0hVJME3u5Vph4",
    authDomain: "database-a9536.firebaseapp.com",
    databaseURL: "https://database-a9536-default-rtdb.firebaseio.com",
    projectId: "database-a9536",
    storageBucket: "database-a9536.firebasestorage.app",
    messagingSenderId: "589733774370",
    appId: "1:589733774370:web:74c6fe821f0808a459b67b"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);



const idNumber = document.getElementById("idNumber")
const idNumber2 = document.getElementById("idNumber2")
const Nama = document.getElementById("reg-Nama")
const saldo = document.getElementById("saldo")
const Logpassword = document.getElementById("password")
const password = document.getElementById("reg-password")

  const passwordFields = document.querySelectorAll('.input-group');
passwordFields.forEach(group => {
    const matabuka = group.querySelector(".fa-eye")
    const matatutup = group.querySelector(".fa-eye-slash")
    const password = group.querySelector(".password") 
    
    if (!matabuka || !matatutup || !password) return
 
    function cek() {
        if(password.value === "") {
            matabuka.style.display = 'none';
            matatutup.style.display = 'none';
        } else {
            matabuka.style.display = 'none';
            matatutup.style.display = 'block';
        }
    }

    // cek sekali saat halaman load
    cek();

    // cek terus saat input berubah
    password.addEventListener('input', cek);

    
    
    matabuka.addEventListener('click', () => {
        password.type = 'password';
        matabuka.style.display = 'none';
        matatutup.style.display = 'block';
    });

    matatutup.addEventListener('click', () => {
        password.type = 'text';
        matabuka.style.display = 'block';
        matatutup.style.display = 'none';
    });
});

const container1 = document.querySelector(".container1")
const container2 = document.querySelector(".container2")
const slider = document.querySelector(".slider")
const slider2 = document.querySelector(".slider2")
const slider3 = document.querySelector(".slider3")
const slider4 = document.querySelector(".slider4")

const signInbtn = document.getElementById("signin")
const signUpbtn = document.getElementById("signup")

function slideToSignUp() {
    slider.classList.remove("sliderslide");
    slider2.classList.remove("sliderslide2");
    slider3.classList.remove("sliderslide3");
    slider4.classList.remove("sliderslide4");
    setTimeout(() => {
        
        container1.classList.remove("slide2");
        container2.classList.remove("slide1");
    }, 1000);

}

function slideToSignIn() {
    slider.classList.add("sliderslide");
    slider2.classList.add("sliderslide2");
    slider3.classList.add("sliderslide3");
    slider4.classList.add("sliderslide4");
    setTimeout(() => {
        
        container1.classList.add("slide2");
        container2.classList.add("slide1");
    }, 1000);


}
signInbtn.addEventListener("click",slideToSignIn)
signUpbtn.addEventListener("click",slideToSignUp)

// Contoh: Menulis data ke path "/users/1"
const submitbtn = document.getElementById("insData")
// const selbtn = document.getElementById("selData")
// const delbtn = document.getElementById("delData")
const updbtn = document.getElementById("updateData")
const tmplBtn = document.getElementById("tmpl")
const masukbtn = document.getElementById("masuk")



// insert data
function insertData(){
set(ref(db, 'data-user/'+ idNumber.value), {
  idNo: idNumber.value,
  NamaOfstd: Nama.value,
  saldoStd: saldo.value,
  passwordKolom: md5(password.value)

}).then(() => {
    alert("data berhasil ditambahkan")
    slideToSignIn()
}).catch((error) => {
  console.error("Gagal menulis data:", error);
});
}

// select data
function selectData(){
    const dbref = ref(db)

    get(child(dbref,"data-user/"+ idNumber.value)).then((snapshot)=>{
        if(idNumber.value == ""){
            alert("harap isi id untuk menyelect data")
        }

            if(snapshot.exists()){
                Nama.value = snapshot.val().NamaOfstd               
                saldo.value = snapshot.val().saldoStd                  
            }else{
                alert("data tak ditemukan")
            }
        
    })
    .catch((error)=>{
        alert("tidak berhasil,error :   " + error)
    })
}
// update data
function updateData(){
    const displaValpas = (document.getElementById("dispval"))
    const valpassword = (document.getElementById("validate-password"))
    if(displaValpas.style.display == "none"){
        displaValpas.style.display = "flex"
        alert("masukkan password lama terlebih dahulu")
    }else{
        get(ref(db,"data-user/" + idNumber.value)).then((snapshot)=>{
                if(snapshot.exists()){
                    if(md5(valpassword.value) == snapshot.val().passwordKolom){
                        update(ref(db, 'data-user/'+ idNumber.value), {
                        
                            NamaOfstd: Nama.value,
                            saldoStd: saldo.value,
                            passwordKolom: md5(password.value)
                            
                            }).then(() => {
                                alert("data berhasil diupdte")
                                slideToSignIn()
                            }).catch((error) => {
                            console.error("Gagal mengupdate data:", error);
                        });
                    }else{
                        alert("password/id salah")
                    }
                }else{
                    alert("data tak ditemukan")
                }
            })
            
        }
    }
    


// delete data

function deletetData(){
remove(ref(db, 'data-user/'+ idNumber.value), {
}).then(() => {
  alert("data berhasil dihapus")
    location.reload()

}).catch((error) => {
  console.error("Gagal menulis data:", error);
});
}


submitbtn.addEventListener("click",insertData)
// selbtn.addEventListener("click",selectData)
// delbtn.addEventListener("click",deletetData)
updbtn.addEventListener("click",updateData)



function masukHalamanUtama() {
  const dbref = ref(db);

  get(child(dbref, "data-user/" + idNumber2.value)).then((snapshot) => {
    if (snapshot.exists()) {
        if(md5(Logpassword.value) == snapshot.val().passwordKolom){
            window.location.href = `index.html?id=${idNumber2.value}`;
        }else{
            alert("Harap masukkan data yang benar")
        }
    } else {
      alert("ID tidak ditemukan di database.");
    }
  }).catch((error) => {
    alert("Terjadi kesalahan: " + error);
  });
}

masukbtn.addEventListener("click", masukHalamanUtama)