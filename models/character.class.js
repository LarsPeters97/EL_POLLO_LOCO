class Character extends MoveableObject {
  y = 150;
  x = 300;
  height = 280;
  width = 125;
  speed = 7.5;
  offsetY = 110;
  offsetX = 40;
  cutOffGroundClearance = 25;
  cutOffXClearance = 35;
  world;
  energy = 100;
  lastHit = 0;
  animationCounter = 0;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
  ];

  IMAGES_STANDSTILL = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_HURT = ["img/2_character_pepe/4_hurt/H-41.png", "img/2_character_pepe/4_hurt/H-42.png", "img/2_character_pepe/4_hurt/H-43.png"];

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_STANDSTILL);
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts the interval functions for the character moves and animations.
   */

  animate() {
    setStoppableInterval(() => this.characterMoves(), 30);
    setStoppableInterval(() => this.playCharacterAnimations(), 70);
  }

  /**
   * If an if query is true, the character is moved.
   */

  characterMoves() {
    this.world.audio.walking_sound.pause();
    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();
    if (this.canJump()) {
      this.jump();
      this.world.checkSoundAndPlay(this.world.audio.jumping_sound, 1, false);
    }
    this.world.camera_x = -this.x + 140;
  }

  /**
   * @returns the boolean value, whether the character is moved right when the game is running.
   */

  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && isGameRunning;
  }

  /**
   * The character moves right and the and the walking sound is played.
   */

  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    this.world.checkSoundAndPlay(this.world.audio.walking_sound, 1, true);
  }

  /**
   * @returns the boolean value, whether the character is moved left when the game is running.
   */

  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 300 && isGameRunning;
  }

  /**
   * The character moves left and the and the walking sound is played.
   */

  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
    this.world.checkSoundAndPlay(this.world.audio.walking_sound, 1, true);
  }

  /**
   * @returns the boolean value, whether the character can jump.
   */

  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
   * The image sequence of the true If statement is played.
   */

  playCharacterAnimations() {
    if (this.isDead()) this.playAnimation(this.IMAGES_DEAD);
    else if (this.isHurt(0.5)) this.characterHurt();
    else {
      if (this.isAboveGround()) this.playSlowerAnimation(this.IMAGES_JUMPING, 2);
      else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) this.playAnimation(this.IMAGES_WALKING);
      else this.playSlowerAnimation(this.IMAGES_STANDSTILL, 2);
    }
  }

  /**
   * The injured character animation with the corresponding sound is played.
   */

  characterHurt() {
    this.playAnimation(this.IMAGES_HURT);
    this.world.checkSoundAndPlay(this.world.audio.hurtCharacter_sound, 1, false);
  }
}
