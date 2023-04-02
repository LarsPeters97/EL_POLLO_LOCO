class Level {
  enemies;
  clouds;
  backgroundObjects;
  numberOfCoins = 0;
  numberOfBottles = 0;
  level_end_x = 3600;

  constructor(enemies, clouds, backgroundObjects, numberOfCoins, numberOfBottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.numberOfCoins = numberOfCoins;
    this.numberOfBottles = numberOfBottles;
  }
}
