import{ auth , db ,dbref, ref, set, get, child , push ,remove, createUserWithEmailAndPassword , signInWithEmailAndPassword ,update} from "./firebaseConfig.js"
// import{  db2, ref2, set2, get2, child2} from "./firebaseConfig2.js"




if(sessionStorage.getItem("udahLogin")){
    swal({
        title: "Kesalahan",
        text: "Anda sudah login,Harap logout jika ingin ke halaman Login dan registrasi",
        icon: "error",
        button: "ok",
    }).then(()=>{
        sessionStorage.removeItem("udahLogin")
    })
}
  const urlParam = new URLSearchParams(window.location.search)
  const id = urlParam.get("id")


//  --------------- mata di password---------------
  const matabuka = document.querySelector(".fa-eye")
  const matatutup = document.querySelector(".fa-eye-slash")
 function cek() {
        if(password.value === "") {
            matabuka.style.display = 'none';
            matatutup.style.display = 'none';
        } else {
            matabuka.style.display = 'none';
            matatutup.style.display = 'block';
        }
    }

    cek();
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

// ------------select-----------

const kurangDisp = document.getElementById("kurang")
const tambahDisp = document.getElementById("tambah")
const selectKat = document.getElementById("selectKat")
let Kurangi = false
let tambahi = true
let SelDipencet = false
let KatKur = "Kurangi Saldo"
let KatTam = "Tambah Saldo"
let kategoriPerubahan = KatTam

kurangDisp.addEventListener("change", function(){
    selectKat.innerHTML = KatKur
     Kurangi = true
     tambahi = false
     SelDipencet = true
     kategoriPerubahan = KatKur

})
tambahDisp.addEventListener("change", function(){
    selectKat.innerHTML = KatTam
    tambahi = true
    Kurangi = false
    SelDipencet = true
    kategoriPerubahan = KatTam

})




    //  --------------- animasi submit---------------

  function animate_submit(){
        const button = document.getElementById('submit');
      const originalText = button.textContent;
      
      button.disabled = true;
      button.innerHTML = '<span class="inline-block animate-spin mr-2">↻</span> Proses...';
      
      setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          button.classList.remove('bg-green-500');
          button.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
        }, 2000);
      }

      //  --------------- Submit fungsi ---------------

 function submitPayment() {
    
    const saldo = document.getElementById("saldo")
    const deskripsi = document.getElementById("deskripsi")
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    let saldoBaru = null
    let saldoInput = saldo.value
    if (saldoInput == "") {
        saldoInput = 0
    }
    animate_submit()
    document.getElementById("load2").style.display = "flex"
    
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const userId = user.uid
                setTimeout(() => {
                
                if(!SelDipencet){
                    swal({
                        
            
                        title: 'Yakin ingin melanjutkan?',
                        text: "Karena kategori belum diubah jadi default Tambah saldo",
                        icon: 'warning',
                        buttons: {
                            cancel: true,
                            confirm: true,
                        },
                    }).then((willSubmit) => {
                    if (willSubmit) {
                        submit_asli();
                    }
                    });
                        }
                else{
                    submit_asli()
                }
            }, 2000);
        function submit_asli(){
           document.getElementById("load2").style.display = "flex"
           get(child(dbref,"data-user/"+ userId)).then((snapshot)=>{
               if(snapshot.exists()){
                   if(Kurangi){
   
                       saldoBaru = parseInt(snapshot.val().saldoStd) - parseInt(saldoInput)
                   }
                   else if(tambahi){
   
                       saldoBaru = parseInt(snapshot.val().saldoStd) + parseInt(saldoInput)
                   }
                   
                   update(child(dbref ,"data-user/"+ userId),{
   
                       saldoStd : saldoBaru
           
                   }).then(()=>{
                        //  document.getElementById("load2").style.display = "flex"
                       shiftAndAddHistory().then(()=>{
                         document.getElementById("load2").style.display = "none"
                           swal({
                               title: "Berhasil",
                               text: "Berhasil mengubah saldo",
                               icon: "success",
                               button: "ok",
                           })
                       }).catch((err) => {
                        console.error("Gagal menambahkan history:", err);
                        swal({
                            title: "Saldo berhasil, tapi...",
                            text: "History gagal ditambahkan: " + err.message,
                            icon: "warning",
                            button: "ok",
                        });
                    })
                   }).catch((error)=>{
                       const errorMessage = error.message;
                        swal({
                           title: "Kesalahan",
                           text: "Error :" + errorMessage,
                           icon: "error",
                           button: "ok",
                       })
                    })
                
            }
           }).catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;
                swal({
                   title: "Kesalahan",
                   text: "Error :" + errorMessage,
                   icon: "error",
                   button: "ok",
               })
              
           });








