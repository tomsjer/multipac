function TableroVista(modelo){

    this.modelo = modelo;
    this.colorBorde = color('#111');
    this.colorPared = color('#00a');
    this.colorComida = color('#fff');
    this.radioComida = 10;

    return this;
}

TableroVista.prototype.dibujar = function(){
    
    background(0,0,0);
        
    rectMode(CENTER);
    this.modelo.grilla.forEach(function(cols){
        cols.forEach(function(celda){
            
            // Celda ocupada
            if(celda.estado === 1){
                
                stroke(this.colorBorde);
                fill(this.colorPared);
                rect(celda.x,celda.y,this.modelo.anchoCelda*0.5,this.modelo.altoCelda*0.5);
            }    
            // Celda con comida
            else if(celda.estado === 2){

                stroke(this.colorBorde);
                noFill();
                rect(celda.x,celda.y,this.modelo.anchoCelda*0.5,this.modelo.altoCelda*0.5);
                noStroke();
                fill(this.colorComida);
                ellipse(celda.x,celda.y,this.radioComida,this.radioComida);
            }
            // Celda libre
            else{
                //noStroke();
                stroke(this.colorBorde);
                noFill();
                rect(celda.x,celda.y,this.modelo.anchoCelda*0.5,this.modelo.altoCelda*0.5);
                
            }

        },this);
    },this);
};