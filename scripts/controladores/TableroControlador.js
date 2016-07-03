function TableroControlador(config){

    /* Modelo */
    var modelo = new TableroModelo(config);

    /* Vista */
    var vista = new TableroVista(modelo);

    this.dibujar = vista.dibujar.bind(vista);
    
    this.celdaOcupada = function(y,x){
        return modelo.celdaOcupada(y,x);
    };

    this.celdaConComida = function(y,x){
        return modelo.celdaConComida(y,x);
    };

    this.comer = function(y,x){
        modelo.celdaComida(y,x);
    };

    this.anchoCelda = function(y,x){
        return modelo.anchoCelda;
    };

    this.altoCelda = function(){
        return modelo.altoCelda;
    };

    this.filas = function(){
        return modelo.filas;
    };

    this.columnas = function(){
        return modelo.columnas;
    };

    this.ancho = function(){
        return modelo.ancho;
    };

    this.alto = function(){
        return modelo.alto;
    };

    return this;
}