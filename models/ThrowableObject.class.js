class ThrowableObject extends MoveableObject {
  height = 100;
  width = 100;
  collectedBottles = [];
  damageValue = 20;
  hasTheBottleAlreadyHit = false;

  constructor(x, y) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.throw();
  }

  throw() {
    this.speedY = 25;
    this.speedX = 9;
    this.applyGravity();
    setInterval(() => {
      this.x += 7;
    }, 25);
  }
}
