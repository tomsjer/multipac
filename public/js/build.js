(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var config = require('../../config.json');
var wsServer = (config.protocol === 'http' ? 'ws' : 'wss') + '://' + config.ip + ':' + config.port;

function startWsConnection() {

  var ws = new WebSocket(wsServer);

  ws.onopen = function () {
    ws.send('somethingasds');
  };

  ws.onmessage = function (message) {

    var msg = message.data.indexOf('{') !== -1 ? JSON.parse(message.data) : message.data;
    console.log(msg);

    if (msg.reload) {
      window.location.reload(true);
    } else {
      console.log('Unhandled message: ' + message.data.toString());
    }
  };
}

fetch('/login', { method: 'POST', credentials: 'same-origin' }).then(function () {
  startWsConnection();
}).catch(function (err) {
  console.log(err);
});

},{"../../config.json":2}],2:[function(require,module,exports){
module.exports={"protocol":"https","ip":"192.168.2.14","port":8080}
},{}]},{},[1])

//# sourceMappingURL=build.js.map
