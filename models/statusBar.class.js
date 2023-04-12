class StatusBar extends DrawableObject {
  x;
  y;
  height = 45;
  percentage;
  world;
  collectedCoins = [];
  collectedBottles = [];

  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  IMAGES_COINS = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  IMAGES_BOTTLES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  constructor(x, y, width, statusBarType) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.selectStatusBar(statusBarType);
  }

  selectStatusBar(statusBarType) {
    if (statusBarType === "health") this.loadHealthBar(100);
    else if (statusBarType === "coins") this.loadCoinBar();
    else if (statusBarType === "bottles") this.loadBottleBar();
    else if (statusBarType === "endboss") this.loadEndboss(100);
  }

  loadHealthBar(percentage) {
    this.loadImages(this.IMAGES_HEALTH);
    this.setPercentage(percentage, this.IMAGES_HEALTH);
  }

  loadCoinBar() {
    this.loadImages(this.IMAGES_COINS);
    this.setPercentage(this.percentage, this.IMAGES_COINS);
  }

  loadBottleBar() {
    this.loadImages(this.IMAGES_BOTTLES);
    this.setPercentage(this.percentage, this.IMAGES_BOTTLES);
  }

  loadEndboss(percentage) {
    this.loadImages(this.IMAGES_HEALTH);
    this.setPercentage(percentage, this.IMAGES_HEALTH);
  }

  setPercentage(percentage, images) {
    this.percentage = percentage;
    let path = images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) return 5;
    else if (this.percentage >= 80) return 4;
    else if (this.percentage >= 60) return 3;
    else if (this.percentage >= 40) return 2;
    else if (this.percentage >= 20) return 1;
    else return 0;
  }

  percentageCalculation(collectableObjectsLength, dd, images) {
    let totalLength = collectableObjectsLength + dd.length;
    this.percentage = (dd.length / totalLength) * 100;
    this.setPercentage(this.percentage, images);
  }
}
