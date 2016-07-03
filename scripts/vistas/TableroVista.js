function TableroVista(modelo){

    this.modelo = modelo;
    this.colorBorde = color('#111');
    this.colorPared = color('#000');
    this.colorComida = color('#fff');
    this.radioComida = 4;

    this.celdasSprite = new Array(34);
    for(var i = 0; i < this.celdasSprite.length; i++){
        this.celdasSprite[i] = loadImage('img/tablero/cbd-'+i+'.png');
    }

    this.celdasMap = {
        '10': 0,  // BD: CTL
        '11': 4,  // BD: CTR
        '12': 16, // BD: CBL
        '13': 17, // BD: CBR
        
        '14': 1,  // BD: BT
        '15': 6,  // BD: BR
        '16': 5,  // BD: BL
        '17': 7,  // BD: BB
        
        '18': 2,  // BD: TTL
        '19': 3,  // BD: TTR
        '20': 12, // BD: TLT
        '22': 14, // BD: TLB
        '21': 13, // BD: TRT
        '23': 15, // BD: TRB
        
        '28': 8,  // BD: CTL
        '29': 9,  // BD: CTR
        '30': 10, // BD: CBL
        '31': 11, // BD: CBR

        '24': 18, // BS: CTL
        '25': 19, // BS: CTR
        '26': 23, // BS: CBL
        '27': 24, // BS: CBR

        '36': 26, // BS: TTL
        '37': 27, // BS: TTR
        '38': 28, // BS: TLT
        '40': 30, // BS: TLB
        '39': 29, // BS: TRT
        '41': 31, // BS: TRB
        '42': 32, // BS: TBL
        '43': 33, // BS: TBR

        '32': 20, // BS: BT
        '33': 25, // BS: BB
        '34': 22, // BS: BL
        '35': 21  // BS: BR
        
    };

    return this;
}

TableroVista.prototype.dibujar = function(){
    
    background(0,0,0);
    imageMode(CENTER);
    rectMode(CENTER);
    this.modelo.grilla.forEach(function(cols){
        cols.forEach(function(celda){
            

            if(celda.estado !== 0 && celda.estado !== 1 && celda.estado !== 2  ){

                image(this.celdasSprite[this.celdasMap[celda.estado]],celda.x,celda.y);
                
            }
            // Celda ocupada
            if(celda.estado === 1){
                
                stroke(this.colorBorde);
                fill(this.colorPared);
                rect(celda.x,celda.y,this.modelo.anchoCelda,this.modelo.altoCelda);
            }    
            // Celda con comida
            else if(celda.estado === 2){

                stroke(this.colorBorde);
                noFill();
                rect(celda.x,celda.y,this.modelo.anchoCelda,this.modelo.altoCelda);
                noStroke();
                fill(this.colorComida);
                ellipse(celda.x,celda.y,this.radioComida,this.radioComida);
            }
            // Celda libre
            else{
                //noStroke();
                stroke(50,50,50,100);
                noFill();
                rect(celda.x,celda.y,this.modelo.anchoCelda,this.modelo.altoCelda);
                
            }

        },this);
    },this);
};