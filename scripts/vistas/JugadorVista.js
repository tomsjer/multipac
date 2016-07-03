function JugadorVista(modelo){
    
    this.modelo = modelo;
    this.color = color('yellow');
    
    //TODO: el srpite depende del tipo de jugador
    this.pacmanSprite = new Array(4);
    for(var i = 0; i < this.pacmanSprite.length; i++){
        this.pacmanSprite[i]  = loadImage('img/ps-sm-0'+(i+1)+'.png');
    }
}

//TODO: solo animo el sprite si avanzo.
JugadorVista.prototype.dibujar = function(){
    
    var i = (this.modelo.moviendo()) ? Math.floor((frameCount % 4 )) : 2;
    

    // DEBUG
    noFill();
    push();
    translate(this.modelo.ubicacion.x,this.modelo.ubicacion.y);
    rotate(this.modelo.rotActual);
    imageMode(CENTER);
    image(this.pacmanSprite[i],0, 0);
    /*stroke(255,255,0);
    rectMode(CENTER);
    rect(0,0,this.modelo.diametro,this.modelo.diametro);*/
    pop();
    
};