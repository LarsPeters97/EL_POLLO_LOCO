class collectableObjects extends MoveableObject {
  bottleY = 340;
  BOTTLES_ON_GROUND = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

  constructor(collectableObjectType) {
    super().loadImages(this.BOTTLES_ON_GROUND);
    this.selectcollectableObjectType(collectableObjectType);
    this.x = 500 + Math.random() * 2600;
  }

  selectcollectableObjectType(collectableObjectType) {
    if (collectableObjectType === "coin") this.showCoins();
    else if (collectableObjectType === "bottle") this.showBottles();
  }

  showCoins() {
    this.loadImage("img/8_coin/coin_1.png");
    this.width = 150;
    this.height = 150;
    this.y = this.yCoordinate(40, 140);
  }

  showBottles() {
    let path = this.BOTTLES_ON_GROUND[this.getRandomNumberForBottleImage()];
    this.img = this.imageCache[path];
    this.height = 100;
    this.width = 100;
    this.y = this.bottleY;
  }

  getRandomNumberForBottleImage() {
    let randomNumber = Math.random();
    if (randomNumber >= 0.5) randomNumber = Math.ceil(randomNumber);
    else randomNumber = Math.floor(randomNumber);
    return randomNumber;
  }

  yCoordinate(minY, maxY) {
    let minYCoordinate = minY;
    let maxYCoordinate = maxY;
    let yCoordinate = Math.floor(Math.random() * (maxYCoordinate - minYCoordinate + 1)) + minYCoordinate;
    return yCoordinate;
  }
}
