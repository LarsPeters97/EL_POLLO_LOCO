class SmallChicken extends MoveableObject {
  y = 360;
  width = 55;
  height = 55;
  damageValue = 1;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 500 + Math.random() * 2750;
    this.speed = 0.25 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.energy != 0) this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
      if (this.energy != 0) this.playAnimation(this.IMAGES_WALKING);
      else this.playAnimation(this.IMAGES_DEAD);
    }, 200);
  }
}
