
// const container1 = document.querySelector(".container1")
// const container2 = document.querySelector(".container2")

// function slideToSignUp(){
//     container1.classList.add("slide2")
//     container2.classList.add("slide1")
// }
// function slideToSignIn(){
//     container1.classList.remove("slide2")
//     container2.classList.remove("slide1")
// }

// Pastikan ini di dalam main.js
const container1 = document.querySelector(".container1")
const container2 = document.querySelector(".container2")
const slider = document.querySelector(".slider")
const slider2 = document.querySelector(".slider2")
const slider3 = document.querySelector(".slider3")
const slider4 = document.querySelector(".slider4")

const signinLink = document.getElementById("signin");
const signupLink = document.getElementById("signup");

// signinLink.addEventListener("click", function() {
//     slideToSignUp();
// });

// signupLink.addEventListener("click", function() {
//     slideToSignIn();
// });

function slideToSignUp() {
    slider.classList.add("sliderslide");
    slider2.classList.add("sliderslide2");
    slider3.classList.add("sliderslide3");
    slider4.classList.add("sliderslide4");
    setTimeout(() => {
        
        container1.classList.add("slide2");
        container2.classList.add("slide1");
    }, 1000);

}

function slideToSignIn() {
    slider.classList.remove("sliderslide");
    slider2.classList.remove("sliderslide2");
    slider3.classList.remove("sliderslide3");
    slider4.classList.remove("sliderslide4");
    setTimeout(() => {
        
        container1.classList.remove("slide2");
        container2.classList.remove("slide1");
    }, 1000);


}
const passwordFields = document.querySelectorAll('.input-group');
passwordFields.forEach(group => {
    const matabuka = group.querySelector(".fa-eye")
    const matatutup = group.querySelector(".fa-eye-slash")
    const password = group.querySelector(".password") 
    
    if (!matabuka || !matatutup || !password) return
 
    function cek() {
        if(password.value === "") {
            matabuka.style.display = 'none';
            matatutup.style.display = 'none';
        } else {
            matabuka.style.display = 'none';
            matatutup.style.display = 'block';
        }
    }

    // cek sekali saat halaman load
    cek();

    // cek terus saat input berubah
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
});
