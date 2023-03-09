'use strict'


function Projectile() {
    this.projectiles = [];

    this.addProjectile = function(angle, gun, speed) {
        this.projectiles.push({angle: angle, point: Object.assign({}, gun), speed: speed});
    }
    
    this.render = function(context) {
        context.lineWidth = 1.5;
        this.projectiles.forEach(projectile => {
            context.beginPath();
            context.moveTo(projectile.point[0], projectile.point[1]);
            let vector_to = sum_vectors(factor_vector(angle_to_vector(projectile.angle), 15), projectile.point);
            context.lineTo(vector_to[0], vector_to[1]);
            context.closePath();
            context.strokeStyle = "#cc3333";
            context.stroke(); 
        });
    }

    this.update = function(deltaTime) {
        this.projectiles.forEach(projectile => {
            projectile.point[0] += (factor_vector(angle_to_vector(projectile.angle), 150)[0] + projectile.speed[0] * 0.5) * (deltaTime * 0.001);
            projectile.point[1] += (factor_vector(angle_to_vector(projectile.angle), 150)[1] + projectile.speed[1] * 0.5) * (deltaTime * 0.001);

            if (projectile.point[0] < 0 || projectile.point[0] >= this.width || projectile.point[1] < 0 || projectile.point[1] >= this.height) {
                this.projectiles.shift();
            }
        })        
    }

    this.init = function(canvas_width, canvas_height) {
    }
}