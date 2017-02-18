function FantasmaModelo(opciones){
    JugadorModelo.call(this,opciones);

    this.objetivo = opciones.pacman;
}

FantasmaModelo.prototype = {

  actualizar:function(){

    JugadorModelo.prototype.actualizar.call(this);

    if(this.hayPacman()){
        this.comerPacman();
    }
  },
  hayPacman:function(){
    return (Math.abs(this.ubicacion.x - this.objetivo.posX()) + Math.abs(this.ubicacion.y - this.objetivo.posY()) < this.radio);
  },
  comerPacman: function(){
    console.log('murio el pacman... :(');
    this.objetivo.murio();
  }
};

extend(JugadorModelo,FantasmaModelo);