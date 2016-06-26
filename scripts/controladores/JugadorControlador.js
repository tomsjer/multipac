 function JugadorControlador(opciones){
    
    this.modelo = new JugdorModelo(opciones);
    this.vista = new JugadorVista();
    
}

Jugador.prototype.mover = function(tecla){
    this.teclas[tecla] = true;
};
