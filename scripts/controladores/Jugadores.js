function Jugadores(){

    this.jugadores = {};

    this.agregarJugador = function(jugador){
        this.jugadores[jugador.id] = new JugadorControlador(jugador);
    };

    this.moverJugador = function(jugador,dir){
        this.jugadores[jugador.id].mover(dir);
    };

    jugadores.actualizar = this.jugadores.forEach(function(jugador){
        jugador.actualizar();
    },this);

    jugadores.dibujar = this.jugadores.forEach(function(jugador){
        jugador.dibujar();
    },this);

    return this;
}