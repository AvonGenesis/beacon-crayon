function preload() {
  game.load.image('tiles', 'assets/images/snowOGA.png');
  game.load.tilemap('snowymap', 'assets/tilemap/snowMap.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.spritesheet('warrior', 'assets/images/warrior.png', 25, 30, 209);
  game.load.spritesheet('mage', 'assets/images/mage.png', 25, 30, 209);
  game.load.spritesheet('archer', 'assets/images/archer.png', 25, 30, 209);
  game.load.spritesheet('rogue', 'assets/images/rogue.png', 25, 30, 209);
  game.load.spritesheet('explosion', 'assets/images/megumin.png', 25, 25, 209);

  game.load.spritesheet('boss', 'assets/images/boss.png', 280, 240, 1);

  game.load.spritesheet('warrior_attack', 'assets/images/warrior_attack.png', 55, 40, 299);
  game.load.spritesheet('mage_attack', 'assets/images/mage_attack.png', 50, 50, 299);
  game.load.spritesheet('rogue_attack', 'assets/images/rogue_attack.png', 32, 32, 299);
  game.load.spritesheet('archer_attack', 'assets/images/archer_attack.png', 90, 50, 299);
}
