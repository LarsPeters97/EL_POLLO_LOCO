let level1;

async function initSetLevel() {
  level1 = new Level(
    [new SmallChicken(), new SmallChicken(), new SmallChicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken()],
    new Endboss(),
    [new Cloud()],
    [
      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 0),

      new BackgroundObject("img/5_background/layers/air.png", 1419),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 1419),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 1419),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 1419),

      new BackgroundObject("img/5_background/layers/air.png", 1419 * 2),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 1419 * 2),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 1419 * 2),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 1419 * 2),
    ],
    [
      new collectableObjects("coin"),
      new collectableObjects("coin"),
      new collectableObjects("coin"),
      new collectableObjects("coin"),
      new collectableObjects("coin"),
      new collectableObjects("coin"),
      new collectableObjects("coin"),
      new collectableObjects("coin"),
      new collectableObjects("coin"),
      new collectableObjects("coin"),
    ],
    [
      new collectableObjects("bottle"),
      new collectableObjects("bottle"),
      new collectableObjects("bottle"),
      new collectableObjects("bottle"),
      new collectableObjects("bottle"),
      new collectableObjects("bottle"),
      new collectableObjects("bottle"),
      new collectableObjects("bottle"),
      new collectableObjects("bottle"),
    ]
  );
}
