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
  for (attack of projectiles) {
    attack.move();
  }
}
