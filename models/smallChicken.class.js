class SmallChicken extends MoveableObject {
  y = 360;
  width = 55;
  height = 55;
  damageValue = 1;
  energy = 100;

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
    this.x = 550 + Math.random() * 3250;
    this.speed = 0.25 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * The smallChickens move to the left if their variable energy is not 0 and the walking animation is played. When the energy is 0, the death animation is played.
   */

  animate() {
    setStoppableInterval(() => {
      if (this.energy != 0) this.moveLeft();
    }, 1000 / 60);
    setStoppableInterval(() => {
      if (this.energy != 0) this.playAnimation(this.IMAGES_WALKING);
      else this.playAnimation(this.IMAGES_DEAD);
    }, 200);
  }
}
