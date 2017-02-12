var map;
var layer;
var mage;
var bmd;

  var game = new Phaser.Game(1200, 1000, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, render: render, update: update});

  function preload() {

      //  Tilemaps are split into two parts: The actual map data (usually stored in a CSV or JSON file)
      //  and the tileset/s used to render the map.

      //  Here we'll load the tilemap data. The first parameter is a unique key for the map data.

      //  The second is a URL to the JSON file the map data is stored in. This is actually optional, you can pass the JSON object as the 3rd
      //  parameter if you already have it loaded (maybe via a 3rd party source or pre-generated). In which case pass 'null' as the URL and
      //  the JSON object as the 3rd parameter.

      //  The final one tells Phaser the foramt of the map data, in this case it's a JSON file exported from the Tiled map editor.
      //  This could be Phaser.Tilemap.CSV too.

      game.load.tilemap('snowymap', 'assets/tilemap/snowMap.json', null, Phaser.Tilemap.TILED_JSON);

      //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:

      game.load.image('tiles', 'assets/images/snowOGA.png');
      game.load.spritesheet('thisshit', 'assets/images/Isaac.png', 55, 56, 209);

  }

  var map;
  var layer;
  var player;
  var cursors;
  var hpbar;

  function create() {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.stage.backgroundColor = '#787878';



      cursors = game.input.keyboard.createCursorKeys();
      //  The 'mario' key here is the Loader key given in game.load.tilemap
      map = game.add.tilemap('snowymap');

      //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
      //  The second parameter maps this name to the Phaser.Cache key 'tiles'
      map.addTilesetImage('snowOGA', 'tiles');

      //  Creates a layer from the World1 layer in the map data.
      //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
      layer = map.createLayer('snowMapWorld');
      layer = map.createLayer('cliffs')

      //  This resizes the game world to match the layer dimensions
      layer.resizeWorld();

            player = game.add.sprite(300, 300, 'thisshit');
            player.anchor.set(0.5);
            game.physics.arcade.enable(player);
            hpbar = new Phaser.Rectangle(game.world.centerX, 100, 0, 100);

    }

function render(){
  game.add.sprite(hpbar, "#ff0000");
};

function update(){

   player.body.velocity.x = 0;
   player.body.velocity.y = 0;

   if (cursors.left.isDown)
   {
       player.animations.add('walk', [90,91,92,93,94,95]);
       player.animations.play('walk', 2, true);
       player.body.velocity.x = -100;
       player.scale.x = 1;
   }
   else if (cursors.right.isDown)
   {
       player.animations.add('walk', [90,91,92,93,94,95]);
       player.animations.play('walk', 2, true);
       player.body.velocity.x = 100;
       player.scale.x = -1;

   }

   if (cursors.up.isDown)
   {
     player.animations.add('walk', [127,128,129,130,131]);
     player.animations.play('walk', 2, true);
      player.body.velocity.y = -200;
   }
   else if (cursors.down.isDown)
   {

     player.animations.add('walk', [84,86,87,89]);
     player.animations.play('walk', 2, true);
       player.body.velocity.y = 200;
   }
}


function stopAnimation() {

 //  This will just top the animation from running, freezing it at its current frame
 // greenJellyfish.animations.stop();

 //  This method will reset the frame to frame 1 after stopping
 player.animations.stop(null, true);

}

