import{ db , ref, set, get, child  , signInWithEmailAndPassword} from "./firebaseConfig.js"

// Contoh: Menulis data ke path "/users/1"


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

// insert data




// function tampilkanSemuaData() {
//     const dbref = ref(db, "data-user");
    
//     get(dbref).then((snapshot) => {
//         if (snapshot.exists()) {
//             const data = snapshot.val();
//             table.innerHTML = ""; // Kosongkan tabel sebelum diisi
            
//             // Loop semua data
//             Object.keys(data).forEach((id) => {
//                 const user = data[id];
                
//                 // Buat baris baru
//                 const baris = document.createElement("tr");
                
//                 // Isi kolom ID, Nama, dan Saldo
//                 baris.innerHTML = `
//                 <td>${id}</td>
//                 <td>${user.NamaOfstd}</td>
//                 <td>${user.saldoStd}</td>
//                 `;
                
//                 // Tambahkan ke tabel
//                 table.appendChild(baris);
//             });
//         } else {
//       alert("Tidak ada data ditemukan.");
//     }
//   }).catch((error) => {
//       console.error("Gagal mengambil data:", error);
//     });
// }
// // tmplBtn.addEventListener("click",tampilkanSemuaData)
// tampilkanSemuaData()

const nama = document.getElementById("nama")
const saldo = document.getElementById("saldo")
const tgl_disp = document.getElementById("tgl")

function updateTgl(){
    const today = new Date();
    const formatted = today.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
    });
    tgl_disp.innerHTML = formatted
}
updateTgl()

// Ambil parameter ID dari URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id"); // contoh hasil: "123"
const userIdasli = sessionStorage.getItem("userId"); 
const page = document.getElementById("pages")
if(page){
    page.href = `index.html?id=${userId}`
}
async function selectData(){
    const dbref = ref(db , "data-user/"+ userId) //kalo pake ini harus langsung get(dbref)
   //const dbref = ref(db) //tapi kalo pake ini harus // get(child(dbref,"data-user/"+ userId))
    if(userId == userIdasli){
       await get(dbref).then((snapshot)=>{
        if(snapshot.exists()){
            nama.innerHTML =  snapshot.val().NamaOfstd               
            saldo.innerHTML =  "Rp "+Number(snapshot.val().saldoStd).toLocaleString('id-ID')  
                 
        }else{
            swal({
                title: "Kesalahan",
                text: "Harap Login sebelum masuk",
                icon: "error",
                button: "ok",
            }).then(() => {
                window.location.href = "logreg.html";
                sessionStorage.setItem('logreg' , true)
            });
        }
    })
    .catch((error)=>{
        swal({
                title: "Kesalahan",
                text: "Harap masuk dengan cara yang benar",
                icon: "error",
                button: "ok",
            }).then(() => {
        sessionStorage.setItem("logreg" , true)
        window.location.href = "logreg.html";
    });
    })
    }
    else{
        swal({
                title: "Kesalahan",
                text: "Harap masuk dengan cara yang benar",
                icon: "error",
                button: "ok",
            }).then(() => {
        window.location.href = "logreg.html";
        sessionStorage.setItem("logreg" , true)
    });
        }
        
    }


const btnUbahdata = document.getElementById("ubah-data")
function halamanUbahData(){
    window.location.href = "logreg.html"
    sessionStorage.setItem('ubah_data', true);
}

document.getElementById("Tosaldo").addEventListener("click",function(){
    window.location.href = `isi_saldo.html?id=${userId}`
})
document.getElementById("toHistory").addEventListener("click",function(){
    window.location.href = `History.html?id=${userId}`
})
document.getElementById("toBarTuj").addEventListener("click",function(){
    window.location.href = `barangTujuan.html?id=${userId}`
})
btnUbahdata.addEventListener("click",halamanUbahData)



 selectData().then(() => {
     document.getElementById("load").style.display = "none"
 });