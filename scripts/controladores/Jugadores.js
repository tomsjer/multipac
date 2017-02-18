function Jugadores(tablero){

    this.jugadores = {};
    this.tablero = tablero;

    this.nuevoJugador = function(jugador){
        
        jugador.tablero = this.tablero;

        if(jugador.id === 'fantasma'){
            jugador.pacman = this.jugadores.pacman.modelo;
        }

        this.jugadores[jugador.id] = new JugadorControlador(jugador);
    };

    this.comandoJugador = function(jugador,dir){
        this.jugadores[jugador].comando(dir);
    };

    this.actualizarPuntaje = function(jugador){
        this.jugadores[jugador].actualizarPuntaje();
    };

    this.actualizar = function(){

        for(var jugador in this.jugadores){
            this.jugadores[jugador].actualizar();
        }
    };

    this.dibujar = function(){
        for(var jugador in this.jugadores){
            this.jugadores[jugador].dibujar();
        }
    };

    return this;
}