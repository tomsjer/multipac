function TableroControlador(){

    // TODO: cargar desde JSON
    var config = {
        alto: 500,
        ancho: 500,
        filas: 10,
        columnas: 10,
        anchoCelda : 50,// (window.innerWidth/10),
        altoCelda: 50,// (window.innerHeight/10),
        estadoGrilla: [
        // [0,0,0,0,0,0,0,0,0,0],
        // [0,1,1,1,0,0,1,1,1,0],
        // [0,1,0,0,0,0,0,0,1,0],
        // [0,1,0,1,0,0,1,0,1,0],
        // [0,0,0,1,0,0,1,0,0,0],
        // [0,0,0,1,0,0,1,0,0,0],
        // [0,1,0,1,1,1,1,0,1,0],
        // [0,1,0,0,0,0,0,0,1,0],
        // [0,1,1,1,0,0,1,1,1,0],
        // [0,0,0,0,0,0,0,0,0,0]
        [0,0,0,0,0,0,0,0,0,0],
        [0,1,1,0,1,0,0,1,1,1],
        [0,1,0,0,1,0,0,1,0,1],
        [0,1,1,0,1,1,0,1,0,1],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,1,1,0,1,0,1,0,0,0],
        [0,1,0,0,1,0,1,0,0,0],
        [0,1,1,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ]


    };

    /* Modelo */
    var modelo = new TableroModelo(config);

    /* Vista */
    var vista = new TableroVista(modelo);

    this.dibujar = vista.dibujar.bind(vista);
    
    this.celdaOcupada = function(x,y){
        return modelo.grilla[x][y].ocupado;
    };

    this.anchoCelda = function(){
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

    return this;
}