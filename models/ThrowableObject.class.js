class ThrowableObject extends MoveableObject {
  height = 100;
  width = 100;
  collectedBottles = [];
  damageValue = 20;
  hasTheBottleAlreadyHit = false;
  speedY = 27;
  speedX = 10;
  BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super();
    this.loadImages(this.BOTTLE_ROTATION);
    this.loadImages(this.BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.checkThrowingDirection(x, y);
    this.throw();
  }

  checkThrowingDirection(x, y) {
    if (!world.character.otherDirection) {
      this.speedX = 10;
    } else {
      this.speedX = -10;
      this.x = x - 80;
    }
  }

  /**
   * A bottle is thrown and explodes when it hits the end boss or the ground. Otherwise, the rotational animation will be executed.
   */

  throw() {
    world.checkSoundAndPlay(world.audio.bottleThrow_sound, 1, false);
    this.applyGravity();
    this.playAnimation(this.BOTTLE_ROTATION);
    setStoppableInterval(() => {
      if (this.y > 350) this.bottleHitTheGround();
      if (this.hasTheBottleAlreadyHit) this.playAnimation(this.BOTTLE_SPLASH);
      else if (this.speedX === -10) this.bottleFliesToTheLeft();
      else this.bottleFliesToTheRight();
    }, 50);
  }

  /**
   * When the bottle hits the ground, the speed of the bottle is reduced.
   */

  bottleHitTheGround() {
    this.hasTheBottleAlreadyHit = true;
    this.speedY = -12;
  }

  /**
   * The bottle rotation animation is played and the x-coordinate is increased by 10px.
   */

  bottleFliesToTheRight() {
    this.playAnimation(this.BOTTLE_ROTATION);
    this.x += 11;
  }

  /**
   * The bottle rotation animation is played and the x-coordinate is decreased by 10px.
   */

  bottleFliesToTheLeft() {
    this.playAnimation(this.BOTTLE_ROTATION);
    this.x -= 14;
  }
}
