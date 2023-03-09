'use strict'

function Stars(stars_count) {
    let velocity = [0, 0];

    this.stars = [];

    this.init = function(canvas_width, canvas_height) {
        this.width = canvas_width;
        this.height = canvas_height;

        for (let i = 0; i < stars_count; ++i) {
            this.stars.push( [(Math.random() * canvas_width), (Math.random() * canvas_height), Math.random() + 0.1])
        }
    }

    this.render = function(context) {
        this.stars.forEach(star => {
            context.fillStyle = "white";
            context.fillRect(star[0], star[1], star[2], star[2] * 3);
        });
    }

    this.update = function(deltaTime) {
        this.stars.forEach(function(star) {
            star[0] += velocity[0] * star[2] * (deltaTime * 0.001);
            star[1] += velocity[1] * star[2] * (deltaTime * 0.001);

            if (star[0] < 0 || star[0] >= this.width || star[1] < 0 || star[1] >= this.height) {
                star[0] = Math.random() * this.width;
                star[1] = Math.random() * this.height;
                star[2] = Math.random();


                snap_with_direction(star, velocity, this.width, this.height);
            }
            
        }.bind(this));
    };

    this.onMouseMove = function(position) {
        let direction = [position[0] - this.width / 2, position[1] - this.height / 2];
        
        velocity = [-direction[0], -direction[1]]

    }
}