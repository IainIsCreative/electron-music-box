const { ipcRenderer } = require('electron');
const socketIOClient = require('socket.io-client');

const io = socketIOClient('http://localhost:3000');

const additionaClasses = [
  `platform-${process.platform}`,
].join(' ');

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add(additionaClasses);
  ipcRenderer.send('show-window');

  // console.log(window.)

  io.on('connect', () => {
    console.log('client connecting...');
    io.emit('join', 'Client Connected');

    io.on('robot-connected', (bool) => {
      document.getElementById('loading-app').innerHTML = 'Robot Connected!';
    });
  });

  const playList = document.getElementById('playlist');

  const playListItems = playList.getElementsByTagName('li');

  for (i = 0; i < playListItems.length; i++) {

    // Get the button in the playlist item
    const playButton = playListItems[i].getElementsByTagName('button')[0];

    let playing = false;

    const songName = playButton.dataset.song;
    // console.log(buttonString);

    playButton.addEventListener('click', () => {
      if (playing) {
        playButton.innerHTML = 'Play';
        playing = false;
        io.emit('stop-song');
      } else {
        playButton.innerHTML = 'Stop';
        playing = true;
        io.emit('play-song', songName);

        for(n = 0; n < playListItems.length; n++) {
          if(n != i) {
            // console.log(playListItems[n].innerHTML);
            const previousPlayButton = playListItems[n].getElementsByTagName('button')[0];

            if(previousPlayButton.innerHTML === 'Stop') {
              previousPlayButton.innerHTML === 'Play';
            }
          }
        }
      }
    });
  }

});
