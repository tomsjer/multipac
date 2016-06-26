function JugadorModelo(opciones){

    this.id = opciones.id;
    this.teclas = {
        "37" : false, // izquierda
        "38" : false, // arriba
        "39" : false, // derecha
        "40" : false  // abajo
    };
    this.puntaje = 0;
    this.tipo = 'pacman'; //seteable
    this.moviendo = false;
    this.radio = 25;
    this.ubicacion = createVector(this.radio,this.radio);
    this.velocidadMag = 10;
    this.velocidad = createVector(0,0);
    this.tablero = opciones.tablero;
}

JugadorModelo.prototype.mover = function(tecla){
    if(tecla === '38'){
        this.velocidad = createVector(0,-this.velocidadMag);
    }else
    if(tecla === '40'){
        this.velocidad = createVector(0,this.velocidadMag);
    }else
    if(tecla === '37'){
        this.velocidad = createVector(-this.velocidadMag,0);
    }else
    if(tecla === '39'){
        this.velocidad = createVector(this.velocidadMag,0);
    }
    
};

JugadorModelo.prototype.limitarPantalla = function(){

    var proxUbicacion = p5.Vector.add(this.ubicacion,this.velocidad);
     
    if(proxUbicacion.x < 0+this.radio || proxUbicacion.x > width-this.radio){
        this.velocidad.x = 0;
    }
    if(proxUbicacion.y < 0+this.radio || proxUbicacion.y > height-this.radio){
        this.velocidad.y = 0;
    }  
};

JugadorModelo.prototype.actualizar = function(){
    this.limitarPantalla();
    this.ubicacion.add(this.velocidad);
};