class Keyboard {
  LEFT = false;
  RIGHT = false;
  SPACE = false;
  D = false;

  constructor() {
    this.checkKeyDown();
    this.checkKeyUp();
    this.checkTouchStart();
    this.checkTouchEnd();
  }

  /**
   * Sets the eventListener for the keydown event for the game keys.
   */

  checkKeyDown() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 39) keyboard.RIGHT = true;
      if (e.keyCode == 37) keyboard.LEFT = true;
      if (e.keyCode == 32) keyboard.SPACE = true;
      if (e.keyCode == 68) keyboard.D = true;
    });
  }

  /**
   * Sets the eventListener for the keyup event for the game keys.
   */

  checkKeyUp() {
    window.addEventListener("keyup", (e) => {
      if (e.keyCode == 39) keyboard.RIGHT = false;
      if (e.keyCode == 37) keyboard.LEFT = false;
      if (e.keyCode == 32) keyboard.SPACE = false;
      if (e.keyCode == 68) keyboard.D = false;
    });
  }

  /**
   * Sets the eventListener for touchstart for the mobile game buttons.
   */

  checkTouchStart() {
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

  /**
   * Sets the eventListener for touchend for the mobile game buttons.
   */

  checkTouchEnd() {
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
}
