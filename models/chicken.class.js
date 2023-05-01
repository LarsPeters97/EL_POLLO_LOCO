class Chicken extends MoveableObject {
  y = 350;
  height = 70;
  width = 85;
  damageValue = 4;
  energy = 100;
  speed = 1;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 600 + Math.random() * 3200;
    this.speed = 0.15 + Math.random() * 1;
    this.animate();
  }

  /**
   * The chickens move to the left if their variable energy is not 0 and the walking animation is played. When the energy is 0, the death animation is played.
   */

  animate() {
    setStoppableInterval(() => {
      if (this.energy != 0) this.moveLeft();
    }, 1000 / 60);
    setStoppableInterval(() => {
      if (this.energy != 0) this.playAnimation(this.IMAGES_WALKING);
      else this.playAnimation(this.IMAGES_DEAD);
    }, 125);
  }
}
