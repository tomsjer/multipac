function TableroModelo(config){
    
    if(!config && typeof config !== 'object'){
        throw 'TableroModelo espera un obejto de configuracion.';
    }

    if(!config.estadoGrilla || !config.estadoGrilla.length){
        throw 'TableroModelo espera un objeto de configuracion con la propiedad estadoGrilla[].';
    }

    function grilla(_f,_c){

        var f = [];

        for(var i = 0; i < _f; i++){

            var y = i * this.altoCelda + this.altoCelda/2;//(this.alto / _c) * i + this.altoCelda/2;
            var c = [];
            
            for(var j = 0; j < _c; j++){
                var x = j * this.anchoCelda + this.anchoCelda/2;//(this.ancho / _f) * j + this.anchoCelda/2;
                
                c.push({
                    x:x,
                    y:y,
                    estado: this.estadoGrilla[i][j]
                });
            }

            f.push(c);
        }

        console.log('TABLERO: ',f);

        return f;

    }


    this.estadoGrilla = config.estadoGrilla;
    
    this.filas      = this.estadoGrilla.length;
    this.columnas   = this.estadoGrilla[0].length;

    this.anchoCelda = (config.anchoCelda | 0) || 20;
    this.altoCelda  = (config.altoCelda | 0) || 20;

    this.ancho      = this.columnas * this.anchoCelda;
    this.alto       = this.filas * this.altoCelda;
    
    
    this.grilla     = grilla.bind(this)(this.filas, this.columnas);
    
    this.celdaOcupada = function(y,x){
        return (this.grilla[y][x].estado !== 0 && this.grilla[y][x].estado !== 2 );
    };

    this.celdaConComida = function(y,x){
        return (this.grilla[y][x].estado === 2);
    };

    this.celdaComida = function(y,x){
        this.grilla[y][x].estado = 0;
    };

    return this;
}