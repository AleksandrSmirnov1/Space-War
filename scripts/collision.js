function checkCollisionAsteroids(projectiles, asteroids) {
    let projectiles_array = projectiles.projectiles;
    let asteroids_array = asteroids.asteroids;
    for (let i = 0; i < projectiles_array.length; ++i) {
        const projectile = projectiles_array[i];
        for (let j = 0; j < asteroids_array.length; ++j) {
            const asteroid = asteroids_array[j];
            if (((projectile.end[0] - asteroid.center[0]) ** 2 + (projectile.end[1] - asteroid.center[1]) ** 2) <= (asteroid.radius + 5) ** 2) {
                projectiles_array.splice(i, 1);
                asteroids_array.splice(j, 1);
            }
        }
    }
}

function checkCollisionShip(ship, asteroids) {
    let asteroids_array = asteroids.asteroids;
    let ship_array = ship.points;
    for (let i = 0; i < asteroids_array.length; ++i) {
        const asteroid = asteroids_array[i];
        for (let j = 0; j < ship_array.length; ++j) {
            if (j == 2) continue;
            const point = ship_array[j];
            if (((point[0] - asteroid.center[0]) ** 2 + (point[1] - asteroid.center[1]) ** 2) <= (asteroid.radius + 5) ** 2)
                return false;
        }
    }
    return true;
}