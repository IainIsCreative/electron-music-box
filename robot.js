const { Board, Piezo, Led } = require('johnny-five');
const express = require('express');
const { Server } = require('http');
const socketIO = require('socket.io');
const songs = require('j5-songs');

const app = express();
const http = Server(app);
const io = socketIO.listen(http);

const board = new Board();

http.listen(3000, () => {
  console.log('Server Running');
});

io.on('connect', (client) => {

  client.on('join', handshake => {
    console.log(handshake);
  })

});

board.on('ready', function() {

  console.log('board ready');

  const buzzer = new Piezo(3);

  buzzer.play(songs.load('never-gonna-give-you-up'));

});
