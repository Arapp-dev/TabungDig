const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id"); // contoh hasil: "123"
const page = document.getElementById("pages")












document.getElementById("Back").addEventListener("click", function(){
    window.location.href = "index.html?id="+id
})