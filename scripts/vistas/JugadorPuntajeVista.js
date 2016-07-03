function JugadorPuntajeVista(modelo){
    
    this.modelo = modelo;
    this.div = document.createElement('div');
    this.div.id = this.modelo.id+'-puntaje';
    this.div.className = 'jugadorPuntaje';
    this.nombre = document.createElement('p');
    this.nombre.innerHTML = this.modelo.id;
    this.puntaje = document.createElement('h4');
    this.puntaje.innerHTML = formatearCeros(this.modelo.puntaje);

    this.div.appendChild(this.nombre).appendChild(this.puntaje);
    document.getElementsByTagName('body')[0].appendChild(this.div);

    return this;
}

JugadorPuntajeVista.prototype.actualizar = function(){
     this.puntaje.innerHTML = formatearCeros(this.modelo.puntaje); 
};
