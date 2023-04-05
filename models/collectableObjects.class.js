offsetY = 95;
offsetX = 40;
cutOffGroundClearance = 25;
cutOffXClearance = 35;

class collectableObjects extends MoveableObject {
  constructor(collectableObjectType) {
    super().selectcollectableObjectType(collectableObjectType);
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
    this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.width = 100;
    this.height = 90;
    this.y = this.yCoordinate(70, 130);
  }

  yCoordinate(minY, maxY) {
    let minYCoordinate = minY;
    let maxYCoordinate = maxY;
    let yCoordinate = Math.floor(Math.random() * (maxYCoordinate - minYCoordinate + 1)) + minYCoordinate;
    return yCoordinate;
  }
}
