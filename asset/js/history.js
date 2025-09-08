import {db , get , set , ref , remove , update ,child} from './firebaseConfig.js'


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


const url = new URLSearchParams (window.location.search)
const id = url.get("id")
if(id != sessionStorage.getItem("userId")){
    swal({
        title: "Kesalahan",
        text: "harap Login terlebih dahulu",
        icon: "error",
        button: "ok",
    }).then(()=>{
        sessionStorage.setItem("logreg" , true)
        window.location.href = "logreg.html"
    })
}
async function tampil_data(){
   await get(ref(db , `History/${id}`)).then((snapshot)=>{
        if(snapshot.exists()){
            const data = snapshot.val();
            for (let i = 10; i >= 1; i = i - 1) {
                const urDat = data[i]
                if (!urDat) continue;
            
            // 1. Buat elemen <li>
                  const tombol = document.createElement('button');
                    tombol.className = "absolute p-1 bg-gray-100 border border-gray-300 rounded-full -top-1 -right-1";

                    // Tambahkan event klik untuk menyembunyikan elemen induknya
                    tombol.addEventListener('click', function () {
                        swal({
                   
       
                               title: 'Yakin ingin Menghapus?',
                               text: "History akan dihapus permanen",
                               icon: 'warning',
                               buttons: {
                                   cancel: true,
                                   confirm: true,
                               },
                           }).then((willSubmit) => {
                           if (willSubmit) {
                               
                               remove(ref(db, `History/${id}/${i}`), {
                                   }).then(() => {
                                        this.parentNode.remove();
                                   }).catch((error) => {
                                   console.error("Gagal menulis data:", error);
                                   });
                           }
                           });
                    });

                    // Buat elemen SVG
                    const img = document.createElement("img")
                    img.src = "https://img.icons8.com/?size=100&id=85081&format=png&color=000000"
                    img.style.width = "20px"

                    tombol.appendChild(img);
                    // Susun elemen

                     const dispChart = document.createElement('div');
                    dispChart.className = "absolute p-1 flex items-center justify-center bg-[red] border h-[20px] w-[20px] border-gray-300 rounded-full -top-1 -left-1";


                    const img2 = document.createElement("i")
                    img2.className = "fa-solid fa-shopping-cart text-white text-[10px]"


                    // Susun elemen
                    dispChart.appendChild(img2);
                
                const li = document.createElement("li");
                li.className = "mb-5 ms-4 me-2 p-2 rounded-lg relative";

                // 2. Buat elemen <div> indikator bulat
                const circleDiv = document.createElement("div");
                circleDiv.className = "absolute w-3 h-3 bg-indigo-50 rounded-full mt-1.5 -start-1.5 dark:border-gray-900 dark:bg-gray-700";

                // 3. Buat elemen <time>
                const time = document.createElement("time");
                time.className = "mb-1 text-sm font-normal leading-none text-gray-700 dark:text-gray-500";
                time.textContent = urDat.tglHis;
                
                const div = document.createElement("div");
                div.className = "flex justify-between";

                // 4. Buat elemen <h3>
                const h31 = document.createElement("h3");
                h31.className = "text-lg font-semibold text-gray-900 dark:text-white";
                h31.textContent = urDat.kategori;

                let simbol = null
                if(urDat.kategori == "Kurangi Saldo"){
                    simbol = "- "
                    li.className +=" bg-[rgba(255,78,78,0.23)]"
                }
                else{
                    simbol = "+ "
                    li.className +=" bg-[rgba(56,224,56,0.2)]"
                }

                const h32 = document.createElement("h3");
                h32.className = "text-lg font-semibold text-gray-900 dark:text-white mx-[1rem]";
                h32.textContent = simbol + "Rp "+Number(urDat.saldoHis).toLocaleString('id-ID')  

                // 5. Buat elemen <p>
                const p = document.createElement("p");
                p.className = "text-base font-normal text-gray-500 dark:text-gray-400";
                p.textContent = urDat.keteranganHis;

                // 6. Masukkan semua elemen ke dalam <li>
                div.appendChild(h31);
                div.appendChild(h32);

                li.appendChild(tombol);
                if(urDat.keteranganHis == "Penambahan saldo bagi barang tujuan"){

                    li.appendChild(dispChart);
                }
                li.appendChild(circleDiv);
                li.appendChild(time);
                li.appendChild(div);
                li.appendChild(p);

                 document.querySelector(".timeline").appendChild(li);
            }
        }
    }).catch((error)=>{
        swal({
        title: "Kesalahan",
        text: "harap Login terlebih dahulu" + error.message,
        icon: "error",
        button: "ok",
    }).then(()=>{
        sessionStorage.setItem("logreg" , true)
        window.location.href = "logreg.html"
    })
    })
}
document.getElementById("Back").addEventListener("click", function(){
    window.location.href = "index.html?id="+id
})

tampil_data().then(() => {
    document.getElementById("load").style.display = "none"
});