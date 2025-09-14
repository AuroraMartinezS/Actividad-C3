//Después de que se haya hecho la solicitud, then es para instruirle al codigo que haga algo, después de esa solicitud.
//fetch("https://pokeapi.co/api/v2/pokemon/zorua").then(info=>console.log(info));
//Expresión lambda "=> ()"

//Le pedimos a la solicitud que interprete la nfomación como un JSON.
//El primer then es para convertir a un JSON, el segundo es para imprimirla.

//fetch("https://pokeapi.co/api/v2/pokemon/zorua").then(info=>info.json()).then(pokemon => console.log(pokemon.abilities[0].ability.name));

const token = localStorage.getItem("jwt");

if (!token) {
    window.location.href = "/Actividad-C3";
}

const box = document.querySelector("#ContenedorPokemon");
const numeroPokemon = document.querySelector("#numero_pokemon");
const nombrePokemon = document.querySelector("#nombre_pokemon");
const alturaPokemon = document.querySelector("#altura_pokemon");
const pesoPokemon = document.querySelector("#peso_pokemon");
const imgPokemon = document.querySelector("#imgPoke");
const audioPokemon = document.querySelector("audio");
const tipoPokemon = document.querySelector(".tipo_color");
const contenedorTipoPokemon = document.querySelector("#tipo_pokemon");
const contenedorImgPokemon = document.querySelector("#seccionImgPokemon")

var entradaPokemon = document.querySelector("input");
const buscador = document.querySelector("#buscador");


const coloresTipoPokemon = 
{
    bug: "#084206a1",
    dark: "#181222a1",
    dragon: "#ded4eea1",
    electric: "#fdd319a1",
    fairy: "#d83349a1",
    fighting: "#ca6130a1",
    fire: "#c21c1ca1",
    flying: "#a8e2dfa1",
    ghost: "#70408ba1",
    grass: "#98e452a1",
    ground: "#d87f64a1",
    ice: "#59e6e6a1",
    normal: "#bb94a7a1",
    poison: "#733b8aa1",
    psychic: "#df2783a1",
    rock: "#6d1515a1",
    steel: "#afafafa1",
    water: "#34accaa1"
}

function cerrarSesion(){
    localStorage.removeItem("jwt");
    window.location.href = "/Actividad-C3";
}

function ConsultarPokemon(){

    if(entradaPokemon.value == "" || entradaPokemon.value  == "0"){
        alert("Ingrese un número o nombre válido")
    }else{

    fetch("https://pokeapi.co/api/v2/pokemon/" + entradaPokemon.value).then(recurso=>{
        if(recurso.ok == false){
            alert("Entrada Inválida.")
        }else{
            recurso.json().then(info =>{ 
                buscador.style.transform = 'translateY(0px)';
                buscador.style.transition = '0.2s ease-in-out';
                box.style.display = "block";
                gradienteTipoPokemon(coloresTipoPokemon[info.types[0].type.name]);
                box.style.transition = "0.2s ease-in-out";

                numeroPokemon.innerHTML = info.id;

                var mayuscula = info.name.charAt(0).toUpperCase();
                var letrasRestante = info.name.slice(1);

                nombrePokemon.innerHTML = mayuscula + letrasRestante;
                alturaPokemon.innerHTML = "Altura: " +"<b>" + info.height/10 + " M" + "</b>";
                pesoPokemon.innerHTML = "Peso: " +"<b>" + info.weight/10 + " KG" + "</b>";
                imgPokemon.src = info.sprites.other["official-artwork"].front_default
                audioPokemon.src = info.cries.latest;
                //tipoPokemon.innerHTML = "";
                
                contenedorTipoPokemon.innerHTML = ""; //Se limpia para que no se acumulen.

                for(i=0; i< info.types.length; i++){
                    
                    const nuevoTipo = document.createElement("p"); //Añade un nuevo texto por cada pokemon
                    nuevoTipo.classList.add("tipo_color"); //la clase (ya establcedia en el css)

                    nuevoTipo.innerHTML = info.types[i].type.name.toUpperCase();
                    nuevoTipo.style.backgroundColor = coloresTipoPokemon[info.types[i].type.name];

                    contenedorTipoPokemon.appendChild(nuevoTipo); //Se adjunta al contenedor padre

                }

                contenedorImgPokemon.addEventListener("click", function(){
                    if(imgPokemon.src == info.sprites.other["official-artwork"].front_default){
                        imgPokemon.src = info.sprites.other["official-artwork"].front_shiny;
                    }else if(imgPokemon.src == info.sprites.other["official-artwork"].front_shiny){
                        imgPokemon.src = info.sprites.other["official-artwork"].front_default;
                    }
                })
                
                
            }
           
        )
        }
    }
)
}
}

entradaPokemon.addEventListener("keypress", function(a){
    if(a.key === "Enter"){
        ConsultarPokemon();
    }
})

function gradienteTipoPokemon(color){
    box.style.background = "linear-gradient(0deg, "+ color + " 0%, #ffffff3f 85%)"
    
}