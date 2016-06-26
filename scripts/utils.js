function esObjetoVacio(obj){

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return false;
}