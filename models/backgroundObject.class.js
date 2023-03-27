class BackgroundObject extends MoveableObject {
  width = 480;
  height = 720;
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 0;
  }
}
