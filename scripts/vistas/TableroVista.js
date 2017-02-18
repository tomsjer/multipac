function TableroVista(modelo){

    this.modelo = modelo;
    this.colorBorde = '#111';
    this.colorPared = '#000';
    this.colorComida = '#fff';
    this.radioComida = 2;
    this.comida = new Path2D();
    this.comida.arc(12,12,this.radioComida,0,360,false);

    this.celdasSprite = new Array(34);
    for(var i = 0; i < this.celdasSprite.length; i++){
        this.celdasSprite[i] = new Image();
        this.celdasSprite[i].src = 'img/tablero/cbd-'+i+'.png';/*loadImage('img/tablero/cbd-'+i+'.png');*/
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
    
    /*background(0,0,0);
    imageMode(CENTER);
    rectMode(CENTER);*/

    /*ctx.fillStyle = "black";*/
    this.modelo.grilla.forEach(function(cols,i){
        cols.forEach(function(celda,j){
            
            ctx.save();
            ctx.translate(celda.x - this.modelo.anchoCelda/2, celda.y - this.modelo.altoCelda/2);
            if(celda.estado !== 0 && celda.estado !== 1 && celda.estado !== 2  ){

                /*image(this.celdasSprite[this.celdasMap[celda.estado]],celda.x,celda.y);*/
                ctx.drawImage(this.celdasSprite[this.celdasMap[celda.estado]],0,0,this.modelo.anchoCelda,this.modelo.altoCelda);
                
            }
            /*// Celda ocupada
            if(celda.estado === 1){
                
                stroke(this.colorBorde);
                fill(this.colorPared);
                rect(celda.x,celda.y,this.modelo.anchoCelda,this.modelo.altoCelda);
            }*/    
            // Celda con comida
            else if(celda.estado === 2){

                ctx.fillStyle = this.colorComida;
                ctx.fill(this.comida);
            }
            /*
            // Celda libre
            else{
                //noStroke();
                stroke(50,50,50,100);
                noFill();
                rect(celda.x,celda.y,this.modelo.anchoCelda,this.modelo.altoCelda);
                
            }*/
           /* ctx.strokeStyle = this.colorBorde;
            ctx.strokeRect(0, 0, this.modelo.anchoCelda,this.modelo.altoCelda);*/
            ctx.restore();

        },this);
    },this);
};