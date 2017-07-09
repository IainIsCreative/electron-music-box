const { ipcRenderer } = require('electron');

const additionaClasses = [
  `platform-${process.platform}`,
].join(' ');

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add(additionaClasses);
  ipcRenderer.send('show-window');

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
