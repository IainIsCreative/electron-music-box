const { ipcRenderer } = require('electron');
const socketIOClient = require('socket.io-client');

const io = socketIOClient('http://localhost:3000');

io.on('connect', () => {
  console.log('client connecting...');
  io.emit('join', 'Client Connected');
});

const additionaClasses = [
  `platform-${process.platform}`,
].join(' ');

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add(additionaClasses);
  ipcRenderer.send('show-window');

  // console.log(window.)

  const playList = document.getElementById('playlist');

  const playListItems = playList.getElementsByTagName('li');

  for (i = 0; i < playListItems.length; i++) {

    // Get the button in the playlist item
    const playButton = playListItems[i].getElementsByTagName('button')[0];

    let playing = false;

    const songName = playButton.dataset.song;
    console.log(songName);
    // console.log(buttonString);

    playButton.addEventListener('click', () => {
      console.log(songName);
      if (playing) {
        playButton.innerHTML = 'Play';
        playing = false;
      } else {
        playButton.innerHTML = 'Stop';
        playing = true;
      }
    });
  }

});
