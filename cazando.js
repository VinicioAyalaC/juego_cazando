let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// GATO
let gatox=0;
let gatoy=0;
const ANCHOGATO=50;
const ALTURAGATO=50;
const VELOCIDAD=15;

// COMIDA
let comidax=50;
let comiday=50;
const ANCHOCOMIDA=30;
const ALTURACOMIDA=30;

//ctx.fillStyle = "#be2222";

// FUNCION PRINCIPAL PARA GRAFICAR
function graficarRectangulo(x,y,ancho,alto,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,ancho,alto);
}

// FUNCION PARA GRAFICAR GATO
function graficarGato(){
    graficarRectangulo(gatox,gatoy,ANCHOGATO,ALTURAGATO,"#000000");
}

// FUNCION PARA GRAFICAR COMIDA
function graficarComida(){
    graficarRectangulo(comidax,comiday,ANCHOCOMIDA,ALTURACOMIDA,"#ff0000");
}

// FUNCION INICIAR JUEGO
function iniciarJuego(){
    // gato al centro del rectangulo
    gatox = (canvas.width / 2) - (ANCHOGATO / 2);     
    gatoy = (canvas.height / 2) - (ALTURAGATO / 2);

    //COMIDA ESQUINA INFERIOR DERECHA
    comidax = canvas.width - ANCHOCOMIDA;
    comiday = canvas.height - ALTURACOMIDA;

    graficarGato();
    graficarComida();
}

// MOVIMIENTO DEL GATO
function mover(direccion){
    if (direccion === "arriba") gatoy -= VELOCIDAD;     
    if (direccion === "abajo") gatoy += VELOCIDAD;     
    if (direccion === "izquierda") gatox -= VELOCIDAD;     
    if (direccion === "derecha") gatox += VELOCIDAD;
    graficarGato();
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function moverIzquierda(){
    gatox-=10;
    limpiarCanva();
    graficarGato();
    graficarComida();
}



document.getElementById("btnArriba").onclick = () => mover("arriba");
document.getElementById("btnAbajo").onclick = () => mover("abajo");
document.getElementById("btnIzquierda").onclick = () => moverIzquierda();
document.getElementById("btnDerecha").onclick = () => mover("derecha");

iniciarJuego();