var map;
var layer;
var bmd;

var game = new Phaser.Game(1200, 1000, Phaser.AUTO, 'game', { preload: preload, create: create, update: update});
var player;
var cursors;
var hpbar;
var doneso;
var location;
var spaceA;
var spaceB;
var spaceC;
var spaceD;
var players = {};
var accessX = 220;
var accessY = 500;
var projectiles = []
var game_state = 1
var boss;
var xCounter;
var yCounter;

function create() {
  // game.physics.startSystem(Phaser.Physics.ARCADE);
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
  spaceA = game.add.sprite(200, 400, null);
  spaceB = game.add.sprite(400, 400, null);
  spaceC = game.add.sprite(200, 500, null);
  spaceD = game.add.sprite(400, 500, null);

  //player = game.add.sprite(arrPlayer[1], arrPlayer[2], 'thisshit');
  //player.anchor.set(0.5);
  //game.physics.arcade.enable(player);
  // hpbar = new Phaser.Rectangle(game.world.centerX, 100, 0, 100);
  //game.time.events.add(Phaser.Timer.SECOND * 30, doneso, this);

  // player = game.add.sprite(300, 300, 'thisshit');
  // projectile = game.add.sprite(0, 0, 'projectiles');
  // projectile.kill();
  // player.anchor.set(0.5);
  // game.physics.arcade.enable(player);
  // hpbar = new Phaser.Rectangle(game.world.centerX, 100, 0, 100);
  // game.time.events.add(Phaser.Timer.SECOND * 30, doneso, this);
  // player.body.moves = true;
  // tempBool = true;
  boss = game.add.sprite(260, 150, 'boss');
  xCounter = 0;
  yCounter = 0;
}

function drawPlayer(playerName, role) {
  var playerSprite = game.add.sprite(accessX, accessY, role)
  players[playerName] = {
    playerSprite: playerSprite,
    x: accessX,
    y: accessY,
    attackSprite: null,
    attack: function() {
      if (this.attackSprite != null) { this.attackSprite.destroy()}
      this.attackSprite = game.add.sprite(this.x, this.y, role+"_attack");
      // projectiles.push(this);
    },
    move: function() {
      if (this.attackSprite == null) return;
      moveProjectile(this.attackSprite, boss.x + 120, boss.y + 120, 6);
    }
  };

  accessX += 20;
  // player = game.add.sprite(arrPlayer[1], arrPlayer[2], 'thisshit');
  // player.anchor.set(0.5);
  // game.physics.arcade.enable(player);
  // player.body.moves = true;
  // player.x = accessX;
  // player.y = accessY;
}

function moveToPlace(location, playerSprite) {
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  if(location == "A")
  {
    // arrPlayer..accessX = spaceA.x;
    playerSprite.x = spaceA.x;
    playerSprite.y = spaceA.y;
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
  else if(location == "B") {
    playerSprite.x = spaceB.x;
    playerSprite.y = spaceB.y;
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

// sprite = projectile, x = destination x, y = destination y, m = velocity multiplier
function moveProjectile(sprite, x, y, m) {
  if (!((sprite.x <= x+0.5*m) && (sprite.x >= x-0.5*m) &&
      (sprite.y <= y+0.5*m) && (sprite.y >= y-0.5*m))) {

    sprite.x += Math.cos(Math.atan2(y-sprite.y, x - sprite.x))*m;
    sprite.y += Math.sin(Math.atan2(y-sprite.y, x - sprite.x))*m;
  }
  else{
    if (sprite.exists){
      sprite.kill();
      // sprite.destroy();
      explosion = game.add.sprite(x, y, 'explosion');
      explosion.animations.add('explosion', [0,1]);
      explosion.animations.play('explosion', 2, false, true);
    }
  }
}

function gameStart() {
  game_state = 1;
  boss.reset(260, 150);
  // boss.x = 260;
  // boss.y = 150;
  xCounter = 0;
  yCounter = 0;
  accessX = 250;
}

function gameEnd() {
  game_state = 0
  $("#health").html("<span style=\"color: red\">ROUND OVER</span>");
  boss.kill();
  for (var user in players) {
    player = players[user];

    if (player.attackSprite != null) {
      player.attackSprite.kill();
    }
    player.playerSprite.destroy();
  }
  players = {}
}
