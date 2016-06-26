function JugadorVista(modelo){
    
    this.modelo = modelo;
    this.color = color('yellow');
    //TODO: el srpite depende del tipo de jugador
    this.pacmanSprite = [];
    for(var i = 0; i < 4; i++){
        this.pacmanSprite[i]  = loadImage('img/ps-0'+(i+1)+'.png');
    }
}

JugadorVista.prototype.dibujar = function(){
    var i = Math.floor((frameCount % 8 )/ 2);
    noFill();
    stroke(255,0,0);
    rectMode(CENTER);
    rect(this.modelo.ubicacion.x,this.modelo.ubicacion.y,this.modelo.radio*2,this.modelo.radio*2);
    imageMode(CENTER);
    image(this.pacmanSprite[i],this.modelo.ubicacion.x, this.modelo.ubicacion.y);
};