class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 180;
  height = 200;
  width = 200;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch {
      console.log("Bild kontte nicht geladen werden:", this.img.src, this.x, this.y, this.width, this.height);
    }
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof collectableObjects || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  drawSecondFrame(ctx) {
    if (this instanceof Character) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(this.x + 28, this.y + this.offsetY, this.width - this.offsetX - 30, this.height - this.offsetY - this.cutOffGroundClearance);
      ctx.stroke();
    }
    if (this instanceof collectableObjects) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(this.x + 52, this.y + 52, this.width - 104, this.height - 104);
      ctx.stroke();
    }
    if (this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(this.x + 12, this.y + 80, this.width - 12, this.height - 110);
      ctx.stroke();
    }
    if (this instanceof ThrowableObject) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(this.x + 38, this.y + 10, this.width - 76, this.height - 20);
      ctx.stroke();
    }
  }

  thirdSecondFrame(ctx) {
    if (this instanceof Character) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(this.x + 28, this.y + this.offsetY, this.width - this.offsetX - 30, this.height - this.offsetY - this.cutOffGroundClearance);
      ctx.stroke();
    }
    if (this instanceof collectableObjects) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
    if (this instanceof collectableObjects) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(this.x + 38, this.y + 10, this.width - 76, this.height - 20);
      ctx.stroke();
    }
  }
}
