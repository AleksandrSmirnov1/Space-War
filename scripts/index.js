'use strict'

let game = new Game('spacewar');
let stars = new Stars(750);
let ship = new Ship();
let projectiles = new Projectile(ship);
let asteroids = new Asteroids(ship);

game.addEntity(stars);
game.addEntity(ship);
game.addEntity(projectiles);
game.addEntity(asteroids);

game.addListener(ship);
game.addListener(stars);
game.addListener(projectiles);

game.start();