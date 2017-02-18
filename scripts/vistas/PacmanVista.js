function PacmanVista(modelo){

    this.modelo = modelo;
    this.sprite =  new Array(4);
    for(var i = 0; i < this.sprite.length; i++){
        this.sprite[i]  = new Image();
        this.sprite[i].src = 'img/ps-sm-0'+(i+1)+'.png';
    }
    this.spriteMuerte = new Array(8);
    for(var j = 0; j < this.spriteMuerte.length; j++){
    }
    var that = this;
    this.flag = true;
    loadSound('../sounds/pacman_chomp.wav',function(buffer){ that.audioComer = buffer ; });
    loadSound('../sounds/pacman_death.wav',function(buffer){ that.audioMorir = buffer ; });
    
}

PacmanVista.prototype = {

    dibujar: function(){
        
        ctx.save();
        ctx.translate((this.modelo.posX()),(this.modelo.posY()));
        ctx.rotate(this.modelo.rotacion());
        ctx.translate(-18,-18); //FIXME: variable radio?
        
        if(this.modelo.estado !== 'muerto'){
            this.moviendo();
        }else{
            this.muriendo();
        }

        ctx.restore();
        
    },
    moviendo:function(){
        
        var i = (this.modelo.moviendo()) ? Math.floor((frameCount % 4 )) : 2;

        ctx.drawImage(this.sprite[i],0, 0);
        if(this.audioComer && this.modelo.moviendo() && frameCount % 20 === 0){
            playSound(this.audioComer,0);
        }

        debug(function(){

            ctx.strokeStyle = "red";
            ctx.strokeRect(0,0, 36, 36);
            ctx.strokeStyle = "yellow";
            ctx.strokeRect(0,0, 5, 5);

        });
        
    },
    muriendo:function(){
        if(this.flag){
            playSound(this.audioMorir,0);
            this.flag = false;
        }
        
        /*var i =  Math.floor( (frameCount % 64) / 8 );
        image(this.spriteMuerte[i],0, 0);*/
    }
};