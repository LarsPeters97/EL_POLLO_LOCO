class Coin extends MoveableObject {
  width = 150;
  height = 150;

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.x = 350 + Math.random() * 2850;
    this.y = this.yCoordinate();
  }

  yCoordinate() {
    let minYCoordinate = 40;
    let maxYCoordinate = 140;
    let yCoordinate = Math.floor(Math.random() * (maxYCoordinate - minYCoordinate + 1)) + minYCoordinate;
    return yCoordinate;
  }
}
