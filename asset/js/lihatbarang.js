import { get , ref , child , remove , db, update} from "./firebaseConfig.js"

const url = new URLSearchParams(window.location.search)
const id = url.get("id")
const idBarang = url.get("idB")
const saldo = document.getElementById("saldo")

async function tampil_data(){
   await get(ref(db , `Bartuj/${id}/${idBarang}`)).then((snapshot)=>{
        if(snapshot.exists()){
            let img = document.createElement("img")
            img.className = "w-full h-full rounded-lg"
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

async function submit() {
    const snapshot = await get(ref(db , `data-user/${id}`))
    let data = snapshot.val()
    const snapshot2 = await get(ref(db , `Bartuj/${id}/${idBarang}`))
    let dat2 = snapshot2.val()
    await update(ref(db , `data-user/${id}`),{
        saldoStd: Number(data.saldoStd) - Number(saldo.value )
    }).then(()=>{
        update(ref(db , `Bartuj/${id}/${idBarang}`),{
            Saldo: Number(dat2.Saldo) + Number(saldo.value )
        }).then(()=>{
             swal({
        title: "Berhasil",
        text: "berhasil menambah saldo",
        icon: "Success",
        button: "ok", })
        })
    
    })
}


tampil_data().then(()=>{
    document.getElementById("load").style.display = "none"

})

document.getElementById("submit").addEventListener("click" , function(){
    submit()
})

document.getElementById("Back").addEventListener("click", function(){
    window.location.href = "index.html?id="+id
})
