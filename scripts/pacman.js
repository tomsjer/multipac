
var pacman;
var tablero;
var w = window.innerWidth;
var h = window.innerHeight;
var teclas = {};

function setup(){
    createCanvas(w,h);
    background(0,0,0);
    frameRate(32);
    imageMode(CENTER);
    tablero = new Tablero(w,h);
    pacman = new Pacman(tablero);
    
    
    
}

function draw(){

    background(0,0,0);
    tablero.dibujar();
    pacman.actualizar();
    pacman.dibujar();

}