function JugadorModelo(opciones){

    this.id = opciones.id;
    this.teclas = {
        "37" : false, // izquierda
        "38" : false, // arriba
        "39" : false, // derecha
        "40" : false  // abajo
    };
    
    this.direcciones  = ['IZQUIERDA','ARRIBA','DERECHA','ABAJO'];
    this.dirActual    = undefined;
    this.dirFutura    = undefined;
    this.rotaciones   = [PI,-PI/2,0,PI/2];
    this.rotActual    = 0;

    this.puntaje      = 0;
    this.tipo         = 'pacman'; //seteable
    this.moviendo     = false;
    this.radio        = 25;
    this.ubicacion    = createVector(this.radio*3,this.radio*3);
    this.velocidadMag = 10;
    this.velocidad    = createVector(0,0);
    this.tablero      = opciones.tablero;
    this.ubicacionGrilla = createVector(0,0);
}




//TODO: actualizar vector aceleracion solo si tengo movimiento
JugadorModelo.prototype.actualizar = function(){
    
    // Tomar accion solo cuando estoy en limites de grilla
    if(this.ubicacion.x % 50 == 25 && this.ubicacion.y % 50 === 25){
        
        this.setearUbicacionGrilla();
    
        if(this.dirActual !== this.dirFutura && !this.colisiona(this.dirFutura)){
            this.aplicarMover();
        }

        if(this.colisiona(this.dirActual)){
            this.velocidad = createVector(0,0);
        }

        if(this.hayComida()){
            this.comer();
        }
    
    }
    
    this.ubicacion.add(this.velocidad);
};

JugadorModelo.prototype.setearUbicacionGrilla = function(){


    var x  = Math.round(map(this.ubicacion.x,0,width,0,this.tablero.filas() - 1));
    var y  = Math.round(map(this.ubicacion.y,0,height,0,this.tablero.columnas() - 1));
    
    if(x !== this.ubicacionGrilla.x){
        this.ubicacionGrilla.x = x;
        console.log('ubicacionGrilla X: ' + x);
    }
    if(y !== this.ubicacionGrilla.y){
        this.ubicacionGrilla.y = y;
        console.log('ubicacionGrilla Y: ' + y);
    }

};

JugadorModelo.prototype.colisiona = function(dir){

    switch (dir) {
        case 'IZQUIERDA':
    
            if( this.ubicacionGrilla.x === 0 ||
                this.tablero.celdaOcupada(this.ubicacionGrilla.y,this.ubicacionGrilla.x - 1)){
                
                return true;
            }
            
            break;
        
        case 'DERECHA':
            if( this.ubicacionGrilla.x === this.tablero.columnas() - 1 ||
                this.tablero.celdaOcupada(this.ubicacionGrilla.y,this.ubicacionGrilla.x + 1)){
                
                return true;
            }
            break;
        
        case 'ARRIBA':
        
            if( this.ubicacionGrilla.y === 0 ||
                this.tablero.celdaOcupada(this.ubicacionGrilla.y - 1,this.ubicacionGrilla.x)){
                
                return true;
            }
            break;

        case 'ABAJO':

            if( this.ubicacionGrilla.y === this.tablero.filas() - 1 ||
                this.tablero.celdaOcupada(this.ubicacionGrilla.y + 1,this.ubicacionGrilla.x)){
                
                return true;
            }
            break;
        default:
            break;
    }

};

JugadorModelo.prototype.aplicarMover = function(){
    switch (this.dirFutura) {
        case 'IZQUIERDA':

            this.velocidad = createVector(-this.velocidadMag,0);
            this.rotActual = this.rotaciones[0];
            this.dirActual = this.dirFutura;
        break;
    
        case 'ARRIBA':

            this.velocidad = createVector(0,-this.velocidadMag);
            this.rotActual = this.rotaciones[1];
            this.dirActual = this.dirFutura;
            break;

        case 'DERECHA':

            this.velocidad = createVector(this.velocidadMag,0);
            this.rotActual = this.rotaciones[2];
            this.dirActual = this.dirFutura;
            break;

        case 'ABAJO':

            this.velocidad = createVector(0,this.velocidadMag);
            this.rotActual = this.rotaciones[3];
            this.dirActual = this.dirFutura;
            break;

        default:
            
            break;
    } 
};

JugadorModelo.prototype.comando = function(tecla){
    if(tecla === '37'){

        this.dirFutura = this.direcciones[0];
    }
    else if(tecla === '38'){
        this.dirFutura = this.direcciones[1];
    }
    else if(tecla === '39'){
        this.dirFutura = this.direcciones[2];
    }
    else if(tecla === '40'){
        this.dirFutura = this.direcciones[3];
    }
};

JugadorModelo.prototype.hayComida = function(){
    return this.tablero.celdaConComida(this.ubicacionGrilla.y,this.ubicacionGrilla.x);
};

JugadorModelo.prototype.comer = function(){
    this.tablero.comer(this.ubicacionGrilla.y,this.ubicacionGrilla.x); 
    this.puntaje += 10;
    socket.emit('comio jugador',{
        id: this.id
    });

};

//FIXME: no se llama nunca
JugadorModelo.prototype.limitarPantalla = function(){

    var proxUbicacion = p5.Vector.add(this.ubicacion,this.velocidad);
     
    if(proxUbicacion.x < 0+this.radio || proxUbicacion.x > width-this.radio){
        this.velocidad.x = 0;
    }
    if(proxUbicacion.y < 0+this.radio || proxUbicacion.y > height-this.radio){
        this.velocidad.y = 0;
    }
};


