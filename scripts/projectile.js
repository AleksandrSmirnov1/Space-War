'use strict'

function Projectile() {
    this.projectiles = [];

    this.addProjectile = function(angle, gun, speed) {
        this.projectiles.push({
            angle: angle, 
            point: Object.assign({}, gun),
            end: sum_vectors(factor_vector(angle_to_vector(angle), 15), Object.assign({}, gun),),
            speed: sum_vectors(Object.assign({}, speed), factor_vector(angle_to_vector(angle), 1000)),
        });
    }
    
    this.render = function(context) {
        context.lineWidth = 1.5;
        this.projectiles.forEach(projectile => {
            context.beginPath();
            context.moveTo(projectile.point[0], projectile.point[1]);
            context.lineTo(projectile.end[0], projectile.end[1]);
            context.closePath();
            context.strokeStyle = "#cc3333";
            context.stroke(); 
        });
    }
    // TODO dequeue
    this.update = function(deltaTime) {
        this.projectiles.forEach(projectile => {
            const dxdy = [(-ship.speed[0] + projectile.speed[0]) * (deltaTime * 0.001), (-ship.speed[1] + projectile.speed[1]) * (deltaTime * 0.001)];
            sum_vectors(projectile.point, dxdy);
            sum_vectors(projectile.end, dxdy);

            if (projectile.point[0] < 0 || projectile.point[0] >= this.width || projectile.point[1] < 0 || projectile.point[1] >= this.height) {
                this.projectiles.shift();
            }
        })        
    }

    this.init = function(canvas_width, canvas_height) {
    }
}