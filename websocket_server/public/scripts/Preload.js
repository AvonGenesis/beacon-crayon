var BeaconCrayonGame = BeaconCrayonGame || {};

//loading the game assets
BeaconCrayonGame.Preload = function(){};

BeaconCrayonGame.Preload.prototype = {
  //show loading screen
  preload: function(){
  this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
  this.preloadBar.anchor.setTo(0.5);

  this.load.setPreloadSprite(this.preloadBar);

  //load game assets
  this.load.tilemap('practice', 'assets/tilemap/practice.json', null, Phaser.Tilemap.TILED_JSON);
  this.load.image('gameTiles', 'assets/images/snowOGA.png');
  },
  create:function() {
    this.state.start('Game');
  }
}
