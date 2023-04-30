class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 180;
  height = 200;
  width = 200;

  /**
   * A new image object is created and this gets as source path the path passed into the function.
   * @param {string} path is the string of the image path.
   */

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * A new image object is created for each element of the array and each of them gets as source path the suitable element of the array.
   * @param {Array} arr consists of paths to images.
   */

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * An image is drawn using the drawImage method.
   * @param {Object} ctx is the CanvasRenderingContext2D.
   */

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
