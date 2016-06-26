function TableroVista(modelo){

    this.modelo = modelo;
    this.color = color('#fff');
    
    this.dibujar = function(){

        background(0,0,0);
        //noStroke();
        stroke(255,0,0);
        fill(this.color);
        rectMode(CENTER);
        this.modelo.grilla.forEach(function(cols){
            cols.forEach(function(c){
                if(c.ocupado){
                    rect(c.x,c.y,this.modelo.anchoCelda,this.modelo.altoCelda);
                }
            },this);
        },this);
    };

    return this;
}