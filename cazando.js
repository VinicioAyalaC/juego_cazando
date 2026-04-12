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
    //comidax = canvas.width - ANCHOCOMIDA;
    //comiday = canvas.height - ALTURACOMIDA;
    comidax=generarAleatorio(0,500-ANCHOCOMIDA);
    comiday=generarAleatorio(0,500-ALTURACOMIDA);

    graficarGato();
    graficarComida();
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

const LIMITE_X = canvas.width - ANCHOGATO; 
const LIMITE_Y = canvas.height - ALTURAGATO;

function moverIzquierda(){
    if(gatox>0){
        gatox-=10;
        limpiarCanva();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}

function moverDerecha(){
    if (gatox<LIMITE_X){
        gatox += 10;
        limpiarCanva();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}

function moverArriba(){
    if(gatoy>0){
        gatoy -= 10;
        limpiarCanva();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}

function moverAbajo(){
    if(gatoy<LIMITE_Y){
        gatoy += 10;
        limpiarCanva();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}

document.getElementById("btnArriba").onclick = () => moverArriba();
document.getElementById("btnAbajo").onclick = () => moverAbajo();
document.getElementById("btnIzquierda").onclick = () => moverIzquierda();
document.getElementById("btnDerecha").onclick = () => moverDerecha();

function detectarColision(){
    if(comidax+ANCHOCOMIDA > gatox &&
       comidax <  gatox+ANCHOGATO && 
       comiday+ALTURACOMIDA > gatoy &&
       comiday < gatoy+ALTURAGATO){
            alert("++++ TE ATRAPÉ ++++");
            // aparecer en otro lado 
            limpiarCanva(); 
            graficarGato();

            comidax=generarAleatorio(0,500-ANCHOCOMIDA);
            comiday=generarAleatorio(0,500-ALTURACOMIDA);
            graficarComida();      
    }
}
