class MoveableObject extends DrawableObject {
  speed = 0.001;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;

  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else if (this instanceof Character) {
        this.y = 150;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 140;
    }
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 28;
  }

  hit(damageValue) {
    this.energy -= damageValue;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt(hurtTime) {
    let timePassed = new Date().getTime() - this.lastHit; // Differnce in ms
    timePassed = timePassed / 1000; // DIfference in  seconds
    return timePassed < hurtTime;
  }

  isColliding(obj, reduceLeftDistance, reduceRightDistance, reduceUpperDistance, reduceLowerDistance) {
    return (
      this.x + this.width - this.offsetX >= obj.x + reduceLeftDistance &&
      this.x + this.cutOffXClearance <= obj.x + obj.width - reduceRightDistance &&
      this.y + this.height - this.cutOffGroundClearance >= obj.y + reduceUpperDistance &&
      this.y + this.offsetY <= obj.y + obj.height - reduceLowerDistance
    );
  }
}
