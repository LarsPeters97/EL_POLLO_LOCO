class World {
  character = new Character();
  level = level1;
  ctx;
  keyboard;
  camera_x = 0;
  statusBars = [new statusBar(-5, "health"), new statusBar(40, "coins"), new statusBar(85, "bottles")];
  throwableObjects = [];

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
    this.statusBars[1].dd(level1.coins.length, this.statusBars[1].IMAGES_COINS);
  }

  run() {
    setInterval(() => {
      this.checkThrowObjects();
      this.checkCollisions();
    }, 100);
  }

  checkCollisions() {
    this.checkCollisionsWithEnemies();
    this.checkCollisionsWithCoins();
    this.checkCollisionsWithBottles();
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 100);
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisionsWithEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy, 0, 0, 0, 0)) {
        this.character.hit(enemy.damageValue);
        this.statusBars[0].setPercentage(this.character.energy, this.statusBars[0].IMAGES_HEALTH);
      }
    });
  }

  checkCollisionsWithCoins() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin, 52, 52, 52, 52)) {
        this.statusBars[1].collectedCoins.push(coin);
        this.level.coins.splice(index, 1);
        this.statusBars[1].dd(level1.coins.length, this.statusBars[1].IMAGES_COINS);
      }
    });
  }

  checkCollisionsWithBottles() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle, 38, 38, 10, 10)) {
        this.statusBars[2].collectedBottles.push(bottle);
        this.level.bottles.splice(index, 1);
        this.statusBars[2].dd(level1.bottles.length, this.statusBars[2].IMAGES_BOTTLES);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // canvas wird gecleart und neu gezeichnet.

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMapBottles(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.statusBars);
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
