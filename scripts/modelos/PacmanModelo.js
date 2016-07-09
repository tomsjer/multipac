function PacmanModelo(opciones){
    JugadorModelo.call(this,opciones);
}

PacmanModelo.prototype = {

  actualizar:function(){

    JugadorModelo.prototype.actualizar.call(this);

    if(this.hayComida()){
        this.comer();
    }
  },

  hayComida : function(){
      return this.tablero.celdaConComida(this.ubicacionGrilla.y,this.ubicacionGrilla.x);
  },

  comer : function(){
      this.tablero.comer(this.ubicacionGrilla.y,this.ubicacionGrilla.x); 
      this.puntaje += 1;
      socket.emit('comio jugador',{
          id: this.id
      });
  }
};

extend(JugadorModelo,PacmanModelo);