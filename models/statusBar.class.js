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

  /**
   * The appropriate status bar function is selected using the functions parameter string.
   * @param {string} statusBarType is the string name of the statusbar.
   */

  selectStatusBar(statusBarType) {
    if (statusBarType === "health") this.loadBar(100, this.IMAGES_HEALTH);
    else if (statusBarType === "coins") this.loadBar(0, this.IMAGES_COINS);
    else if (statusBarType === "bottles") this.loadBar(0, this.IMAGES_BOTTLES);
    else if (statusBarType === "endboss") this.loadBar(100, this.IMAGES_HEALTH);
  }

  /**
   * The images of the bar are loaded and the matching image of the bar is displayed based on the percentage.
   * @param {number} percentage of the the specific status bar.
   * @param {Array} images of the the specific status bar.
   */

  loadBar(percentage, images) {
    this.loadImages(images);
    this.setPercentage(percentage, images);
  }

  /**
   * The global variable gets the percent value of the local variable percetage. And the image of the statusbar gets selected based on the percentage.
   * @param {number} percentage of the the specific status bar.
   * @param {Array} images of the the specific status bar.
   */

  setPercentage(percentage, images) {
    this.percentage = percentage;
    let path = images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * A number between 0 and 5 is returned based percentage value.
   * @returns a number between 0 and 5.
   */

  resolveImageIndex() {
    if (this.percentage == 100) return 5;
    else if (this.percentage >= 80) return 4;
    else if (this.percentage >= 60) return 3;
    else if (this.percentage >= 40) return 2;
    else if (this.percentage >= 20) return 1;
    else return 0;
  }

  /**
   * The percentage of collected objects is determined by dividing the objects collected so far by the total number of all objects and multiplying by 100.
   * @param {number} collectableObjectsLength is the length of the collectableObjects array.
   * @param {Array} objectsAlreadyCollected is the array of the already collected objects, e.g. from the coins.
   * @param {Array} images is an image array from a statusbar.
   */

  percentageCalculation(collectableObjectsLength, objectsAlreadyCollected, images) {
    let totalLength = collectableObjectsLength + objectsAlreadyCollected.length;
    this.percentage = (objectsAlreadyCollected.length / totalLength) * 100;
    this.setPercentage(this.percentage, images);
  }
}
