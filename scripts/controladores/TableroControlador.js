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
        [0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,0,0,1,1,1,0],
        [0,1,0,0,0,0,0,0,1,0],
        [0,1,0,1,0,0,1,0,1,0],
        [0,0,0,1,0,0,1,0,0,0],
        [0,0,0,1,0,0,1,0,0,0],
        [0,1,0,1,1,1,1,0,1,0],
        [0,1,0,0,0,0,0,0,1,0],
        [0,1,1,1,0,0,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0]
    ]


    };

    /* Modelo */
    this.modelo = new TableroModelo(config);

    /* Vista */
    this.vista = new TableroVista(this.modelo);

    this.dibujar = this.vista.dibujar.bind(this.vista);


}