async function shiftAndAddHistory() {
  const historyRef = ref(db, `History/${id}`);

  try {
    // 1. Ambil semua history
    // const snapshot = await get(historyRef);
    // let history = snapshot.exists() ? snapshot.val() : {};  // kalo snapsot ada , maka variabel history berisi snapshot.val kalo gaada maka kosong {}

    // 2. Geser data 2-10 ke 1-9
    // for (let i = 1; i < 10; i++) {
    //   const next = history[i + 1]; // misal i sekarang lagi 1,atau urutan 1,kemudian ambil data di urutan 2 untuk variabel next
    //   if (next) {  // kalo next true atau data selanjutnya ada
    //     await set(ref(db, `History/${id}/${i}`), next); // urutan 1 (i masih 1) diganti datanya dengan variabel next yg mana berisi data ke dua tadi
    //   } else {
    //     // kalau data selanjutnya gaada atau data 2 masih kosong  hapus urutan no 1
    //     await remove(ref(db, `History/${id}/${i}`));
    //   }
    // }

    // 3. setelah data baru masuk ke urutan 10 karna bakal otomatis kegeser data yg ke 10 sebelumnya ke data no 9
    const refPush = await push(ref(db, `History/${id}`))
    await  set(refPush ,{

      kategori: kategoriPerubahan,
      saldoHis: parseInt(saldoInput) || 0,
      tglHis: formatted || "waktu tak diketahui",
      keteranganHis: deskripsi.value || "Tanpa deskripsi"
      
    });

  } catch (error) {
    alert("Terjadi kesalahan: " + error.message);
  }
}



        //    set(ref(db , `History/${id}/${angka + 2}`),{
        //          kategori: kategoriPerubahan || "",
        //         saldoHis: parseInt(saldo.value) || 0,
        //         tglHis: formatted || "",
        //         keteranganHis: deskripsi.value || ""
        //    }).catch((error) => {
        //     const errorCode = error.code;
        //        const errorMessage = error.message;
        //       alert(errorMessage)
        //    })
        
    
           // window.location.href = `index.html?id=${userId}`;
        }
           }).catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;
                swal({
                   title: "Kesalahan",
                   text: "Error : Email/password salah" ,
                   icon: "error",
                   button: "ok",
               }).then(()=>{
                document.getElementById("load2").style.display = "none"
               })
           })



        
    }

document.getElementById("submit").addEventListener("click", submitPayment)
document.getElementById("Back").addEventListener("click", function(){
    window.location.href = "index.html?id="+id
})


//  --------------- Menampilkan data---------------

const today = new Date();
const formatted = today.toLocaleDateString('id-ID', {
day: 'numeric',
month: 'long',
year: 'numeric',
hour: '2-digit',
minute: '2-digit'

});
const formatted2 = today.toLocaleDateString('id-ID', {
day: 'numeric',
month: 'long',
year: 'numeric',

});
async function tampil_data(){
    const nama = document.getElementById("name")
    const tgl = document.getElementById("tgl")
    await get(child(dbref,"data-user/" + id)).then((snapshot)=>{
        if(snapshot.exists()){
            nama.innerHTML = snapshot.val().NamaOfstd.toUpperCase()
            tgl.innerHTML = formatted2
        }
        else{
            swal({
                title: "Kesalahan",
                text: "Data tidak tidemukan",
                icon: "error",
                button: "ok",
            })
        }
  }).catch((error)=>{
       swal({
            title: "Kesalahan",
            text: "error :" + error,
            icon: "error",
            button: "ok",
        }).then(()=>{
                sessionStorage.setItem("logreg" , true)
                window.location.href = "logreg.html"
            })
    })
 }
 tampil_data().then(() => {
     document.getElementById("load").style.display = "none"
 });