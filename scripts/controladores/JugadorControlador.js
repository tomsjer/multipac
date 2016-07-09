 function JugadorControlador(opciones){
    
    this.modelo = this.tipoJugador(opciones);
    this.vista = new JugadorVista(this.modelo);
    this.vistaPuntaje = new JugadorPuntajeVista(this.modelo);

}
JugadorControlador.prototype = {
  comando:function(tecla){
      this.modelo.comando(tecla); // Dir. Tecla es una implementacion especifica
  },
  actualizar:function(){
       this.modelo.actualizar(); 
  },
  dibujar:function(){
       this.vista.dibujar(); 
  },
  actualizarPuntaje:function(){
       this.vistaPuntaje.actualizar(); 
  },
  tipoJugador:function(opciones) {

    var jugador;

    switch(opciones.tipo){
      case 'pacman':
        jugador = new PacmanModelo(opciones);
        break;

      default:
        throw 'JugadorControlador espera un tipo de jugador en las opciones!';
        break;
    }
    return jugador;
  }
};