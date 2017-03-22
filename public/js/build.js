(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var ws = new WebSocket('ws://10.226.110.127:8080');
var map = function map(val, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (val - low1) / (high1 - low1);
};

var a = document.querySelector('#alpha');
var b = document.querySelector('#beta');
var g = document.querySelector('#gamma');

ws.onopen = function () {
  ws.send('something');
};
ws.onmessage = function (message) {
  console.log(message);
  var msg = JSON.parse(message.data);
  switch (msg) {
    case msg.reload:
      window.location.reload(true);
      break;
    default:
      console.log('Unhandled message: ' + message.data.toString());
      break;
  }
};

window.addEventListener('keyup', function (e) {
  ws.send(e.keyCode.toString());
});

window.addEventListener('deviceorientation', function (e) {
  // const alpha = map(e.alpha, 0, 360, -1, 1).toFixed(2);
  // const beta = map(e.beta, -180, 180, -1, 1).toFixed(2);
  // const gamma = map(e.gamma, -90, 90, -1, 1).toFixed(2);

  a.style.transform = 'rotateZ(' + -e.alpha + 'deg)';
  b.style.transform = 'rotateX(' + e.beta + 'deg)';
  g.style.transform = 'rotateY(' + e.gamma + 'deg)';
});

/*

DeviceOrientationEvent.alpha Read only
A number representing the motion of the device around the z axis, express in degrees with values ranging from 0 to 360
DeviceOrientationEvent.beta Read only
A number representing the motion of the device around the x axis, express in degrees with values ranging from -180 to 180. This represents a front to back motion of the device.
DeviceOrientationEvent.gamma Read only
A number representing the motion of the device around the y axis, express in degrees with values ranging from -90 to 90. This represents a left to right motion of the device.

 */

},{}]},{},[1])

//# sourceMappingURL=build.js.map
