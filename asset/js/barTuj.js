import {db ,set , child , ref , get ,remove} from "./firebaseConfig.js"

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id"); // contoh hasil: "123"

async function uploadImage() {
    document.getElementById("load").style.display = "flex"
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];
  



  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = async () => {
    const base64String = reader.result.replace(/^data:image\/\w+;base64,/, "");
    const apiKey = "603cf8adfaf1c3c7c8802a867d017ad3";

    const formData = new FormData();
    formData.append("key", apiKey);
    formData.append("image", base64String);

    try {
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
         document.getElementById("load").style.display = "none"

        document.getElementById("file").disabled = true
        document.getElementById("file").style.cursor = "not-allowed"
        document.getElementById("icon").classList.add("fa-folder")
        document.getElementById("icon").classList.remove("fa-folder-open")


        const imageUrl = data.data.url;
        const namaImgAsli = file.name;
        const tombol = document.createElement('button');
        tombol.className = "absolute p-1 bg-gray-100 border border-gray-300 rounded-full -top-1 -right-1";

        // Tambahkan event klik untuk menyembunyikan elemen induknya
        tombol.addEventListener('click', function () {
            swal({
        

                    title: 'Yakin ingin Menghapus?',
                    text: "file ini akan dihapus",
                    icon: 'warning',
                    buttons: {
                        cancel: true,
                        confirm: true,
                    },
                }).then((willSubmit) => {
                if (willSubmit) {
                    
                   container.style.display = "none"
                   document.getElementById("icon").classList.add("fa-folder-open")
                   document.getElementById("icon").classList.remove("fa-folder")
                   document.getElementById("file").disabled = false
                    document.getElementById("file").style.cursor = "pointer"
                }
                });
        });
        const img = document.createElement("img")
        img.src = "https://img.icons8.com/?size=100&id=85081&format=png&color=000000"
        img.style.width = "20px"

        // Susun elemen
        tombol.appendChild(img);
        // 1. Buat div utama
        const container = document.createElement("div");
        container.className = "mb-5 relative rounded-md bg-[#F5F7FB] py-4 px-8";

        // 2. Buat div flex
        const flexDiv = document.createElement("div");
        flexDiv.className = "flex items-center justify-between";

        // 3. Buat span untuk menampilkan hasil (dengan id="result")
        const resultSpan = document.createElement("span");
        resultSpan.className = "truncate pr-3 text-base font-medium text-[#07074D]";
        resultSpan.id = "result";
        resultSpan.textContent = namaImgAsli; // bisa diganti nanti dengan hasil yang diinginkan

        // 4. (Opsional) Tambahan elemen lain di sebelah kanan, kalau diperlukan
        // const otherElement = document.createElement("div");
        // otherElement.textContent = "Tambahan";

        // 5. Masukkan span ke flexDiv
        flexDiv.appendChild(resultSpan);
        // flexDiv.appendChild(otherElement); // kalau ada elemen tambahan

        // 6. Masukkan flexDiv ke container
        container.appendChild(tombol);
        container.appendChild(flexDiv);

        // 7. Tambahkan ke dokumen, misalnya ke dalam elemen dengan id="app"
        document.getElementById("app").appendChild(container);
        const namaBarang = document.getElementById("namaBarang")
        const harga = document.getElementById("harga")
        const saldo = document.getElementById("saldo")


        // document.getElementById("result").innerHTML = `
        //   <p>Upload sukses! URL gambar:</p>
        //   <i>${namaImgAsli}</i><br>
        // `;



        async function shiftAndAddBartuj() {
                const BartujRef = ref(db, `Bartuj/${id}`);

                try {
                    // 1. Ambil semua Bartuj
                    const snapshot = await get(BartujRef);
                    let Bartuj = snapshot.exists() ? snapshot.val() : {};  // kalo snapsot ada , maka variabel Bartuj berisi snapshot.val kalo gaada maka kosong {}

                    // 2. Geser data 2-10 ke 1-9
                    for (let i = 1; i < 5; i++) {
                    const next = Bartuj[i + 1]; // misal i sekarang lagi 1,atau urutan 1,kemudian ambil data di urutan 2 untuk variabel next
                    if (next) {  // kalo next true atau data selanjutnya ada
                        await set(ref(db, `Bartuj/${id}/${i}`), next); // urutan 1 (i masih 1) diganti datanya dengan variabel next yg mana berisi data ke dua tadi
                    } else {
                        // kalau data selanjutnya gaada atau data 2 masih kosong  hapus urutan no 1
                        await remove(ref(db, `Bartuj/${id}/${i}`));
                    }
                    }

                    // 3. setelah data baru masuk ke urutan 10 karna bakal otomatis kegeser data yg ke 10 sebelumnya ke data no 9
                    await set(ref(db, `Bartuj/${id}/5`), {
                    Url : imageUrl ,
                    NamaBrang : namaBarang.value ,
                    harga : harga.value ,
                    Saldo : saldo.value || 0
                    }).then(()=>{
                        document.getElementById("load").style.display = "none"
                        swal({
                            title: 'Berhasil',
                            text: "Berhasil menambah barang tujuan",
                            icon: 'success',
                            buttons: 'ok'
                        })
                    })

                } catch (error) {
                    alert("Terjadi kesalahan: " + error.message);
                }
                }

                document.getElementById("submit").addEventListener("click", function(event) {
                event.preventDefault();
                 document.getElementById("load").style.display = "flex"
                   if (!file) {
                    document.getElementById("load").style.display = "none"
                        swal({
                            title: 'Warning',
                            text: "Harap masukin file",
                            icon: 'warning',
                            buttons: 'ok'
                        })
                    }
                    else{

                        shiftAndAddBartuj().then(()=>{
                            document.getElementById("load").style.display = "none"
                        })
                    }
                });         
            } else {
                alert("Upload gagal: " + data.error.message);
            }
        } catch (error) {
            alert("Error saat upload: " + error.message);
        }
  };
}




document.getElementById("file").addEventListener("change", function(event) {
event.preventDefault();
uploadImage();
});




document.getElementById("Back").addEventListener("click", function(){
    window.location.href = "index.html?id="+id
})



