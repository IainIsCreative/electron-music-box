const { Board, Piezo, Led } = require('johnny-five');
const express = require('express');
const { Server } = require('http');
const socketIO = require('socket.io');
const songs = require('j5-songs');

const config = require('./config');

const app = express();
const http = Server(app);
const io = socketIO.listen(http);

const board = new Board();

http.listen(config.port, () => {
  console.log('Server Running');
});

board.on('ready', function() {

  console.log('board ready');

  const buzzer = new Piezo(3);

  io.on('connect', (client) => {

    client.on('join', handshake => {
      io.emit('robot-connected', 'Robot Connected');

      console.log(handshake);
    });

    client.on('play-song', (song) => {
      buzzer.stop();
      // buzzer.off();
      buzzer.play(songs.load(song));
    });

    client.on('stop-song', () => {
      buzzer.stop();
      buzzer.off();
    });

  });

});
