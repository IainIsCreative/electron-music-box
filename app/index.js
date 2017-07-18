const { ipcRenderer } = require('electron');
const socketIOClient = require('socket.io-client');

// Fetch Config file
const config = require('../config');

// Set up connection to Server Sockets
const io = socketIOClient(`http://${config.hostName}:${config.port}`);

// Apply additional classes for the `body` tag
const additionaClasses = [
  `platform-${process.platform}`,
].join(' ');

/**
 *
 * DOMContentLoaded event
 *
 * When the document and its contents are loaded, let the main app's scripts
 * begin.
 *
 */
document.addEventListener('DOMContentLoaded', () => {

  // Apply additional classes to the `body` tag
  document.body.classList.add(additionaClasses);

  // State that the app is trying to connect to the server.
  console.log('Client connecting...');

  /**
   *
   * Socket IO events
   *
   * When the client is connected to the server, update the app accordingly.
   * Show that the music box is connected if it's connected.
   *
   */
  io.on('connect', () => {
    io.emit('join', 'Client Connected');

    io.on('robot-connected', (connected) => {
      console.log(connected);
      document.getElementById('loading-text').innerHTML = 'Music Box Connected!';
      document.getElementById('loading-app').classList.add('f-app-loading--success');
      document.getElementById('main-app').classList.add('f-app-main-container--loaded');
    });
  });

  /**
   *
   * App Control Functionality.
   *
   * Find the container of the app controls, containing the buzzer playlist.
   * Next, get each list item and store them in an array.
   *
   * Loop through each list item, and get their button.
   * Store the song name included in the list item.
   * If the button is clicked, act accordingly.
   *
   */
  const playList = document.getElementById('playlist');
  const playListItems = playList.getElementsByTagName('li');

  // Begin loop through the playlist items
  for (i = 0; i < playListItems.length; i++) {

    // Get the button in the playlist item
    const playButton = playListItems[i].getElementsByTagName('button')[0];

    //
    let playing = false;

    // Store the song name in a constant.
    const songName = playButton.dataset.song;

    /**
     *
     * Play Button Click Event
     *
     * When clicked, check if the item is already playing.
     * If so, tell the music box to stop the song and change the button text.
     *
     * If not, tell the music box to play the selected song and change the
     * button text to say 'Stop' instead of 'Play'.
     * Then find all the other buttons and change the button text from 'Stop' to
     * 'Play'.
     *
     */
    playButton.addEventListener('click', () => {

      if (playing) {
        playing = false;
        playButton.innerHTML = 'Play';
        playButton.classList.remove('c-button--playing');
        io.emit('stop-song');
      } else {
        playing = true;
        playButton.innerHTML = 'Stop';
        playButton.classList.add('c-button--playing');
        io.emit('play-song', songName);

        for(n = 0; n < playListItems.length; n++) {
          const otherPlayButton = playListItems[n].getElementsByTagName('button')[0];

          /**
           *
           * If the item's button is not the current song and has the text
           * 'Stop', change its appearance back to the initial state.
           *
           */
          if(otherPlayButton.dataset.song != songName && otherPlayButton.innerHTML == 'Stop') {
            otherPlayButton.innerHTML = 'Play';
            otherPlayButton.classList.remove('c-button--playing');
          }
        }

        // When the song ends, change the button back to its initial state
        io.on('song-ended', () => {
          playing = false;
          playButton.innerHTML = 'Play';
          playButton.classList.remove('c-button--playing');
        });
      }
    });
  }

  // Fire the `show-window` event for the ipc in Electron
  ipcRenderer.send('show-window');

});
