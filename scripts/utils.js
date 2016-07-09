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

function extend(base, sub) {
  // Avoid instantiating the base class just to setup inheritance
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
  // for a polyfill
  // Also, do a recursive merge of two prototypes, so we don't overwrite 
  // the existing prototype, but still maintain the inheritance chain
  // Thanks to @ccnokes
  var origProto = sub.prototype;
  sub.prototype = Object.create(base.prototype);
  for (var key in origProto)  {
     sub.prototype[key] = origProto[key];
  }
  // Remember the constructor property was set wrong, let's fix it
  sub.prototype.constructor = sub;
  // In ECMAScript5+ (all modern browsers), you can make the constructor property
  // non-enumerable if you define it like this instead
  Object.defineProperty(sub.prototype, 'constructor', { 
    enumerable: false, 
    value: sub 
  });
}
