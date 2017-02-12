var BeaconCrayonGame = BeaconCrayonGame || {}

BeaconCrayonGame.Boot = function(){};

BeaconCrayonGame.Boot.prototype = {
  preload: function() {
    this.load.image('preloadbar', 'assets/images/KannaDieExport.jpg');
  },
  create: function() {
    //white background on loading screen
    this.game.stage.backgroundColor = '#fff';

    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    //physics system PLACEHOLDER
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.state.start('Preload');
  }
}
