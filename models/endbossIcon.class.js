class EndbossIcon extends DrawableObject {
  y = 50;
  width = 65;
  height = 65;
  IMAGE_ENDBOSS = ["img/7_statusbars/3_icons/icon_health_endboss.png"];

  constructor() {
    super().loadImages(this.IMAGE_ENDBOSS);
    let path = this.IMAGE_ENDBOSS[0];
    this.img = this.imageCache[path];
    this.x = 535;
  }
}
