function JugadorModelo(){

    

    this.moverJugador = function(jugador){
        this.jugadores[jugador.id].mover(touch.dir);
    };
}