let canvas;
let world;
let keyboard = new Keyboard();
let idsOfIntervals = [];
let backgroundSong = new Audio("audio/backgroundSong.mp3");
let isSoundOn = true;
let isSongOn = true;
let isGameRunning = false;
let isFullScreenShown = false;

async function init() {
  await initSetLevel();
  await startGame();
  await closeDisplays();
  await music();
}

function fullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  enterFullscreen(fullscreen);
  canvasFullScreenFilling();
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function canvasFullScreenFilling() {
  let canvas = document.getElementById("canvas");
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  document.getElementById("full-screen").src = "./img/button-images/small-screen.png";
  let overlayScreens = document.getElementsByClassName("screen");
  for (let i = 0; i < overlayScreens.length; i++) {
    overlayScreens[i].style.width = "100vw";
    overlayScreens[i].style.height = "100vh";
  }
}

// function exitFullscreen() {
//   if (document.exitFullscreen) {
//     document.exitFullscreen();
//   } else if (document.webkitExitFullscreen) {
//     document.webkitExitFullscreen();
//   }
// }

async function music() {
  if (isSoundOn) document.getElementById("sound").src = "./img/button-images/sound-on.png";
  else document.getElementById("sound").src = "./img/button-images/sound-off.png";
  if (isSongOn && isGameRunning) {
    document.getElementById("song").src = "./img/button-images/song-on.png";
    playBackgroundSong();
  } else {
    document.getElementById("song").src = "./img/button-images/song-off.png";
    backgroundSong.pause();
  }
  resetActiveElement();
}

function playBackgroundSong() {
  backgroundSong.volume = 0.15;
  backgroundSong.loop = true;
  backgroundSong.play();
}

function changeSoundSettings() {
  if (isSoundOn) isSoundOn = false;
  else isSoundOn = true;
  music();
}

function changeSongSettings() {
  if (isSongOn) isSongOn = false;
  else isSongOn = true;
  music();
}

function closeAllOverlayScreens() {
  let overlayScreens = document.getElementsByClassName("screen");
  for (let i = 0; i < overlayScreens.length; i++) {
    overlayScreens[i].classList.add("d-none");
  }
}

function disableAllButtons() {
  buttons = document.getElementsByClassName("btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

function enableAllButtons() {
  buttons = document.getElementsByClassName("btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}

async function closeDisplays() {
  disableAllButtons();
  setTimeout(() => {
    closeAllOverlayScreens();
    enableAllButtons();
  }, 2000);
}

async function startGame() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  isGameRunning = true;
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  idsOfIntervals.push(id);
}

function stopGame() {
  idsOfIntervals.forEach(clearInterval);
}

function lostGame() {
  removeClassDNone("lost-screen");
}

function wonGame() {
  removeClassDNone("win-screen");
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

function resetActiveElement() {
  document.activeElement.blur();
}

async function addClassDNone(id) {
  document.getElementById(id).classList.add("d-none");
}

async function removeClassDNone(id) {
  document.getElementById(id).classList.remove("d-none");
}
