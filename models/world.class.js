class World {
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
    setInterval(() => {
      this.checkThrowObjects();
      this.checkCollisions();
    }, 30);
  }

  checkCollisions() {
    this.checkCollisionsWithEnemies();
    this.checkCollisionsWithCoins();
    this.checkCollisionsWithBottles();
  }

  checkThrowObjects() {
    const currentTime = Date.now();
    if (this.keyboard.D && currentTime - this.lastThrowTime > 225) {
      if (this.statusBars[2].collectedBottles.length > 0 && !this.character.isAboveGround() && !this.character.otherDirection) {
        let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.statusBars[2].collectedBottles.splice(0, 1);
        this.statusBars[2].percentageCalculation(level1.bottles.length + this.throwableObjects.length, this.statusBars[2].collectedBottles, this.statusBars[2].IMAGES_BOTTLES);
        this.lastThrowTime = currentTime;
      }
    }
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
      this.level.enemies[index].deadChicken_sound.play();
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
        this.level.coins.splice(index, 1);
        this.statusBars[1].percentageCalculation(level1.coins.length, this.statusBars[1].collectedCoins, this.statusBars[1].IMAGES_COINS);
      }
    });
  }

  checkCollisionsWithBottles() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle, 38, 38, 10, 10)) {
        this.statusBars[2].collectedBottles.push(bottle);
        this.level.bottles.splice(index, 1);
        this.statusBars[2].percentageCalculation(level1.bottles.length + this.throwableObjects.length, this.statusBars[2].collectedBottles, this.statusBars[2].IMAGES_BOTTLES);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // canvas wird gecleart und neu gezeichnet.
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.deadChickens);
    this.addObjectsToMap(this.level.enemies);
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
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);

    mo.drawFrame(this.ctx);
    mo.thirdSecondFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
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
