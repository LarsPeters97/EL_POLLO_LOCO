class collectableObjects extends MoveableObject {
  bottleY = 340;
  BOTTLES_ON_GROUND = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

  constructor(collectableObjectType) {
    super().loadImages(this.BOTTLES_ON_GROUND);
    this.selectcollectableObjectType(collectableObjectType);
    this.x = 500 + Math.random() * 2600;
  }

  /**
   * Based on the type of the collectableObject the appropriate function is called.
   * @param {string} collectableObjectType is either Coin or Bottle.
   */

  selectcollectableObjectType(collectableObjectType) {
    if (collectableObjectType === "coin") this.showCoins();
    else if (collectableObjectType === "bottle") this.showBottles();
  }

  /**
   * Some variables for a coin are assigned and the coin image is loaded.
   */

  showCoins() {
    this.loadImage("img/8_coin/coin_1.png");
    this.width = 150;
    this.height = 150;
    this.y = this.yCoordinate(40, 140);
  }

  /**
   * Some variables for a bottle are assigned and the bottle image is randomly selected
   */

  showBottles() {
    let path = this.BOTTLES_ON_GROUND[this.getRandomNumberForBottleImage()];
    this.img = this.imageCache[path];
    this.height = 100;
    this.width = 100;
    this.y = this.bottleY;
  }

  /**
   * A random number is generated and we round up if greater than or equal to 0.5, otherwise we round down.
   * @returns the number 0 or the number 1.
   */

  getRandomNumberForBottleImage() {
    let randomNumber = Math.random();
    if (randomNumber >= 0.5) randomNumber = Math.ceil(randomNumber);
    else randomNumber = Math.floor(randomNumber);
    return randomNumber;
  }

  /**
   * A random number between 40 and 140 is calculated.
   * @param {number} minY is the minimum y coordinate.
   * @param {number} maxY is the maximum y coordinate.
   * @returns a number between 40 and 140.
   */

  yCoordinate(minY, maxY) {
    let minYCoordinate = minY;
    let maxYCoordinate = maxY;
    let yCoordinate = Math.floor(Math.random() * (maxYCoordinate - minYCoordinate + 1)) + minYCoordinate;
    return yCoordinate;
  }
}
