 function JugadorControlador(opciones){
    
    this.modelo = new JugadorModelo(opciones);
    this.vista = new JugadorVista(this.modelo);
    this.vistaPuntaje = new JugadorPuntajeVista(this.modelo);

}

JugadorControlador.prototype.comando = function(tecla){
    this.modelo.comando(tecla); // Dir. Tecla es una implementacion especifica
};

JugadorControlador.prototype.actualizar = function(){
     this.modelo.actualizar(); 
};

JugadorControlador.prototype.dibujar = function(){
     this.vista.dibujar(); 
};

JugadorControlador.prototype.actualizarPuntaje = function(){
     this.vistaPuntaje.actualizar(); 
};
