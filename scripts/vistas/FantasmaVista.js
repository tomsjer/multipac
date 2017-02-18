function FantasmaVista(modelo){
    this.modelo = modelo;
    this.sprite = new Array(8);
    for(var i = 0; i < this.sprite.length; i++){
        this.sprite[i]  = new Image();
        this.sprite[i].src = 'img/fs-0'+(i)+'.png';
    }
    
    this.rotacionMap = {
        '3.141592653589793'  : 0,
        '4.71238898038469'   : 2,
        '0'                  : 4,
        '1.5707963267948966' : 6
    };
}

FantasmaVista.prototype = {
    dibujar:function(){

        var i = (this.modelo.moviendo()) ? Math.floor((frameCount % 4) /2) : 0;
        i = this.rotacionMap[this.modelo.rotacion()] + i;
        
        ctx.save();
        ctx.translate(this.modelo.posX()-18,this.modelo.posY()-18);
        ctx.drawImage(this.sprite[i],0, 0);
        ctx.restore();
    }
};