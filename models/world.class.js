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
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.statusBars[1].percentageCalculation(level1.coins.length, this.statusBars[1].collectedCoins, this.statusBars[1].IMAGES_COINS);
  }

  run() {
    setStoppableInterval(() => {
      this.checkGameOver();
      this.checkThrowObjects();
      this.checkCollisions();
    }, 25);
  }

  checkGameOver() {
    if (this.character.energy === 0 || (this.level.endboss.energy === 0 && isGameRunning)) {
      isGameRunning = false;
      setTimeout(() => {
        stopGame();
        console.log("test");
        if (this.character.energy === 0) {
          lostGame();
          this.checkSoundAndPlay(this.audio.lostGame_sound, 1, false);
        }
        if (this.level.endboss.energy === 0) {
          wonGame();
          this.checkSoundAndPlay(this.audio.winnerApplause_sound, 1, false);
        }
        music();
      }, 1500);
    }
  }

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

  checkCollisions() {
    this.checkCollisionsWithEnemies();
    this.checkCollisionsWithCoins();
    this.checkCollisionsWithBottles();
  }

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

  checkSoundAndPlay(sound, volume, looping) {
    if (isSoundOn) {
      sound.volume = volume;
      sound.looping = looping;
      sound.play();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // canvas wird gecleart und neu gezeichnet.
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.deadChickens);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.level.endboss);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMapBottles(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.statusBars);
    if (this.endbossIcon) {
      this.addToMap(this.endbossIcon);
    }

    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);

    // Draw wird immer wieder aufgerufen. This funktioniert in der Methode requestAnimationFrame nicht. Deswegen wird vorher eine Variable, z. B. self definiert, die this zugewiesen
    // bekommt.
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addObjectsToMapBottles(objects) {
    objects.forEach((o) => {
      this.addToMapBottles(o);
    });
  }

  addToMapBottles(mo) {
    mo.draw(this.ctx);

    mo.drawFrame(this.ctx);
    mo.thirdSecondFrame(this.ctx);
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);

    mo.drawFrame(this.ctx);
    mo.drawSecondFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
