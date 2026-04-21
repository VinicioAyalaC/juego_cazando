let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// GATO
let gatox=0;
let gatoy=0;
let puntosGato=0;
let tiempo=15;
let temporizador;

let imgGato = new Image(); // Creamos un objeto imagen
imgGato.src = "gato.png";  // Ruta de la imagen

let disminuirTiempo=0;

const ANCHOGATO=50;
const ALTURAGATO=50;
const VELOCIDAD=15;

// COMIDA
let comidax=50;
let comiday=50;
const ANCHOCOMIDA=30;
const ALTURACOMIDA=30;

let imgRaton = new Image();     // Creamos objeto imagen
imgRaton.src = "raton.png";



// FUNCION PARA GRAFICAR GATO
function graficarGato(){ 
    graficarImagen(imgGato, gatox, gatoy, ANCHOGATO, ALTURAGATO);
}


// FUNCION PARA DIBUJAR IMAGEN (REEMPLAZA RECTANGULO)
function graficarImagen(imagen, x, y, ancho, alto){
    ctx.drawImage(imagen, x, y, ancho, alto);
}



// FUNCION PARA GRAFICAR COMIDA
function graficarComida(){
   // Dibujamos el ratón en lugar del rectángulo
    graficarImagen(imgRaton, comidax, comiday, ANCHOCOMIDA, ALTURACOMIDA);
}

// LIMPIAR EL CANVAS "PANTALLA DE 500X500"
function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}


// FUNCION INICIAR JUEGO
function iniciarJuego(){
   
    // gato al centro del rectangulo
    gatox = (canvas.width/2) - (ANCHOGATO / 2);     
    gatoy = (canvas.height/2) - (ALTURAGATO / 2);

    //COMIDA EN UNA COORDENADA   ALEATORIA
    comidax=generarAleatorio(0,canvas.width - ANCHOCOMIDA);
    comiday=generarAleatorio(0,canvas.height - ALTURACOMIDA);
    
    graficarGato();
    graficarComida();
  
}

const LIMITE_X = canvas.width - ANCHOGATO; 
const LIMITE_Y = canvas.height - ALTURAGATO;

function moverIzquierda(){
    if(gatox>0){
        gatox-=10;
        cargarGraficos();
    }
}

function moverDerecha(){
    if (gatox<LIMITE_X){
        gatox += 10;
       cargarGraficos();
    }
}

function moverArriba(){
    if(gatoy>0){
        gatoy -= 10;
        cargarGraficos();
    }
}

function moverAbajo(){
    if(gatoy<LIMITE_Y){
        gatoy += 10;
        cargarGraficos();
    }
}

document.getElementById("btnArriba").onclick = () => moverArriba();
document.getElementById("btnAbajo").onclick = () => moverAbajo();
document.getElementById("btnIzquierda").onclick = () => moverIzquierda();
document.getElementById("btnDerecha").onclick = () => moverDerecha();
document.getElementById("btnReiniciar").onclick = () => reiniciarJuego();

function detectarColision(){
    if(comidax+ANCHOCOMIDA > gatox &&
       comidax <  gatox+ANCHOGATO && 
       comiday+ALTURACOMIDA > gatoy &&
       comiday < gatoy+ALTURAGATO){
            alert("++++ TE ATRAPÉ ++++");
            // aparecer en otro lado 
            limpiarCanva(); 
            graficarGato();

            comidax=generarAleatorio(0,canvas.width - ANCHOCOMIDA);
            comiday=generarAleatorio(0,canvas.height - ALTURACOMIDA);
            graficarComida();
            incrementarPuntos();
            disminuirTiempo++;
            tiempo=15-disminuirTiempo;
    }
}

function cargarGraficos(){
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function incrementarPuntos(){
    puntosGato+=1;
    mostrarEnSpan("puntos",puntosGato);
    if(puntosGato>=6){
        alert("+++GANASTE+++");
        clearInterval(temporizador);
    }    
}

function restarTiempo(){
    tiempo-=1;
    mostrarEnSpan("tiempo",tiempo);
    if(tiempo<=0){
        alert("+++GAME OVER+++");
        clearInterval(temporizador);
    }
}

temporizador=setInterval(function(){
    restarTiempo();
},1000);

function reiniciarJuego(){    
    puntosGato=0;
    tiempo=15;
    disminuirTiempo=0;

    // Reposicionar gato
    gatox = (canvas.width/2) - (ANCHOGATO / 2);     
    gatoy = (canvas.height/2) - (ALTURAGATO / 2);

    // Reposicionar comida
    comidax = generarAleatorio(0,canvas.width - ANCHOCOMIDA);
    comiday = generarAleatorio(0,canvas.height - ALTURACOMIDA);

    cargarGraficos();
    mostrarEnSpan("puntos",puntosGato);
    mostrarEnSpan("tiempo",tiempo);
}