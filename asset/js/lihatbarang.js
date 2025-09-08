import { get , ref , set , child , remove , db, update} from "./firebaseConfig.js"

const url = new URLSearchParams(window.location.search)
const id = url.get("id")
const idBarang = url.get("idB")
const saldo = document.getElementById("saldo")


const TabDisp = document.getElementById("kurang")
const salbardisp = document.getElementById("tambah")
const selectKat = document.getElementById("selectKat")
let Tabungan = true
let salbar = false
let SelDipencet = false
let KatTab = "Pakai Saldo Tabungan"
let KatBar = "Pakai Saldo Baru"
let kategoriPerubahan = KatTab


TabDisp.addEventListener("change", function(){
    selectKat.innerHTML = KatTab
     Tabungan = true
     salbar = false
     SelDipencet = true
     kategoriPerubahan = KatTab

})
salbardisp.addEventListener("change", function(){
    selectKat.innerHTML = KatBar
    salbar = true
    Tabungan = false
    SelDipencet = true
    kategoriPerubahan = KatBar

})


async function tampil_data(){
   await get(ref(db , `Bartuj/${id}/${idBarang}`)).then((snapshot)=>{
        if(snapshot.exists()){
            let img = document.createElement("img")
            img.className = "w-full h-full rounded-lg object-cover"
            img.src = snapshot.val().Url
            img.style.cursor = "not-allowed"
            document.getElementById("dispImg").appendChild(img)

            const namaBarang = document.getElementById("namaBarang")
            const harga = document.getElementById("harga")

            namaBarang.style.cursor = "not-allowed"
            harga.style.cursor = "not-allowed"

            namaBarang.disabled = true
            harga.disabled = true

            namaBarang.value = snapshot.val().NamaBrang
            harga.value = snapshot.val().harga - snapshot.val().Saldo
        }
    })
}

async function submit_btn() {
    document.getElementById("load").style.display = "flex"
    if(!SelDipencet){
        swal({
                        
            title: 'Yakin ingin melanjutkan?',
            text: "Karena kategori belum diubah jadi default Pakai saldo tabungan",
            icon: 'warning',
            buttons: {
                cancel: true,
                confirm: true,
            },
        }).then((willSubmit) => {
        if (willSubmit) {
            submit().then(()=>{
                document.getElementById("load").style.display = "none"
            });
        }
        });
    }else{
        submit().then(()=>{
                document.getElementById("load").style.display = "none"
            });
    }
    async function submit(){
        
    const snapshot = await get(ref(db , `data-user/${id}`))
    let data = snapshot.val()
    const snapshot2 = await get(ref(db , `Bartuj/${id}/${idBarang}`))
    let dat2 = snapshot2.val()

    if(Tabungan){
        await shiftAndAddHistory()
    }

        update(ref(db , `Bartuj/${id}/${idBarang}`),{
            Saldo: Number(dat2.Saldo) + Number(saldo.value )
        }).then(()=>{
             swal({
        title: "Berhasil",
        text: "berhasil menambah saldo",
        icon: "success",
        button: "ok", })
        })
    
    }

}

async function shiftAndAddHistory() {

    const today = new Date();
const formatted = today.toLocaleDateString('id-ID', {
day: 'numeric',
month: 'long',
year: 'numeric',
hour: '2-digit',
minute: '2-digit'

});
    const saldo = document.getElementById("saldo")
  const historyRef = ref(db, `History/${id}`);
  const dataRef = ref(db, `data-user/${id}`);
  let data = await get(dataRef)

  try {
    // 1. Ambil semua history
    const snapshot = await get(historyRef);
    let history = snapshot.exists() ? snapshot.val() : {};  // kalo snapsot ada , maka variabel history berisi snapshot.val kalo gaada maka kosong {}

    // 2. Geser data 2-10 ke 1-9
    for (let i = 1; i < 10; i++) {
      const next = history[i + 1]; // misal i sekarang lagi 1,atau urutan 1,kemudian ambil data di urutan 2 untuk variabel next
      if (next) {  // kalo next true atau data selanjutnya ada
        await set(ref(db, `History/${id}/${i}`), next); // urutan 1 (i masih 1) diganti datanya dengan variabel next yg mana berisi data ke dua tadi
      } else {
        // kalau data selanjutnya gaada atau data 2 masih kosong  hapus urutan no 1
        await remove(ref(db, `History/${id}/${i}`));
      }
    }

    // 3. setelah data baru masuk ke urutan 10 karna bakal otomatis kegeser data yg ke 10 sebelumnya ke data no 9
    await set(ref(db, `History/${id}/10`), {
      kategori: "Kurangi Saldo",
      saldoHis: (saldo.value) || 0,
      tglHis: formatted || "waktu tak diketahui",
      keteranganHis: "Penambahan saldo bagi barang tujuan"
    }).then(()=>{
        update(ref(db , `data-user/${id}`),{
            saldoStd : Number(data.val().saldoStd) - Number(saldo.value)
        }).then(()=>{
            swal({
                title: 'Berhasil',
                text: "Berhasil menambah update",
                icon: 'success',
                buttons: 'ok'
            })
        })
    })

  } catch (error) {
    alert("Terjadi kesalahan: " + error.message);
  }
}


tampil_data().then(()=>{
    document.getElementById("load").style.display = "none"

})

document.getElementById("submit").addEventListener("click" , function(){
    submit_btn()
})

document.getElementById("Back").addEventListener("click", function(){
    window.location.href = "index.html?id="+id
})
