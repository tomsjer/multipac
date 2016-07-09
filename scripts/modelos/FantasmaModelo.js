function FantasmaModelo(opciones){
    JugadorModelo.call(this,opciones);
}

FantasmaModelo.prototype = {

  actualizar:function(){

    JugadorModelo.prototype.actualizar.call(this);

    // if(this.hayComida()){
    //     this.comer();
    // }
  }
};

extend(JugadorModelo,FantasmaModelo);