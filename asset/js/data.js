import {  auth , db , ref, set, get, child , createUserWithEmailAndPassword , signInWithEmailAndPassword} from './firebaseConfig.js';

// Sekarang kamu aman pakai auth dan db


if(!sessionStorage.getItem("logreg")){
    window.history.back()
    sessionStorage.setItem("udahLogin" , true)
}


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
document.addEventListener('DOMContentLoaded', () => {
function slideToSignUp() {
    slider.classList.add("sliderslide");
    slider2.classList.add("sliderslide2");
    slider3.classList.add("sliderslide3");
    slider4.classList.add("sliderslide4");
    setTimeout(() => {
        
        container1.classList.add("slide2");
        container2.classList.add("slide1");
    }, 1000);

}

function slideToSignIn() {
    slider.classList.remove("sliderslide");
    slider2.classList.remove("sliderslide2");
    slider3.classList.remove("sliderslide3");
    slider4.classList.remove("sliderslide4");
    setTimeout(() => {
        
        container1.classList.remove("slide2");
        container2.classList.remove("slide1");
    }, 1000);


}

  if(sessionStorage.getItem("ubah_data")){
    setTimeout(() => {
    slideToSignUp();
    setTimeout(() => {
        
        sessionStorage.clear()
    }, 2000);
    }, 200);
  }
  signInbtn.addEventListener("click",slideToSignIn)
  signUpbtn.addEventListener("click",slideToSignUp)
});

// Contoh: Menulis data ke path "/users/1"
const submitbtn = document.getElementById("insData")
// const selbtn = document.getElementById("selData")
// const delbtn = document.getElementById("delData")
const updbtn = document.getElementById("updateData")
const tmplBtn = document.getElementById("tmpl")
const masukbtn = document.getElementById("masuk")
 const emailReg = document.getElementById("reg-email");
 const emailLog = document.getElementById("reg-email2");


function insertData() {
  createUserWithEmailAndPassword(auth, emailReg.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      const userId = user.uid; // UID dari Firebase Auth

      // Simpan data tambahan ke Realtime Database
      set(ref(db, "data-user/" + userId), {
        NamaOfstd: Nama.value.trim(),
        saldoStd: saldo.value.trim(),
      }).then(()=>{
          swal({
              title: "Data berhasil Ditambahkan",
              text: "Ke halaman login untuk masuk",
              icon: "success",
              button: "Selesai",
          }).then(()=>{
              location.reload()
          })
      })

    })
    .catch((error) => {
      swal({
            title: "Error",
            text: "error:"+ error.message,
            icon: "error",
            button: "ok",
        });
    });
}
// insert data

// select data
function selectData(){
    const dbref = ref(db)

    get(child(dbref,"data-user/"+ idNumber.value)).then((snapshot)=>{
        if(idNumber.value == ""){
            swal({
            title: "Harap isi id untuk menyelect",
            icon: "error",
            button: "ok",
        });
        }

            if(snapshot.exists()){
                Nama.value = snapshot.val().NamaOfstd               
                saldo.value = snapshot.val().saldoStd                  
            }else{
                swal({
            title: "data Tidak ditemukan di database",
            text: "Coba dengan Id lain",
            icon: "error",
            button: "ok",
        });
            }
        
    })
    .catch((error)=>{
        swal({
        title: "Terjadi kesalahan",
        text: "Error : "+ error,
        icon: "error",
        button: "ok",
    });
    })
}
// update data
function updateData(){
    const displaValpas = (document.getElementById("dispval"))
    const valpassword = (document.getElementById("validate-password"))
    if(displaValpas.style.display == "none"){
        displaValpas.style.display = "flex"
        swal({
            title: "Coba lagi",
            text: "Masukkan passsword lama terlebih dahulu",
            icon: "error",
            button: "ok",
        });
    }else{
        if(idNumber.value == ""){
            swal({
            title: "Harap isi id untuk update data",
            icon: "error",
            button: "ok",
        });
        }else{

        
        get(ref(db,"data-user/" + idNumber.value)).then((snapshot)=>{
                if(snapshot.exists()){
                    if(md5(valpassword.value) == snapshot.val().passwordKolom){
                        update(ref(db, 'data-user/'+ idNumber.value), {
                        
                            NamaOfstd: Nama.value,
                            saldoStd: saldo.value,
                            passwordKolom: md5(password.value)
                            
                            }).then(() => {
                                swal({
                                    title: "Data berhasil diupdate",
                                    text: "Ke halaman login untuk masuk",
                                    icon: "success",
                                    button: "Selesai",
                                    }).then(()=>{
                                        location.reload()
                                    })
                                const container1 = document.querySelector(".container1")
                            }).catch((error) => {
                            console.error("Gagal mengupdate data:", error);
                        });
                    }else{
                         swal({
                            title: "Password lama salah",
                            text: "Coba dengan password lain",
                            icon: "error",
                            button: "ok",
                        });
                    }
                }else{
                     swal({
                            title: "Data Tidak ditemukan",
                            text: "Coba dengan Id lain",
                            icon: "error",
                            button: "ok",
                        });
                }
            })
            
        }
    }
    }
    


// delete data

function deletetData(){
remove(ref(db, 'data-user/'+ idNumber.value), {
}).then(() => {
   swal({
        title: "Data Berhasil dihapus",
        icon: "success",
        button: "ok",
    });
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

 signInWithEmailAndPassword(auth, emailLog.value, Logpassword.value)
        .then((userCredential) => {
            // Signed in 
        const user = userCredential.user;
        const userId = user.uid
        sessionStorage.setItem("userId", userId); // userId dari proses login
        window.location.href = `MainView.html?id=${userId}`;
        sessionStorage.removeItem("logreg")

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
           
        });

}

masukbtn.addEventListener("click", masukHalamanUtama)