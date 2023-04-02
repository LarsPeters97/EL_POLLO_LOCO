class ThrowableObject extends MoveableObject {
  height = 100;
  width = 100;

  constructor(x, y) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.speedX = 20;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}
