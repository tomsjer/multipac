function esObjetoVacio(obj){

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return false;
}

function formatearCeros(numero){

    if(typeof numero !== 'number'){
        throw 'La funcion formatearCeros necesita un numero como parametro.';
    }

    if(numero < 10){
        numero = '000'+numero;
    }
    else if(numero < 100){
        numero = '00'+numero;
        
    }
    else if(numero < 1000){
        numero = '0'+numero;
    }

    return numero;
}