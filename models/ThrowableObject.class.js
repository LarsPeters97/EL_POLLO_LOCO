class ThrowableObject extends MoveableObject {
  height = 100;
  width = 100;
  collectedBottles = [];
  damageValue = 20;
  hasTheBottleAlreadyHit = false;
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
    this.throw();
  }

  throw() {
    world.checkSoundAndPlay(world.audio.bottleThrow_sound, 1, false);
    this.speedY = 25;
    this.speedX = 9;
    this.applyGravity();
    this.playAnimation(this.BOTTLE_ROTATION);
    setStoppableInterval(() => {
      if (this.y > 350) {
        this.hasTheBottleAlreadyHit = true;
        this.speedY = -12;
      }
      if (this.hasTheBottleAlreadyHit) {
        this.playAnimation(this.BOTTLE_SPLASH);
      } else {
        this.playAnimation(this.BOTTLE_ROTATION);
        this.x += 10;
      }
    }, 50);
  }
}
