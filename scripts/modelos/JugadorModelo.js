function JugadorModelo(opciones){

    this.id = opciones.id;
    this.teclas = {
        "37" : false, // izquierda
        "38" : false, // arriba
        "39" : false, // derecha
        "40" : false  // abajo
    };
    
    this.estado             = 'init';
    this.tablero            = opciones.tablero;
    this.celda              = this.tablero.anchoCelda();

    this.direcciones        = ['IZQUIERDA','ARRIBA','DERECHA','ABAJO'];
    this.dirActual          = undefined;
    this.dirFutura          = undefined;
     
     //radians = degree * Math.PI / 180 
    this.rotaciones         = [
                                180 * Math.PI / 180, //IZUIQERDA
                                270 * Math.PI / 180, // ARRIBA
                                0, // DERECHA
                                90 * Math.PI / 180 // ABAJO
                            ];
    this.rotActual          = 0;

    this.puntaje            = 0;
    this.tipo               = opciones.tipo; //seteable
    //this.moviendo         = false;
    this.radio              = 12;
    this.diametro           = this.radio * 2;
    this.diffBorde          = this.celda/2;

    this.velocidadMag       = 6;
    this.velocidad          = createVector(0,0);
    
    this.ubicacionXIni      = 12;
    this.ubicacionYIni      = (15 * 24) - 12;
    this.ubicacion          = createVector(this.ubicacionXIni,this.ubicacionYIni);
    this.ubicacionGrillaMap = this.setearUbicacionGrillaMap();
    this.ubicacionGrilla    = this.setearUbicacionGrilla(this.ubicacion);

    
}

JugadorModelo.prototype = {
    
    actualizar : function(){

        // Tomar accion solo cuando estoy en limites de grilla
        if( (this.ubicacion.x - this.radio) % this.celda === 0 &&
            (this.ubicacion.y - this.radio) % this.celda === 0){

            this.setearUbicacionGrilla(this.ubicacion);
        
            if(this.dirActual !== this.dirFutura && !this.colisiona(this.dirFutura)){
                this.aplicarMover();
            }

            if(this.colisiona(this.dirActual)){
                this.velocidad = createVector(0,0);
            }

        }
        
        if(this.moviendo()){

            this.ubicacion.add(this.velocidad);
        }
    },

    setearUbicacionGrilla : function(ubicacion){


        var x = this.ubicacionGrillaMap[ubicacion.y][ubicacion.x][0];
        var y = this.ubicacionGrillaMap[ubicacion.y][ubicacion.x][1];
        
        if(this.ubicacionGrilla){
            if( x !== this.ubicacionGrilla.x || y !== this.ubicacionGrilla.y){
                console.log('ubicacionGrilla: '+x+', '+y);
            }
        } 
        
        this.ubicacionGrilla = createVector(x,y);
        
        

    },
    setearUbicacionGrillaMap:function(){
        
        var grillaMap = [];
        
        for(var j = 0; j < this.tablero.alto() -1; j+=this.velocidadMag){

            grillaMap[j] = [];
            var y  = Math.round(map(j,0,this.tablero.alto(),0,this.tablero.filas() - 1));
            
            for(var i = 0; i < this.tablero.ancho() -1; i+=this.velocidadMag){
                
                var x  = Math.round(map(i,0,this.tablero.ancho(),0,this.tablero.columnas() - 1 ));
                grillaMap[j][i] = [x,y];
            }
        }

        return grillaMap;
    },

    colisiona : function(dir){

        switch (dir) {
            case 'IZQUIERDA':
        
                if(this.ubicacionGrilla.x === 0){ //FIXME: desaparce

                    this.ubicacion.x = this.tablero.ancho() + this.radio;

                    return false;
                }
                else if(this.tablero.celdaOcupada(this.ubicacionGrilla.y,this.ubicacionGrilla.x - 1)){
                    
                    return true;
                }
                
                break;
            
            case 'DERECHA':
                if( this.ubicacionGrilla.x === this.tablero.columnas() - 1){ //FIXME: desaparece

                    this.ubicacion.x = -this.radio;
                    return false;
                }
                else if(this.tablero.celdaOcupada(this.ubicacionGrilla.y,this.ubicacionGrilla.x + 1)){
                    
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

    },

    aplicarMover : function(){
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
    },

    comando : function(tecla){
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
    },

    moviendo : function(){
         return (this.velocidad.x !== 0 || this.velocidad.y !== 0); 
    },

    //TODO: Tuneles
    limitarPantalla : function(){
         
        if(this.ubicacion.x <= -this.diametro){
            this.ubicacion.x = this.tablero.ancho() + this.diametro;
        }
        if(this.ubicacion.x >= this.tablero.ancho() + this.diametro){
            this.ubicacion.x = -this.diametro;
        }
    },

    //FIXME: no se llama nunca
    limitarPantallaObsoleto : function(){

        var proxUbicacion = p5.Vector.add(this.ubicacion,this.velocidad);
         
        if(proxUbicacion.x < 0+this.radio || proxUbicacion.x > width-this.radio){
            this.velocidad.x = 0;
        }
        if(proxUbicacion.y < 0+this.radio || proxUbicacion.y > height-this.radio){
            this.velocidad.y = 0;
        }
    },
    posX:function(){
        return this.ubicacion.x;
    },
    posY:function(){
        return this.ubicacion.y;
    },
    rotacion:function(){
        return this.rotActual;
    }

};

