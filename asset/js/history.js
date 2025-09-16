import {db , get , set , ref , query , remove , startAt , endAt, equalTo ,orderByChild} from './firebaseConfig.js'


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



const kurangDisp = document.getElementById("kurang")
const tambahDisp = document.getElementById("tambah")
const hisbarDisp = document.getElementById("hisBar")
const alldisp = document.getElementById("All")
const selectKat = document.getElementById("selectKat")
let Kurangi = false
let tambahi = false
let barangi = false
let All = true
let KatKur = "History Kurangi Saldo"
let KatTam = "History Tambah Saldo"
let KatBar = "History dari barang tujuan"
let AllKat = "Semua"

kurangDisp.addEventListener("change", function(){
    selectKat.innerHTML = KatKur
     Kurangi = true
     tambahi = false
     barangi = false
     All = false

    tampil_data()


})
tambahDisp.addEventListener("change", function(){
    selectKat.innerHTML = KatTam
    tambahi = true
    Kurangi = false
    barangi = false
    All = false


    tampil_data()

})
hisbarDisp.addEventListener("change", function(){
    selectKat.innerHTML = KatBar
    barangi = true
    Kurangi = false
    tambahi = false
    All = false

    tampil_data()

})
alldisp.addEventListener("change", function(){
    selectKat.innerHTML = AllKat
    All = true
    Kurangi = false
    tambahi = false
    barangi = false

    tampil_data()


})



let data = null



      


