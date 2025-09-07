import {db ,set , child , ref , get ,remove} from "./firebaseConfig.js"

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id"); // contoh hasil: "123"

async function uploadImage() {
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];

  if (!file) {
    alert("Pilih file dulu ya!");
    return;
  }

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

        const imageUrl = data.data.url;

        document.getElementById("result").innerHTML = `
          <p>Upload sukses! URL gambar:</p>
          <a href="${imageUrl}" target="_blank">${imageUrl}</a><br>
          <img src="${imageUrl}" alt="Uploaded Image" style="max-width:300px; margin-top:10px;">
        `;
      } else {
        alert("Upload gagal: " + data.error.message);
      }
    } catch (error) {
      alert("Error saat upload: " + error.message);
    }
  };
}

document.getElementById("submit").addEventListener("click", function(event) {
  event.preventDefault();
  uploadImage();
});





document.getElementById("Back").addEventListener("click", function(){
    window.location.href = "index.html?id="+id
})



