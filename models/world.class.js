class World {
  audio = {
    walking_sound: new Audio("audio/walking.mp3"),
    deadChicken_sound: new Audio("audio/deadChicken.mp3"),
    collectedCoin_sound: new Audio("audio/collectedCoin.mp3"),
    bottlePop_sound: new Audio("audio/bottlePop.mp3"),
    bottleThrow_sound: new Audio("audio/bottleThrow.mp3"),
    hurtCharacter_sound: new Audio("audio/hurtCharacter.mp3"),
    lostGame_sound: new Audio("audio/lostGame.mp3"),
    winnerApplause_sound: new Audio("audio/winnerApplause.mp3"),
    jumping_sound: new Audio("audio/jumping.mp3"),
  };

  character = new Character();
  level = level1;
  ctx;
  keyboard;
  camera_x = 0;
  statusBars = [new StatusBar(10, -5, 130, "health"), new StatusBar(10, 40, 130, "coins"), new StatusBar(10, 85, 130, "bottles")];
  throwableObjects = [];
  deadChickens = [];
  endbossIcon;
  lastThrowTime = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.drawWorldObjects();
    this.setWorld();
    this.run();
  }

  /**
   * Sets the world variable of the character to the current World instance.
   */

  setWorld() {
    this.character.world = this;
  }

  /**
   * Checks game-related conditions every 25ms.
   */

  run() {
    setStoppableInterval(() => {
      this.checkGameOver();
      this.checkThrowObjects();
      this.checkCollisions();
    }, 25);
  }

  /**
   * Checks if the character collided with the enemies, coins or the bottles.
   */

  checkCollisions() {
    this.checkCollisionsWithEnemies();
    this.checkCollisionsWithCoins();
    this.checkCollisionsWithBottles();
  }

  /**
   * Checks if the game is over and if so, it is checked if the game was won or lost and execute the appropriate function.
   */

  checkGameOver() {
    if (this.isGameOver()) {
      isGameRunning = false;
      setTimeout(() => {
        stopGame();
        if (this.character.energy === 0) this.lost();
        else if (this.level.endboss.energy === 0) this.won();
        this.checkMusicAndButtons();
      }, 1250);
    }
  }

  /**
   * When the character or the endboss have no energ left, true is returned and the game is over.
   * @returns a boolean value.
   */

  isGameOver() {
    return this.character.energy === 0 || (this.level.endboss.energy === 0 && isGameRunning);
  }

  /**
   * Checks the music and the mobile and the normal buttons after the game is over.
   */

  checkMusicAndButtons() {
    music();
    checkIfButtonsShouldBeDisplayed();
    checkIfMobileButtonsShouldBeDispayed();
  }

  /**
   * The lost screen is displayed and the lost sound is played.
   */

  lost() {
    lostGame("lost");
    this.checkSoundAndPlay(this.audio.lostGame_sound, 1, true);
  }

  /**
   * The winner screen is displayed and the winner sound is played.
   */

  won() {
    wonGame("win");
    this.checkSoundAndPlay(this.audio.winnerApplause_sound, 1, false);
  }

  /**
   * If no bottle has been thrown in the last 400ms, the character still has collected bottles and
   * is looking on the ground in the right direction, a throwable object is created and the bottle is subtracted from the bottle status bar.
   */

  checkThrowObjects() {
    const currentTime = Date.now();
    if (this.keyboard.D && currentTime - this.lastThrowTime > 400) {
      if (this.statusBars[2].collectedBottles.length > 0 && !this.character.isAboveGround() && !this.character.otherDirection) {
        let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.statusBars[2].collectedBottles.splice(0, 1);
        this.statusBars[2].percentageCalculation(level1.bottles.length + this.throwableObjects.length, this.statusBars[2].collectedBottles, this.statusBars[2].IMAGES_BOTTLES);
        this.lastThrowTime = currentTime;
      }
    }
  }

  /**
   * If the character collides with an enemy in the air and comes back to the ground (negative speedY variable), then the enemy is killed. Otherwise, the character is injured.
   */

  checkCollisionsWithEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy, 0, 0, 0, 0) && this.character.isAboveGround() && this.character.speedY < 0 && enemy.width != 250) this.deadEnemy(enemy);
      else if (this.character.isColliding(enemy, 0, 0, 0, 0)) {
        if (enemy.energy > 0) {
          this.character.hit(enemy.damageValue);
          this.statusBars[0].setPercentage(this.character.energy, this.statusBars[0].IMAGES_HEALTH);
        }
      }
    });
  }

  /**
   * If the enemy exists in the enemies array and its energy is greater than 0, the enemy is killed and the death animation is played.
   * After 750ms the dead enemy is removed from the array enemies.
   * @param {object} enemy is an enemy object, e.g. smallChicken.
   */

  deadEnemy(enemy) {
    let index = this.level.enemies.indexOf(enemy);
    if (index > -1 && this.level.enemies[index].energy > 0) {
      this.checkSoundAndPlay(this.audio.deadChicken_sound, 1, false);
      this.level.enemies[index].energy = 0;
      setTimeout(() => {
        let deadIndex = this.level.enemies.indexOf(enemy);
        if (deadIndex > -1 && this.level.enemies[deadIndex].energy === 0) this.level.enemies.splice(deadIndex, 1);
      }, 750);
    }
  }

  /**
   * When the character collides with a coin, it is pushed into the collectCoins array and removed from the coins array, causing it to no longer appear in the world.
   * In addition, the coinbar is updated.
   */

  checkCollisionsWithCoins() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin, 52, 52, 52, 52)) {
        this.statusBars[1].collectedCoins.push(coin);
        this.checkSoundAndPlay(this.audio.collectedCoin_sound, 1, false);
        this.level.coins.splice(index, 1);
        this.statusBars[1].percentageCalculation(level1.coins.length, this.statusBars[1].collectedCoins, this.statusBars[1].IMAGES_COINS);
      }
    });
  }

  /**
   * When the CHaracter collides with a bottle, it is added to the collectedBottles array and the corresponding sound is played.
   * The bottle is removed from the bottles array, so it is no longer displayed in the world. Also, the bottle bar is increased.
   */

  checkCollisionsWithBottles() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle, 40, 30, 15, 10)) {
        this.statusBars[2].collectedBottles.push(bottle);
        this.checkSoundAndPlay(this.audio.bottlePop_sound, 1, false);
        this.level.bottles.splice(index, 1);
        this.statusBars[2].percentageCalculation(level1.bottles.length + this.throwableObjects.length, this.statusBars[2].collectedBottles, this.statusBars[2].IMAGES_BOTTLES);
      }
    });
  }

  /**
   * When the sound is turned on, an audio is played with the volume specified in the function and whether the sound should be repeated.
   * @param {audio} sound is the audio element.
   * @param {number} volume is a number between 0 and 1 that determines the volume.
   * @param {boolean} looping is whether the Audi should be repeated.
   */

  checkSoundAndPlay(sound, volume, looping) {
    if (isSoundOn && sound.readyState > 3) {
      sound.volume = volume;
      sound.looping = looping;
      sound.play();
    }
  }

  /**
   * Draws all the elements that are in the script level1.js.
   */

  drawWorldObjects() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.deadChickens);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.level.endboss);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.statusBars);
    if (this.endbossIcon) this.addToMap(this.endbossIcon);
    let self = this;
    requestAnimationFrame(function () {
      self.drawWorldObjects();
    });
  }

  /**
   * Every single object of the array is traversed and added to the map.
   * @param {Array} objects are the objects of the individual components of the world, e.g. the opponents.
   */

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * If the otherDirection variable is true, the object is flipped horizontally. And then drawn. Roof is mirrored back if otherDirection is true.
   * @param {Object} mo is a object.
   */

  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * First, the current context is saved. The image of the object is mirrored horzitontally with the scale method.
   * The x position of the object is multiplied by -1 to display and run it on the map in the opposite direction.
   * @param {Object} mo is a object.
   */

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * The x-position of the object is multiplied by -1 again to rotate it back to the original direction.
   * Then the method restore is called to restore the saved state of the context.
   * @param {Object} mo is a object.
   */

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
