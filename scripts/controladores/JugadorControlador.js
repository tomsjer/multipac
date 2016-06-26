 function JugadorControlador(opciones){
    
    this.modelo = new JugadorModelo(opciones);
    this.vista = new JugadorVista(this.modelo);

}

JugadorControlador.prototype.mover = function(tecla){
    this.modelo.mover(tecla); // Dir. Tecla es una implementacion especifica
};

JugadorControlador.prototype.actualizar = function(){
     this.modelo.actualizar(); 
};

JugadorControlador.prototype.dibujar = function(){
     this.vista.dibujar(); 
};
