const { Board, Piezo, Led } = require('johnny-five');
const express = require('express');
const { Server } = require('http');
const socketIO = require('socket.io');
const songs = require('j5-songs');

// Import project config
const config = require('./config');

// Set up the socker server
const app = express();
const http = Server(app);
const io = socketIO.listen(http);

// Make a new johnny-five Board() instance
const board = new Board();

// Begin the server under the specified port
http.listen(config.port, () => {
  console.log('Server Running');
});

/**
 *
 * When the board is ready, notify the terminal console.
 * Then specify the buzzer's pin using the Piezo class.
 *
 */
board.on('ready', function() {
  console.log('board ready');

  // Store the Piezo in a constant
  const buzzer = new Piezo(3);

  io.on('connect', (client) => {

    client.on('join', handshake => {
      /**
       *
       * Let the app know that they've now connected to the robot so the app's
       * interface can be updated to remove the loading animation and show the
       * playlist controls.
       *
       */
      io.emit('robot-connected', 'Robot Connected');
      // Write the handshake in the terminal console
      console.log(handshake);
    });

    /**
     *
     * When the app selects a song to play, stop the buzzer playing the current
     * song, then play the selected song.
     *
     */
    client.on('play-song', (song) => {
      buzzer.stop();
      console.log(`Current song is ${song}`);
      buzzer.play(songs.load(song), (songEnded) => {
        if(songEnded) {
          io.emit('song-ended');
        }
      });
    });

    /**
     *
     * If the app selects a song that's already playing, stop the buzzer.
     *
     */
    client.on('stop-song', () => {
      buzzer.stop();
    });

  });

});
