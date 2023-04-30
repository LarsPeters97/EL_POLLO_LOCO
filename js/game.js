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

/**
 * Starts the game.
 */

async function init() {
  await initSetLevel();
  await startGame();
  await closeDisplays();
  await music();
  await checkIfButtonsShouldBeDisplayed();
  await checkIfMobileButtonsShouldBeDispayed();
}

/**
 * If the full screen mode is already activated, the normal screen is shown. Otherwise it will be done the other way around.
 */

function changeScreenView() {
  let canvas = document.getElementById("canvas");
  let overlayScreens = document.getElementsByClassName("screen");
  if (isFullScreenShown) normalScreenSettings(canvas, overlayScreens), exitFullScreen();
  else fullScreenSettings(canvas, overlayScreens);
  resetActiveElement();
}

/**
 * If the screen height is below 480 the full image is used and if not the default dimensions are used.
 * @param {string} canvas ist the dom element canvas.
 * @param {HTMLCollection} overlayScreens are the elements which appear above the canvas.
 */

function normalScreenSettings(canvas, overlayScreens) {
  isFullScreenShown = false;
  if (window.innerHeight <= 480) fullScreenSettingsForCanvasAndOverlayScreens(canvas, overlayScreens);
  else normalScreenSettingsForCanvasAndOverlayScreens(canvas, overlayScreens);
}

/**
 * The canvas and the overlay screens gets the full width and height.
 * @param {string} canvas ist the dom element canvas.
 * @param {HTMLCollection} overlayScreens are the elements which appear above the canvas.
 */

function fullScreenSettingsForCanvasAndOverlayScreens(canvas, overlayScreens) {
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  document.getElementById("full-screen").src = "./img/button-images/full-screen.png";
  for (let i = 0; i < overlayScreens.length; i++) {
    overlayScreens[i].style.width = "100%";
    overlayScreens[i].style.height = "100%";
  }
}

/**
 * The canvas and the overlay screens get the normal width and height
 * @param {string} canvas ist the dom element canvas.
 * @param {HTMLCollection} overlayScreens are the elements which appear above the canvas.
 */

function normalScreenSettingsForCanvasAndOverlayScreens(canvas, overlayScreens) {
  canvas.style.width = "720px";
  canvas.style.height = "480px";
  canvas.style.borderRadius = "16px";
  document.getElementById("full-screen").src = "./img/button-images/full-screen.png";
  for (let i = 0; i < overlayScreens.length; i++) {
    overlayScreens[i].style.width = "720px";
    overlayScreens[i].style.height = "480px";
    overlayScreens[i].style.borderRadius = "16px";
  }
}

/**
 * The settings for the full screen mode are made.
 * @param {string} canvas ist the dom element canvas.
 * @param {HTMLCollection} overlayScreens are the elements which appear above the canvas.
 */

function fullScreenSettings(canvas, overlayScreens) {
  fullscreen();
  isFullScreenShown = true;
  fullScreenSettingsForCanvasAndOverlayScreens(canvas, overlayScreens);
  let screenImages = document.querySelector(".screen-images");
  screenImages.style.borderRadius = "0";
}

/**
 * Assigns the id of the div fullscreen to the variable fullscreen.
 */

function fullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  enterFullscreen(fullscreen);
}

/**
 * The full screen mode is activated.
 * @param {string} element ist the dom element from the fullscreen div.
 */

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

/**
 * The full screen mode is deactivated.
 */

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * Checks if the sound is on and changes the sound image.
 * Also checks if the song is on and the game is running and if so, plays the song and adjusts the image as well.
 */

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

/**
 * Settings for the background song.
 */

function playBackgroundSong() {
  backgroundSong.volume = 0.15;
  backgroundSong.loop = true;
  backgroundSong.play();
}

/**
 * Changes the sound settings and the boolean variable is changed.
 */

function changeSoundSettings() {
  if (isSoundOn) isSoundOn = false;
  else isSoundOn = true;
  music();
}

/**
 * Changes the song settings and the boolean variable is changed.
 */

function changeSongSettings() {
  if (isSongOn) isSongOn = false;
  else isSongOn = true;
  music();
}

/**
 * All overlayscreens are closed by adding the class d-none to them.
 */

function closeAllOverlayScreens() {
  let overlayScreens = document.getElementsByClassName("screen");
  for (let i = 0; i < overlayScreens.length; i++) {
    overlayScreens[i].classList.add("d-none");
  }
}

/**
 * All buttons are disabled by setting the disabled property to true.
 */

