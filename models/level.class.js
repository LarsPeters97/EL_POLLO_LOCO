class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  endbossIcon;
  level_end_x = 3600;

  constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
