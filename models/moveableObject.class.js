class MoveableObject {
  x = 120;
  y = 180;
  img;
  height = 200;
  width = 200;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log("Moving Right");
  }
  moveLeft() {}
}
