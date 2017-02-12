function update() {
    //
    // if (tempBool && !projectile.exists) { // TODO create at player when detect command >>> change tempBool to command detected
    //     tempBool = false;
    //     projectile.reset(player.x, player.y);
    // }
    //
    // if (projectile.exists) { //TODO command for projectile
    //     moveProjectile(projectile, 500, 500, 4); //TODO place holder values
    // }

  if (game_state == 1) {
    for (var user in players) {
      player = players[user];
      player.move();
    }
  }

}