async function tampil_data(){
    document.querySelector(".timeline").innerHTML = "";

    

                
        const filterRef = ref(db, `History/${id}`);
    
            if(tambahi){
                // Query: Filter where role == "admin"
                    const q = query(filterRef, orderByChild("kategori"), equalTo("Tambah Saldo"));
                    const snapshot = await get(q);
                    data = snapshot.val();
            }else if(Kurangi){
                // Query: Filter where role == "admin"
                    const q = query(filterRef, orderByChild("kategori"), equalTo("Kurangi Saldo"));
                    const snapshot = await get(q);
                    data = [];

                    snapshot.forEach(childSnap => {
                         const dataX = childSnap.val();
                        if (dataX.keteranganHis !== "Penambahan saldo bagi barang tujuan") {
                            data.push(dataX);
                            console.log(data)
                        }
                        });
            }else if(All){
                // Query: Filter where role == "admin"
                    const snapshot = await get(ref(db , `History/${id}`))
                    data = snapshot.val(); 
            }else{
                    const q = query(filterRef, orderByChild("keteranganHis"), equalTo("Penambahan saldo bagi barang tujuan"));
                    const snapshot = await get(q);
                    data = snapshot.val(); 
            }

      
   

                Object.keys(data).forEach((key) => {
                    const urDat = data[key]
                
            
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
                               
                               remove(ref(db, `History/${id}/${key}`), {
                                   }).then(() => {
                                        this.parentNode.remove();
                                   }).catch((error) => {
                                   console.error("Gagal menghapus data:", error);
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
                h32.textContent = simbol + "Rp"+Number(urDat.saldoHis).toLocaleString('id-ID')  

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
                })
            }


async function data_bartuj() {

    const dataRef =await get(ref(db , `Bartuj/${id}/selesai`))
    if(dataRef.exists()){
        const snapshot =  dataRef.val()

        Object.keys(snapshot).forEach((key) => {
      const item = snapshot[key];


      // Tambahkan ke HTML atau proses sesuai kebutuhan
  

    
const container = document.querySelector(".timeline2");

const card = document.createElement("article");
card.className = `
  relative w-full max-w-sm mx-auto my-4
  bg-white rounded-2xl shadow-xl border border-gray-100
  transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl
  flex flex-col
`;

// Image container with a subtle overlay
const imgWrapper = document.createElement("div");
imgWrapper.className = "relative w-full aspect-[16/9] overflow-hidden rounded-[15px_15px_0_0]";
imgWrapper.style.backgroundColor = 'rgba(0,0,0,0.05)'; // A light, modern overlay

const img = document.createElement("img");
img.src = item.Url || "https://via.placeholder.com/400x225";
img.alt = item.NamaBrang || "Gambar Barang";
img.className = "w-full h-full object-cover transition-transform duration-300 hover:scale-105 " ;

imgWrapper.appendChild(img);
card.appendChild(imgWrapper);

// Content section
const content = document.createElement("div");
content.className = "p-6 flex flex-col space-y-4";

// Title & Price (using flexbox for alignment)
const header = document.createElement("div");
header.className = "flex justify-between items-start";

const nama = document.createElement("h2");
nama.className = "text-xl font-bold text-gray-900 leading-snug truncate pr-4";
nama.title = item.NamaBrang || "Nama Barang";
nama.textContent = item.NamaBrang || "Nama Barang";

const harga = document.createElement("span");
harga.className = "text-xl font-bold text-gray-800";
harga.textContent = `Rp ${Number(item.harga || 0).toLocaleString("id-ID")}`;

header.appendChild(nama);
header.appendChild(harga);
content.appendChild(header);

// Meta information (date & status)
const meta = document.createElement("div");
meta.className = "flex items-center space-x-3 text-sm text-gray-500";

const tanggal = document.createElement("time");
tanggal.dateTime = item.tgl || "";
tanggal.textContent = item.tgl || "-";

const statusColors = {
  Sukses: { bg: "bg-green-100", text: "text-green-700" },
  Pending: { bg: "bg-yellow-100", text: "text-yellow-700" },
  Gagal: { bg: "bg-red-100", text: "text-red-700" },
};
const statusInfo = statusColors[item.StatusBar] || { bg: "bg-green-100", text: "text-green-600" };

const status = document.createElement("span");
status.className = `
  px-2.5 py-1 rounded-full text-xs font-semibold
  ${statusInfo.bg} ${statusInfo.text}
  capitalize select-none
`;
status.textContent = item.StatusBar || "Sukses";

meta.appendChild(tanggal);
meta.appendChild(status);
content.appendChild(meta);

card.appendChild(content);

// Actions section with delete button
const actions = document.createElement("div");
actions.className = "absolute -top-3 right-7";

const hapusBtn = document.createElement("button");
hapusBtn.className = `
  p-3 rounded-full bg-red-200 hover:bg-red-100 text-black absolute
  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400
  shadow-md hover:shadow-lg
`;
hapusBtn.setAttribute("aria-label", "Hapus item");

hapusBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
`;

hapusBtn.addEventListener("click", () => {
  swal({
    title: 'Yakin ingin menghapus?',
    text: "History akan dihapus permanen.",
    icon: 'warning',
    buttons: {
      cancel: { text: "Batal", value: false, visible: true },
      confirm: { text: "Hapus", value: true, visible: true, className: "bg-red-500 hover:bg-red-600" },
    },
  }).then((confirm) => {
    if (confirm) {
      remove(ref(db, `Bartuj/${id}/selesai/${key}`))
        .then(() => card.remove())
        .catch((err) => console.error("Gagal menghapus:", err));
    }
  });
});

actions.appendChild(hapusBtn);
card.appendChild(actions);

container.appendChild(card);
                   });
            }
}



const back = document.querySelectorAll(".Back")
back.forEach((backbtn) =>{

    backbtn.addEventListener("click", function(){
        window.location.href = "MainView.html?id="+id
    })
})

    tampil_data().then(() => {
        document.getElementById("load").style.display = "none"
    });


let btn1Set = true
let btn2Set = false
document.getElementById("btn1").addEventListener("click", ()=>{
    btn1Set = true
    btn2Set = false

    btn1.classList.add('text-yellow-600');
    btn2.classList.remove('text-yellow-600');
    btn1.classList.add('bg-white');
    btn2.classList.remove('bg-white');
    Tab()
})
document.getElementById("btn2").addEventListener("click", ()=>{
    btn2Set = true
    btn1Set = false

    btn2.classList.add('bg-white');
    btn2.classList.add('text-yellow-600');
    btn1.classList.remove('text-yellow-600');
    btn1.classList.remove('bg-white');
    Tab()
})


function Tab(){
    const tab1 = document.querySelector(".sall")
    const con = document.querySelector(".con")
    const tab2 = document.querySelector(".barr")
    if(btn1Set){
        tab1.classList.remove('hidden')
        tab2.classList.add('hidden')
        con.appendChild(tab1)
    }else if(btn2Set){
        tab2.classList.remove('hidden')
        tab1.classList.add('hidden')
        con.appendChild(tab2)

    }
}






Tab()
data_bartuj()