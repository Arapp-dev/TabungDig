import{ auth , db ,dbref, ref, set, get, child , createUserWithEmailAndPassword , signInWithEmailAndPassword ,update} from "./firebaseConfig.js"
// import{  db2, ref2, set2, get2, child2} from "./firebaseConfig2.js"

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
    animate_submit()
    
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
           
           get(child(dbref,"data-user/"+ userId)).then((snapshot)=>{
               if(snapshot.exists()){
                   if(Kurangi){
   
                       saldoBaru = parseInt(snapshot.val().saldoStd) - parseInt(saldo.value)
                   }
                   else if(tambahi){
   
                       saldoBaru = parseInt(snapshot.val().saldoStd) + parseInt(saldo.value)
                   }
                   
                   update(child(dbref ,"data-user/"+ userId),{
   
                       saldoStd : saldoBaru
           
                   }).then(()=>{
                       swal({
                           title: "Berhasil",
                           text: "Berhasil mengubah saldo",
                           icon: "success",
                           button: "ok",
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



           
           console.log('saldo.value:', saldo.value);
            console.log('kategoriPerubahan:', kategoriPerubahan);
            console.log('deskripsi.value:', deskripsi.value);
            console.log('formatted:', formatted);



           set(ref(db , `History/${id}/${1}`),{
                 kategori: kategoriPerubahan || "",
                saldoHis: parseInt(saldo.value) || 0,
                tglHis: formatted || "",
                keteranganHis: deskripsi.value || ""
           }).catch((error) => {
            const errorCode = error.code;
               const errorMessage = error.message;
              alert(errorMessage)
           })
        
    
           // window.location.href = `index.html?id=${userId}`;
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
year: 'numeric'

});
 function tampil_data(){
    const nama = document.getElementById("name")
    const tgl = document.getElementById("tgl")
     get(child(dbref,"data-user/" + id)).then((snapshot)=>{
        if(snapshot.exists()){
            nama.innerHTML = snapshot.val().NamaOfstd.toUpperCase()
            tgl.innerHTML = formatted
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
        })
    })
 }
 tampil_data()