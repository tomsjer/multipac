function Tablero(w,h){
    this.w = w;
    this.h = h;
    this.paredes = [];
    this.numeroParedes = 9;
    this.columnas = 4;
    this.filas = 3;
    this.celda = 50;
    
    this.init = function init(){

        for(var i = 0; i < this.columnas; i++){

            var x = (this.w/this.columnas) * i + (this.w/this.columnas) / 2 - (this.celda/2);

            for(var j = 0; j < this.filas; j++){

                var y = (this.h/this.filas) * j + (this.h/this.filas) / 2 - (this.celda/2);

                this.paredes.push({
                    x: x,
                    y: y,
                    ow: this.celda,
                    oh: this.celda
                });
            }
        }
    };

    this.dibujar = function dibujar(){
        
        noStroke();
        fill(255,255,255);

        for(var i = 0; i < this.paredes.length; i++){
            rect(this.paredes[i].x, this.paredes[i].y,this.paredes[i].ow,this.paredes[i].oh);
        }
    };


    this.init();

}