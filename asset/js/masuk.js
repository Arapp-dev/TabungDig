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
async function TampilData(){
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




        // --------------------------------------------------Bartuj--------------------------------------------

        get(ref(db , `Bartuj/${userId}`)).then((snapshot)=>{
            if(snapshot.exists()){
                for (let i = 1; i <= 5; i++) {
                    const data = snapshot.val();
                    let DataUrutan = data[i]

                    if(!DataUrutan){
                        continue
                    }
                    
               

                const container = document.getElementById('container');

                const card = document.createElement('div');
                card.className = "group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2";

                // Image Wrapper & isi
                const imageWrapper = document.createElement('div');
                imageWrapper.className = "relative overflow-hidden h-80";
                card.appendChild(imageWrapper);

                const img = document.createElement('img');
                img.src = DataUrutan.Url;
                img.alt = DataUrutan.NamaBrang;
                img.className = "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110";
                imageWrapper.appendChild(img);

                const gradient = document.createElement('div');
                gradient.className = "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500";
                imageWrapper.appendChild(gradient);

                const btnHeartWrapper = document.createElement('div');
                btnHeartWrapper.className = "absolute top-4 right-4";
                imageWrapper.appendChild(btnHeartWrapper);

                const btnHeart = document.createElement('button');
                btnHeart.className = "bg-white/90 w-[35px] h-[35px] text-gray-800 p-2 rounded-full shadow-md transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white";
                btnHeart.innerHTML = '<i class="fa-solid fa-heart"></i>';
                btnHeartWrapper.appendChild(btnHeart);
                btnHeart.addEventListener("click" , function(){
                    btnHeart.classList.toggle("opacity-100")
                    btnHeart.classList.toggle("translate-y-0")
                    btnHeart.classList.toggle("bg-red-500")
                    btnHeart.classList.toggle("hover:text-gray-800")
                    btnHeart.classList.toggle("hover:bg-white")
                    btnHeart.classList.toggle("text-white")
                })

                const btnCartWrapper = document.createElement('div');
                btnCartWrapper.className = "absolute bottom-0 left-0 right-0 p-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500";
                imageWrapper.appendChild(btnCartWrapper);

                const btnCart = document.createElement('button');
                btnCart.className = "w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center gap-2";
                btnCart.innerHTML = '<i class="fa-solid fa-shopping-cart"></i> Lihat barang';
                btnCartWrapper.appendChild(btnCart);
                btnCart.addEventListener("click" ,function(){
                    window.location.href = "LihatBarang.html?id="+userId + "&idB="+i
                })

                const labelNew = document.createElement('span');
                labelNew.className = "absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse-slow";
                labelNew.textContent = "NEW";
                imageWrapper.appendChild(labelNew);

                // Content bawah gambar
                const content = document.createElement('div');
                content.className = "p-5";
                card.appendChild(content);

                // Flex container untuk judul dan harga
                const flexTop = document.createElement('div');
                flexTop.className = "flex justify-between items-start";
                content.appendChild(flexTop);

                const leftContent = document.createElement('div');
                flexTop.appendChild(leftContent);

                const productTitle = document.createElement('h3');
                productTitle.className = "text-lg font-bold text-gray-800";
                productTitle.textContent = DataUrutan.NamaBrang;
                leftContent.appendChild(productTitle);

                const rightContent = document.createElement('div');
                rightContent.className = "text-right";
                flexTop.appendChild(rightContent);

                const price = document.createElement('p');
                price.className = "text-lg font-bold text-indigo-600";
                price.textContent = "Rp " + Number(DataUrutan.harga).toLocaleString('id-ID');
                rightContent.appendChild(price);

                // Rating & progress bar
                const ratingWrapper = document.createElement('div');
                ratingWrapper.className = "mt-3 flex items-center";
                content.appendChild(ratingWrapper);

                const progressWrapper = document.createElement('div');
                progressWrapper.className = "bg-white rounded-lg w-full border shadow block p-4";
                ratingWrapper.appendChild(progressWrapper);

                const progressBar = document.createElement('div');
                progressBar.className = "w-full h-4 bg-gray-400 rounded-full";
                progressWrapper.appendChild(progressBar);

                const progressInner = document.createElement('div');
                progressInner.className = "h-full text-center text-xs text-white bg-violet-500 rounded-full";
                let percent = ((DataUrutan.Saldo / DataUrutan.harga) * 100)
                if (!Number.isInteger(percent)) {
                percent = ((DataUrutan.Saldo / DataUrutan.harga) * 100).toFixed(1);
                }
                progressInner.textContent = `${percent}%`;
                progressInner.style.width = `${percent}%`;
                progressBar.appendChild(progressInner);

                // Tambahkan kartu ke container utama
                container.appendChild(card);

    

        // Masukkan container ke body (atau elemen lain yang diinginkan)
             }
            }
        })



        
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



 TampilData().then(() => {
     document.getElementById("load").style.display = "none"
 });