function disableAllButtons() {
  buttons = document.getElementsByClassName("btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

/**
 * All buttons are enabled by setting the disabled property to false.
 */

function enableAllButtons() {
  buttons = document.getElementsByClassName("btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}

/**
 * All restart buttons are made invisible by adding the class d-none.
 */

function makeRestartButtonsInvisible() {
  let restartButtons = document.getElementsByName("restart-type");
  for (let i = 0; i < restartButtons.length; i++) {
    restartButtons[i].classList.add("d-none");
  }
}

/**
 * All buttons and overlayscreens are hidden so that only the game canvas is displayed.
 */

async function closeDisplays() {
  disableAllButtons();
  setTimeout(() => {
    closeAllOverlayScreens();
    enableAllButtons();
    makeRestartButtonsInvisible();
  }, 1500);
}

/**
 * A new instance of the World object is created.
 */

async function startGame() {
  canvas = document.getElementById("canvas");
  world = await new World(canvas, keyboard);
  isGameRunning = true;
}

/**
 * The variable id is given the value of the interval id and the id is then added to the idsOfIntervals array.
 * @param {Function} fn is a function which gets executed in the interval.
 * @param {number} time is the interval time in milliseconds.
 */

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  idsOfIntervals.push(id);
}

/**
 * If the boolean variable isGamePaused is true, the game is paused, otherwise it continues.
 */

function pauseAndPlay() {
  if (isGamePaused) continueGame();
  else pauseGame();
}

/**
 * The game continues ad the intervals start again.
 */

function continueGame() {
  document.getElementById("play-pause").src = "./img/button-images/pause-button.png";
  world.run();
  reStartAnimations();
  resetActiveElement();
  isGamePaused = false;
}

/**
 * The game is paused and the intervals getting cleared.
 */

function pauseGame() {
  document.getElementById("play-pause").src = "./img/button-images/play-button.png";
  stopGame();
  resetActiveElement();
  isGamePaused = true;
}

/**
 * All animation functions are called again and thus started.
 */

function reStartAnimations() {
  world.character.animate();
  world.level.endboss.animate();
  world.level.clouds.forEach((cloud) => cloud.animate());
  world.level.enemies.forEach((enemy) => enemy.animate());
  world.character.applyGravity();
}

/**
 * The game is "stopped" by clearing the array idsOfIntervals which causes no more interval to be executed.
 */

function stopGame() {
  idsOfIntervals.forEach(clearInterval);
}

/**
 * The game information is called. And when the game is running, the game is paused and a glass background effect is displayed.
 */

function showInfo() {
  if (isGameRunning) {
    if (!isGamePaused) pauseAndPlay();
    removeClassDNone("info-container");
    addBackgroundToGlassEffect();
  } else removeClassDNone("info-container"), removeBackgroundToGlassEffect();
}

/**
 * The game information is closed and the game continues.
 */

function closeInfo() {
  if (isGameRunning) {
    pauseAndPlay();
    addClassDNone("info-container");
  } else addClassDNone("info-container");
}

/**
 * The loser screen is displayed and the restart button is shown after a delay.
 * @param {string} id is lost.
 */

function lostGame(id) {
  removeClassDNone("lost-screen");
  makeRestartButtonVisible(id);
}

/**
 * The winner screen will be displayed and the restart button will be displayed after a delay.
 * @param {string} id is win.
 */

function wonGame(id) {
  removeClassDNone("win-screen");
  makeRestartButtonVisible(id);
}

/**
 * The restart button is displayed after 2000 ms.
 * @param {string} id is win or lost.
 */

function makeRestartButtonVisible(id) {
  setTimeout(() => {
    document.getElementById(id).classList.remove("d-none");
  }, 2000);
}

/**
 * If the event listener for fullscreenchange occurs and the document is not in fullscreen, the elements for a normal screen are reloaded.
 */

function fullScreenChange() {
  let fullscreenChange = document.getElementById("fullscreen");
  fullscreenChange.addEventListener("fullscreenchange", function (event) {
    if (!document.fullscreenElement) {
      let overlayScreens = document.getElementsByClassName("screen");
      let canvas = document.getElementById("canvas");
      if (isFullScreenShown) normalScreenSettings(canvas, overlayScreens);
    }
  });
}

/**
 * Removes the focus from the currently focused element.
 */

function resetActiveElement() {
  document.activeElement.blur();
}

/**
 * Adds the css property display none to an html element.
 * @param {string} id of the html element that gets the class d-none.
 */

async function addClassDNone(id) {
  document.getElementById(id).classList.add("d-none");
}

/**
 * Removes the css property display none of an html element.
 * @param {string} id of the html element that gets the class d-none removed.
 */

async function removeClassDNone(id) {
  document.getElementById(id).classList.remove("d-none");
}

/**
 * When the game is running, the buttons that should only be displayed in the running game are displayed, otherwise they are not.
 */

async function checkIfButtonsShouldBeDisplayed() {
  if (isGameRunning) {
    let gameSettingsButtons = document.getElementsByClassName("setting-btn");
    for (let i = 0; i < gameSettingsButtons.length; i++) setTimeout(() => gameSettingsButtons[i].classList.remove("d-none"), 1500);
  } else {
    addClassDNone("play-btn");
    addClassDNone("play-soung");
    addClassDNone("play-soud");
  }
}

/**
 * When the game is running annd the height is below 720, the mobile buttons to play the game are displayed, otherwise they are not.
 */

async function checkIfMobileButtonsShouldBeDispayed() {
  if (isGameRunning && window.innerHeight <= 720) {
    setTimeout(() => (document.getElementById("mobile-game-control").style.display = "flex"), 1000);
  } else document.getElementById("mobile-game-control").style.display = "none";
}

/**
 * Adds the glass effect on the canvas where the game explanation is displayed on it.
 */

function addBackgroundToGlassEffect() {
  document.getElementById("info-container").classList.add("info-background-in-game");
}

/**
 * Removes the glass effect on the canvas where the game explanation is displayed on it.
 */

function removeBackgroundToGlassEffect() {
  document.getElementById("info-container").classList.remove("info-background-in-game");
}
