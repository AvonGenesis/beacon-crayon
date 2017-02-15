function create() {
    game.stage.backgroundColor = '#787878';

    //  The 'mario' key here is the Loader key given in game.load.tilemap
    map = game.add.tilemap('snowymap');

    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('snowOGA', 'tiles');

    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    layer = map.createLayer('snowMapWorld');

    //  This resizes the game world to match the layer dimensions
    layer.resizeWorld();

    // bmd = game.add.bitmapData(game.width, game.height);
    // bmd.addToWorld();

    //	Disables anti-aliasing when we draw sprites to the BitmapData
    // bmd.smoothed = false;
}
