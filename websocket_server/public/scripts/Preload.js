function preload() {
  game.load.image('tiles', 'assets/images/snowOGA.png');
  game.load.tilemap('snowymap', 'assets/tilemap/snowMap.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.spritesheet('warrior', 'assets/images/Isaac.png', 55, 56, 209);
  game.load.spritesheet('explosion', 'assets/images/megumin.png', 25, 25, 209);
  game.load.spritesheet('projectiles', 'assets/images/Bullets.png', 20, 20, 299);
}
