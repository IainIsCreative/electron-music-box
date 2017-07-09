const { Board, Piezo, Led } = require('johnny-five');
const express = require('express');
const socketIO = require('socket.io');
const songs = require('j5-songs');

const board = new Board();

board.on('ready', function() {

  console.log('board ready');

  const light = new Led(9);

  light.on();

});
