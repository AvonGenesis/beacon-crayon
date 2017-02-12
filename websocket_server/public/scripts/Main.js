var BeaconCrayonGame = BeaconCrayonGame || {}

BeaconCrayonGame.game = new Phaser.Game(160, 160, Phaser.Auto, "game");

BeaconCrayonGame.game.state.add("Boot", BeaconCrayonGame.Boot);
BeaconCrayonGame.game.state.add("Preload", BeaconCrayonGame.Preload);
BeaconCrayonGame.game.state.add("Game", BeaconCrayonGame.Game);

BeaconCrayonGame.game.state.start("Boot");
