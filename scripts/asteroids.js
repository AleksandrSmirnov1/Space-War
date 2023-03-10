'use strict'

function Asteroids(ship) {
    this.asteroids = [];

    this.init = function(canvas_width, canvas_height) {
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
    }

    this.render = function(context) {
        this.asteroids.forEach(asteroid => {
            context.beginPath();
            context.arc(asteroid.center[0], asteroid.center[1], asteroid.radius, 0, 2 * Math.PI, false);
            context.fillStyle = 'green';
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = '#003300';
            context.stroke();
        });
    }
    // TODO: Linked List
    this.update = function(deltaTime) {
        let chance = Math.floor(randomBound(0, 100)) + 1;
        if (chance > 80 && this.asteroids.length < 30) {
            let asteroid = {};
            let center = 0;
            if (chance > 95)
                asteroid.center = [randomBound(-100, 0), randomBound(-100, this.canvas_height + 100)];
            else if (chance > 90)
                asteroid.center = [randomBound(this.canvas_width, this.canvas_width + 100), randomBound(-100, this.canvas_height + 100)];
            else if (chance > 85)
                asteroid.center = [randomBound(-100, this.canvas_width + 100), randomBound(this.canvas_height, this.canvas_height + 100)];
            else if (chance > 80) 
                asteroid.center = [randomBound(-100, this.canvas_width + 100), randomBound(-100, 0)];
            
            asteroid.angle = randomBound(-Math.PI, Math.PI);
            asteroid.speed = [angle_to_vector(asteroid.angle)[0] * randomBound(100, 500), angle_to_vector(asteroid.angle)[1] * randomBound(100, 500)]
            asteroid.radius = randomBound(10, 20);

            this.asteroids.push(asteroid);
        }


        for (let i = 0; i < this.asteroids.length; ++i)  {
            const asteroid = this.asteroids[i];
            asteroid.center[0] += (-ship.speed[0] + asteroid.speed[0]) * (deltaTime * 0.001);
            asteroid.center[1] += (-ship.speed[1] + asteroid.speed[1]) * (deltaTime * 0.001);

            const canvas_center_width = this.canvas_width / 2;
            const canvas_center_height = this.canvas_height / 2;

            if (distance([canvas_center_width, canvas_center_height], asteroid.center) > 2 * distance([this.canvas_width, this.canvas_height], [canvas_center_width, canvas_center_height])) {
                this.asteroids.splice(i, 1);
            }
        }
    }
}