<<<<<<< HEAD
=======

>>>>>>> origin/master
var map;
var layer;
var mage;
var map;
var layer;
var mage;
var bmd;

  var game = new Phaser.Game(1200, 1000, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, render: render, update: update});

<<<<<<< HEAD

=======
>>>>>>> origin/master
  function preload() {

      //  Tilemaps are split into two parts: The actual map data (usually stored in a CSV or JSON file)
      //  and the tileset/s used to render the map.

      //  Here we'll load the tilemap data. The first parameter is a unique key for the map data.

      //  The second is a URL to the JSON file the map data is stored in. This is actually optional, you can pass the JSON object as the 3rd
      //  parameter if you already have it loaded (maybe via a 3rd party source or pre-generated). In which case pass 'null' as the URL and
      //  the JSON object as the 3rd parameter.

      //  The final one tells Phaser the foramt of the map data, in this case it's a JSON file exported from the Tiled map editor.
      //  This could be Phaser.Tilemap.CSV too.

      //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:

      game.load.image('tiles', 'assets/images/snowOGA.png');
	
      game.load.tilemap('snowymap', 'assets/tilemap/snowMap.json', null, Phaser.Tilemap.TILED_JSON);

      game.load.spritesheet('thisshit', 'assets/images/Isaac.png', 55, 56, 209);
      game.load.spritesheet('explosion', 'assets/images/megumin.png', 25, 25, 209);
      game.load.spritesheet('projectiles', 'assets/images/Bullets.png', 20, 20, 299);

  }

  var map;
  var layer;
  var player;
  var cursors;
  var hpbar;
  var doneso;
  var location;
  var spaceA;
  var spaceB;
  var spaceC;
  var spaceD;
  var arrPlayer = new Array();
  var accessX = 300;
  var accessY = 500;



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
<<<<<<< HEAD
      spaceA = game.add.sprite(200, 400, null);
      spaceB = game.add.sprite(400, 400, null);
      spaceC = game.add.sprite(200, 500, null);
      spaceD = game.add.sprite(400, 500, null);

            //player = game.add.sprite(arrPlayer[1], arrPlayer[2], 'thisshit');
            //player.anchor.set(0.5);
            //game.physics.arcade.enable(player);
            hpbar = new Phaser.Rectangle(game.world.centerX, 100, 0, 100);
            //game.time.events.add(Phaser.Timer.SECOND * 30, doneso, this);

=======
      spaceA = game.add.sprite(800, 800, '');

            player = game.add.sprite(300, 300, 'thisshit');
	    projectile = game.add.sprite(0, 0, 'projectiles');
            projectile.kill();
            player.anchor.set(0.5);
            game.physics.arcade.enable(player);
            hpbar = new Phaser.Rectangle(game.world.centerX, 100, 0, 100);
            game.time.events.add(Phaser.Timer.SECOND * 30, doneso, this);
            player.body.moves = true;
	    tempBool = true;
>>>>>>> origin/master
      }

function render(){
  game.add.sprite(hpbar, "#ff0000");
};

function update(){
     if (tempBool && !projectile.exists) {// TODO create at player when detect command >>> change tempBool to command detected
	tempBool = false;
	projectile.reset(player.x, player.y);
     }	
	
     if(projectile.exists){ //TODO command for projectile
	moveProjectile(projectile, 500, 500,4); //TODO place holder values
     }

}
function drawPlayer(split_string){
  arrPlayer.push({PLAYER: split_string, accessX, accessY});
  accessX += 20;
  player = game.add.sprite(arrPlayer[1], arrPlayer[2], 'thisshit');
  player.anchor.set(0.5);
  game.physics.arcade.enable(player);
  player.body.moves = true;
  player.x = accessX;
  player.y = accessY;
}
function moveToPlace(location, id)
{
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  if(location == "A")
  {
    arrPlayer..accessX = spaceA.x;
    arrPlayer.id.y = spaceA.y;
    spaceA.x += 20;
      //arrPlayer[id].animations.add('walk', [90,91,92,93,94,95]);
      //arrPlayer[id].animations.play('walk', 2, true);
      //arrPlayer[id].scale.x = 1;
      //game.physics.arcade.moveToObject(arrPlayer[id], spaceA, 60);
      //if(10 <= (arrPlayer[id].x - spaceB.x) && 10 <= (arrPlayer[id].y - spaceB.y))
      //{
      //  console.log("check hit !!!!!!!!!");
      //  stopAnimation();
      //  arrPlayer[id].body.velocity[0,0];
      //}
   }
  else if(location == "B")
  {
    arrPlayer[id].x = spaceB.x;
    arrPlayer[id].y = spaceB.y;
    spaceB.x += 20;
      // arrPlayer[id].animations.add('walk', [90,91,92,93,94,95]);
      // arrPlayer[id].animations.play('walk', 2, true);
      // game.physics.arcade.moveToObject(arrPlayer[id], spaceB, 60);
      // if(arrPlayer[id].x == spaceB.x && arrPlayer[id].y == spaceB.y)
      // {
      //   stopAnimation();
      //   arrPlayer[id].body.velocity[0,0];
      // }
      // arrPlayer[id].scale.x = -1;

  }
  else if(location == "C")
  {
    arrPlayer[id].x = spaceC.x;
    arrPlayer[id].y = spaceC.y;
    spaceC.x += 20;
    // arrPlayer[id].animations.add('walk', [127,128,129,130,131]);
    // arrPlayer[id].animations.play('walk', 2, true);
    // game.physics.arcade.moveToObject(arrPlayer[id], spaceC, 60);
    // if(arrPlayer[id].x == spaceC.x && arrPlayer[id].y == spaceC.y)
    // {
    //   stopAnimation();
    //   arrPlayer[id].body.velocity[0,0];
    // }
  }
  else if (location == "D")
  {
    arrPlayer[id].x = spaceD.x;
    arrPlayer[id].y = spaceD.y;
    spaceD.x += 20;
    // arrPlayer[id].animations.add('walk', [84,86,87,89]);
    // player.animations.play('walk', 2, true);
    // game.physics.arcade.moveToObject(player, spaceD, 60);
    // if(player.x == spaceD.x && player.y == spaceD.y)
    // {
    //   stopAnimation();
    //   player.body.velocity[0,0];
    // }
  }


}
function doneso(){
  player.kill();
}

function stopAnimation() {

 //  This will just top the animation from running, freezing it at its current frame
 // greenJellyfish.animations.stop();

 //  This method will reset the frame to frame 1 after stopping
 player.animations.stop(null, true);

}
<<<<<<< HEAD
=======


// sprite = projectile, x = destination x, y = destination y, m = velocity multiplier
function moveProjectile(sprite, x, y, m){
		

	if (!((sprite.x <= x+0.5*m) && (sprite.x >= x-0.5*m) &&
	    (sprite.y <= y+0.5*m) && (sprite.y >= y-0.5*m))) {
	
		sprite.x += Math.cos(Math.atan2(y-sprite.y, x - sprite.x))*m;
		sprite.y += Math.sin(Math.atan2(y-sprite.y, x - sprite.x))*m;
	}
	else{
		if (sprite.exists){
			sprite.kill();
			//sprite.destroy();
			explosion = game.add.sprite(x, y, 'explosion');
			explosion.animations.add('explosion', [0,1]);
       			explosion.animations.play('explosion', 2, false, true);

		}

	}
}


>>>>>>> origin/master
