class MoveableObject extends DrawableObject {
  speed = 0.001;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;

  /**
   * If an object is in the air, or the variable speedY is greater than 0, the object is brought back to the ground by subtracting something from the y-coordinate.
   */

  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else if (this instanceof Character) this.y = 150;
    }, 1000 / 25);
  }

  /**
   * Checks if it is an instance of ThrowableObject and if so true is returned. If not it checks if the y coordinate is less than 140.
   * @returns a a boolean value.
   */

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else return this.y < 140;
  }

  /**
   * To move to the right, the x coordinate of the object is increased.
   */

  moveRight() {
    this.x += this.speed;
  }

  /**
   * To move to the left, the x coordinate of the object is decreased.
   */

  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * The current image is assigned to the variable img. After that the variable currentImage is increased by one, so that at the next function call the next image is shown.
   * @param {Array} images for the current object.
   */

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * The object jumps by increasing the y coordinate of the object using the speedY variable.
   */

  jump() {
    this.speedY = 28;
  }

  /**
   * The object gets the damageValue subtracted and if the energy is below 0 it is reset to 0.
   * @param {number} damageValue is the number how much damage has a specific object
   */

  hit(damageValue) {
    this.energy -= damageValue;
    if (this.energy < 0) {
      this.energy = 0;
    } else this.lastHit = new Date().getTime();
  }

  /**
   * Checks if the object has 0 energy.
   * @returns a boolen value.
   */

  isDead() {
    return this.energy == 0;
  }

  /**
   * @param {number} hurtTime is the time how long the hurt animation should be played.
   * @returns if the time that has passed since the last hit, is less than the hurtTime.
   */

  isHurt(hurtTime) {
    let timePassed = new Date().getTime() - this.lastHit; // Differnce in ms
    timePassed = timePassed / 1000; // DIfference in  seconds
    return timePassed < hurtTime;
  }

  /**
   * Checks if the "this" object is colliding with the obj, which is given as the first function parameter in the function.
   * @param {Object} obj is the object where the collision with the character is checked with, e.g. a SmallChicken.
   * @param {number} reduceLeftDistance is the number of pixels, how much the x coordinate should be increased for a more accurate collision.
   * @param {number} reduceRightDistance is the number of pixels, how much the x coordinate + the object width should be decreased for a more accurate collision.
   * @param {number} reduceUpperDistance is the number of pixels, how much the y coordinate should be decreased for a more accurate collision.
   * @param {number} reduceLowerDistance is the number of pixels, how much the y coordinate + the object height should be increased for a more accurate collision.
   * @returns a boolean value.
   */

  isColliding(obj, reduceLeftDistance, reduceRightDistance, reduceUpperDistance, reduceLowerDistance) {
    return (
      this.x + this.width - this.offsetX >= obj.x + reduceLeftDistance &&
      this.x + this.cutOffXClearance <= obj.x + obj.width - reduceRightDistance &&
      this.y + this.height - this.cutOffGroundClearance >= obj.y + reduceUpperDistance &&
      this.y + this.offsetY <= obj.y + obj.height - reduceLowerDistance
    );
  }
}
