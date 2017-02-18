 function JugadorControlador(opciones){
    
    this.modelo = this.tipoJugador(opciones);
    this.vista = this.tipoVista();
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

     case 'fantasma':
        jugador = new FantasmaModelo(opciones);
        break;

      default:
        throw 'JugadorControlador espera un tipo de jugador en las opciones!';
        break;
    }
    return jugador;
  },
  tipoVista:function(){

    var vista;

    switch(this.modelo.tipo){
        case 'pacman':
            vista = new PacmanVista(this.modelo);
            break;

        case 'fantasma':
            vista = new FantasmaVista(this.modelo);
            break;

        default:
            throw 'JugadorControlador espera un tipo de jugador en las opciones!';
            break;
    }

    return vista;
  }

};