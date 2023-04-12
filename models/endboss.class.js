class Endboss extends MoveableObject {
  height = 400;
  width = 250;
  y = 60;
  offsetY = 80;
  offsetX = 0;
  cutOffGroundClearance = 30;
  cutOffXClearance = 12;
  firstViewOfEndboss = false;
  energy = 100;
  lastHit = 0;
  speed = 1;
  fasterAfterHit = 1.5;

  IMAGES_STAND = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALK = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
    "img/4_enemie_boss_chicken/3_attack/G13.png",
  ];

  IMAGES_HURT = ["img/4_enemie_boss_chicken/4_hurt/G21.png", "img/4_enemie_boss_chicken/4_hurt/G22.png", "img/4_enemie_boss_chicken/4_hurt/G23.png"];

  IMAGES_DEAD = ["img/4_enemie_boss_chicken/5_dead/G24.png", "img/4_enemie_boss_chicken/5_dead/G25.png", "img/4_enemie_boss_chicken/5_dead/G26.png"];

  constructor(world) {
    super().loadImage(this.IMAGES_STAND[0]);
    this.loadImages(this.IMAGES_STAND);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3500;
    this.animate();
    this.world = world;
  }

  animate() {
    let i = 0;
    setInterval(() => {
      if (world) {
        world.throwableObjects.forEach((bottle) => {
          if (this.isColliding(bottle, 38, 38, 10, 10) && !bottle.hasTheBottleAlreadyHit) {
            this.hit(bottle.damageValue);
            bottle.hasTheBottleAlreadyHit = true;
            world.statusBars[3].setPercentage(this.energy, world.statusBars[3].IMAGES_HEALTH);
            this.speed = this.speed + this.fasterAfterHit;
          }
        });
      }
    }, 25);
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      }
      if (this.isHurt(1)) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.firstViewOfEndboss && i >= this.IMAGES_STAND.length * 2 && this.isDead()) {
        this.moveLeft();
      }
    }, 40);

    setInterval(() => {
      if (world) {
        if (i < this.IMAGES_STAND.length * 2) this.playAnimation(this.IMAGES_STAND);
        else if (i >= this.IMAGES_STAND.length * 2) this.playAnimation(this.IMAGES_WALK);
        i++;
        if (world.character.x > this.x - 475 && !this.firstViewOfEndboss) {
          i = 0;
          this.firstViewOfEndboss = true;
          world.statusBars.push(new StatusBar(550, 25, 140, "endboss"));
          world.endbossIcon = new EndbossIcon();
        }
      }
    }, 90);
  }
}
