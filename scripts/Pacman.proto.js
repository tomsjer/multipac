function Pacman(tablero){
    
    this.pacmanSprite = [];
    for(var i = 0; i < 4; i++){
        this.pacmanSprite[i]  = loadImage('img/ps-0'+(i+1)+'.png');
    }

    this.caminando = false;
    this.radio = 60;
    this.color = color('yellow');
    this.ubicacion = createVector(0+this.radio/2,0+this.radio/2);
    this.velocidad = createVector(0,0);
    this.acelVel = 5;
    this.maximaAceleracion = 10;
    this.aceleracion = createVector(0,0);
    this.tablero = tablero;

    this.actualizar = function actualizar(){

        if(keyIsDown(UP_ARROW) || teclas['38']){
            this.acelerar(0,-this.acelVel);
        }else
        if(keyIsDown(DOWN_ARROW) || teclas['40']){
            this.acelerar(0,this.acelVel);
        }else
        if(keyIsDown(LEFT_ARROW) || teclas['37']){
            this.acelerar(-this.acelVel,0);
        }else
        if(keyIsDown(RIGHT_ARROW) || teclas['39']){
            this.acelerar(this.acelVel,0);
        }else{
            this.aceleracion = createVector(0,0);
            this.velocidad= createVector(0,0);
        }

        this.velocidad.add(this.aceleracion);
        this.ubicacion.add(this.velocidad);

    };

    this.acelerar = function acelerar(x,y){

        this.velocidad = createVector(0,0);
        this.aceleracion = createVector(x,y);
        this.aceleracion.setMag(this.maximaAceleracion);

        var ubicacion = p5.Vector.add(this.ubicacion,p5.Vector.add(this.velocidad,this.aceleracion));
     

        this.limitarPantalla(ubicacion);

        for(var i = 0; i < this.tablero.paredes.length; i++){
            this.chequearParedes(ubicacion, this.tablero.paredes[i]);
        }

    };

    this.limitarPantalla = function limitarPantalla(ubicacion){

        if(ubicacion.x < 0+this.radio/2 || ubicacion.x > width-this.radio/2){
            this.aceleracion.x = 0;
        }
        if(ubicacion.y < 0+this.radio/2 || ubicacion.y > height-this.radio/2){
            this.aceleracion.y = 0;
        }
    };

    this.chequearParedes = function chequearParedes(ubicacion,pared){
   
        if( ubicacion.x > pared.x-this.radio/2 && ubicacion.x < (pared.x+pared.ow)+this.radio/2){
            if(ubicacion.y > pared.y-this.radio/2 && ubicacion.y < (pared.y+pared.oh)+this.radio/2){
                this.aceleracion = createVector(0,0);
            }
        }

    };

    this.dibujar = function dibujar(){

        var i = Math.floor((frameCount % 8 )/ 2);

        if(keyIsDown(DOWN_ARROW) || teclas['40']){
            
            rotate(PI);
            imageMode(CENTER);
            image(this.pacmanSprite[i],this.ubicacion.x, this.ubicacion.y);
         
        
        }else{
            image(this.pacmanSprite[i],this.ubicacion.x, this.ubicacion.y);
        }
        
    };

    this.caminando = function caminando(){

    };
}
