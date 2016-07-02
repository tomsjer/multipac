function Jugadores(tablero){

    this.jugadores = {};
    this.tablero = tablero;

    this.nuevoJugador = function(jugador){
        jugador.tablero = this.tablero;
        this.jugadores[jugador.id] = new JugadorControlador(jugador);
    };

    this.moverJugador = function(jugador,dir){
        this.jugadores[jugador].mover(dir);
    };

    this.actualizar = function(){
        
        for(var jugador in this.jugadores){
            this.jugadores[jugador].actualizar();
        }
        // this.jugadores.forEach(function(jugador){
        //     jugador.actualizar();
        // },this);
    };

    this.dibujar = function(){
        for(var jugador in this.jugadores){
            this.jugadores[jugador].dibujar();
        }
    };

    // this.jugadores.forEach(function(jugador){
    //     jugador.dibujar();
    // },this);

    return this;
}