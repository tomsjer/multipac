function TableroModelo(config){
    
    if(!config && typeof config !== 'object'){
        throw 'TableroModelo espera un obejto de configuracion.';
    }

    function grilla(_f,_c){

        var f = [];

        for(var i = 0; i < _f; i++){

            var y = (this.alto / _c) * i + this.altoCelda/2;
            var c = [];
            
            for(var j = 0; j < _f; j++){
                var x = (this.ancho / _f) * j + this.anchoCelda/2;
                
                c.push({
                    x:x,
                    y:y,
                    ocupado: this.estadoGrilla[i][j]
                });
            }

            f.push(c);
        }

        return f;

    }

    this.ancho      = config.ancho || window.innerWidth;
    this.alto       = config.alto || window.innerHeight;
    this.filas      = config.filas;
    this.columnas   = config.columnas;
    this.anchoCelda = config.anchoCelda;
    this.altoCelda  = config.altoCelda;
    this.estadoGrilla = config.estadoGrilla;
    this.grilla     = grilla.bind(this)(this.filas, this.columnas);
    

    return this;
}