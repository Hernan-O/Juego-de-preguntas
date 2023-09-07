const preguntaElement = document.getElementById("pregunta")
const respuestaContainer = document.getElementById("respuestas")
const puntajeElement = document.getElementById("puntaje")
const reiniciarElement = document.getElementById("reiniciar")

let preguntas = [];
let puntaje = 0;
let preguntaActual = 0;

//Importar preguntas desde el json
//Preguntas hechas por chatGPT

const preguntasImportadas = async()=>{
    try{
        const respuesta = await fetch("preguntas.json")
        preguntas = await respuesta.json()
        mostrarPregunta();
    }catch(error){
        console.log("Algo salió mal con el archivo JSON",error)
    }
};

//Mostrar pregunta y respuesta

mostrarPregunta=()=>{
    const{pregunta,respuestas} = preguntas[preguntaActual];
    preguntaElement.textContent = pregunta;
    //Generar botones de respuestas
    respuestaContainer.innerHTML = respuestas
    .map((respuesta)=>`<button>${respuesta}</button>`)
    .join("");

    respuestaContainer.querySelectorAll("button").forEach((button, indice)=>{
        button.addEventListener("click",()=> revisarRespuesta(indice));
        button.disabled = false;
        button.classList.remove("correcto","incorrecto");
    });  
};

revisarRespuesta = (indiceElegido) =>{
    const isCorrect = indiceElegido === preguntas[preguntaActual].correcta;
    const botonSeleccionado = respuestaContainer.querySelector(`button:nth-child(${indiceElegido+1})`);
    botonSeleccionado.classList.add(isCorrect?"correcto":"incorrecto");
    puntaje += isCorrect;

    respuestaContainer.querySelectorAll("button").forEach((button) => (button.disabled = true));
    //siguiente pregunta
    setTimeout(() => {
        respuestaContainer.innerHTML = ""; //Lo limpia
        preguntaActual++;
        if(preguntaActual<preguntas.length){
            mostrarPregunta();
        }
        else{
            respuestaContainer.innerHTML = `<p class='Fin'>Partida finalizada <br> Puntaje: ${puntaje} de 15 posibles</p>`;
            preguntaElement.style.display="none";
            reiniciarElement.style.display="block"; //vuelve el botoncito reiniciar :)
        }
        puntajeElement.textContent = `Puntaje: ${puntaje}`
    },500);
};

reiniciarJuego = () => {
    preguntaActual = 0;
    puntaje = 0;
    preguntaElement.style.display = "block";
    reiniciar.style.display = "none";
    preguntasImportadas();
};

reiniciarElement.addEventListener("click",reiniciarJuego);
preguntasImportadas();