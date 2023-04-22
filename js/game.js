let canvas;
let world;
let keyboard = new Keyboard();
let idsOfIntervals = [];
let backgroundSong = new Audio("audio/backgroundSong.mp3");
let isSoundOn = true;
let isSongOn = true;
let isGameRunning = false;
let isFullScreenShown = false;
let isGamePaused = false;

async function init() {
  await initSetLevel();
  await startGame();
  await closeDisplays();
  await music();
  await checkIfButtonsShouldBeDisplayed();
  await checkIfMobileButtonsShouldBeDispayed();
  checkTouchStart();
  checkTouchEnd();
}

function fullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  enterFullscreen(fullscreen);
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

function changeScreenView() {
  let canvas = document.getElementById("canvas");
  if (isFullScreenShown) normalScreenSettings(canvas), exitFullScreen();
  else fullScreenSettings(canvas);
  resetActiveElement();
}

function normalScreenSettings(canvas) {
  isFullScreenShown = false;
  canvas.style.width = "720px";
  canvas.style.height = "480px";
  let overlayScreens = document.getElementsByClassName("screen");
  document.getElementById("full-screen").src = "./img/button-images/full-screen.png";
  for (let i = 0; i < overlayScreens.length; i++) {
    overlayScreens[i].style.width = "720px";
    overlayScreens[i].style.height = "480px";
  }
}

function fullScreenSettings(canvas) {
  fullscreen();
  isFullScreenShown = true;
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  document.getElementById("full-screen").src = "./img/button-images/small-screen.png";
  let overlayScreens = document.getElementsByClassName("screen");
  for (let i = 0; i < overlayScreens.length; i++) {
    overlayScreens[i].style.width = "100vw";
    overlayScreens[i].style.height = "100vh";
  }
}

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

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

function makeRestartButtonsInvisible() {
  let restartButtons = document.getElementsByName("restart-type");
  for (let i = 0; i < restartButtons.length; i++) {
    restartButtons[i].classList.add("d-none");
  }
}

async function closeDisplays() {
  disableAllButtons();
  setTimeout(() => {
    closeAllOverlayScreens();
    enableAllButtons();
    makeRestartButtonsInvisible();
  }, 1500);
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

function pauseAndPlay() {
  if (isGamePaused) {
    document.getElementById("play-pause").src = "./img/button-images/pause-button.png";
    world.run();
    reStartAnimations();
    resetActiveElement();
    isGamePaused = false;
  } else {
    document.getElementById("play-pause").src = "./img/button-images/play-button.png";
    stopGame();
    resetActiveElement();
    isGamePaused = true;
  }
}

function reStartAnimations() {
  world.character.animate();
  world.level.endboss.animate();
  world.level.clouds.forEach((cloud) => {
    cloud.animate();
  });
  world.level.enemies.forEach((enemy) => {
    enemy.animate();
  });
  world.character.applyGravity();
}

function stopGame() {
  idsOfIntervals.forEach(clearInterval);
}

function showInfo() {
  if (isGameRunning) {
    pauseAndPlay();
    removeClassDNone("info-container");
    addBackgroundToGlassEffect();
  } else removeClassDNone("info-container"), removeBackgroundToGlassEffect();
}

function closeInfo() {
  if (isGameRunning) {
    pauseAndPlay();
    addClassDNone("info-container");
  } else addClassDNone("info-container");
}

function lostGame(id) {
  removeClassDNone("lost-screen");
  makeRestartButtonVisible(id);
}

function wonGame(id) {
  removeClassDNone("win-screen");
  makeRestartButtonVisible(id);
}

function makeRestartButtonVisible(id) {
  setTimeout(() => {
    document.getElementById(id).classList.remove("d-none");
  }, 2000);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

let fullscreenChange = document.getElementById("fullscreen");

fullscreenChange.addEventListener("fullscreenchange", function (event) {
  if (!document.fullscreenElement) {
    let canvas = document.getElementById("canvas");
    normalScreenSettings(canvas);
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

function checkTouchStart() {
  document.getElementById("left-btn").addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById("right-btn").addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById("jump").addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById("throw").addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.D = true;
  });
}

function checkTouchEnd() {
  document.getElementById("left-btn").addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.LEFT = false;
  });
  document.getElementById("right-btn").addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.RIGHT = false;
  });
  document.getElementById("jump").addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.SPACE = false;
  });
  document.getElementById("throw").addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.D = false;
  });
}

function resetActiveElement() {
  document.activeElement.blur();
}

async function addClassDNone(id) {
  document.getElementById(id).classList.add("d-none");
}

async function removeClassDNone(id) {
  document.getElementById(id).classList.remove("d-none");
}

async function checkIfButtonsShouldBeDisplayed() {
  if (isGameRunning) {
    let gameSettingsButtons = document.getElementsByClassName("setting-btn");
    for (let i = 0; i < gameSettingsButtons.length; i++) {
      setTimeout(() => {
        gameSettingsButtons[i].classList.remove("d-none");
      }, 1500);
    }
  } else {
    addClassDNone("play-btn");
    addClassDNone("play-soung");
    addClassDNone("play-soud");
  }
}

window.addEventListener("resize", function () {
  if (window.innerHeight <= 720) {
    changeScreenView();
  }
});

// function checkFullscreenForMobileDevices() {
//   setInterval(() => {
//     if (window.innerHeight <= 720) {
//       changeScreenView();
//     }
//   });
// }

async function checkIfMobileButtonsShouldBeDispayed() {
  if (isGameRunning && window.innerHeight <= 720) {
    setTimeout(() => {
      document.getElementById("mobile-game-control").style.display = "flex";
    }, 1000);
  } else {
    document.getElementById("mobile-game-control").style.display = "none";
  }
}

function addBackgroundToGlassEffect() {
  document.getElementById("info-container").classList.add("info-background-in-game");
}

function removeBackgroundToGlassEffect() {
  document.getElementById("info-container").classList.remove("info-background-in-game");
}
