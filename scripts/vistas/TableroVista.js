function TableroVista(modelo){

    this.modelo = modelo;
    this.color = color('#fff');
    
    this.dibujar = function(){

        background(0,0,0);
        
        rectMode(CENTER);
        this.modelo.grilla.forEach(function(cols){
            cols.forEach(function(c){
                if(c.ocupado){
                    //noStroke();
                    stroke(255,0,0);
                    fill(this.color);
                    rect(c.x,c.y,this.modelo.anchoCelda,this.modelo.altoCelda);
                }else{
                    //noStroke();
                    stroke(100,100,100);
                    noFill();
                    rect(c.x,c.y,this.modelo.anchoCelda,this.modelo.altoCelda);
                }

            },this);
        },this);
    };

    return this;
}