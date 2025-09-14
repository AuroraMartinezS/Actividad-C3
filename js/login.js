const inputNombre = document.querySelector("#input_nombre");
const inputContrasena = document.querySelector("#input_contrasena");

const avisos = document.querySelector(".avisos");
const aviso1 = document.getElementById("aviso1");
const aviso2 = document.getElementById("aviso2");
const aviso3 = document.getElementById("aviso3");
const aviso4 = document.getElementById("aviso4");

const usuario = "borawi5115@gmail.com"
const contra = "seguridadInfo109"


function ocultarAvisos() {
  aviso1.style.display = "none";
  aviso2.style.display = "none";
  aviso3.style.display = "none";
  aviso4.style.display = "none";
}


function HacerLogin(){

    ocultarAvisos(); // Siempre ocultamos todos antes de mostrar el nuevo

    if(inputNombre.value.trim() == usuario && inputContrasena.value.trim() == contra){
        
        const payload = { user: inputNombre.value, exp: "1h"}; 
        const token = btoa(JSON.stringify(payload));

        localStorage.setItem("jwt", token);
        window.location.href = "PokeApi_DeUno_222397/pokemon.html"
    }else{


        if(inputNombre.value == "" && inputContrasena.value ==""){
        aviso4.style.display = "block";
        }
        else if(inputNombre.value == "" || inputContrasena.value ==""){
        aviso4.style.display = "block";
        }
        else if (inputNombre.value.length >= 49 || inputContrasena.value.length >= 49) {
        aviso3.style.display = "block";
        }
        else{
        aviso1.style.display = "block";
        }

    }
}