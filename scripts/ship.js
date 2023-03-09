'use strict'

function Ship() { 
    this.angle = 0;
    this.speed = [0, 0];

    this.init = function(canvas_width, canvas_height) {
        let middle_width = canvas_width / 2;
        let middle_height = canvas_height / 2;

        this.screenCenter = [middle_width, middle_height];

        this.points = [
            [middle_width + 25, middle_height],
            [middle_width - 25, middle_height - 10],
            [middle_width - 12.5, middle_height],
            [middle_width - 25, middle_height + 10],
        ]
    }

    this.render = function(context) {
        context.beginPath();
        context.moveTo(this.points[0][0], this.points[0][1]);
        for (let i = 1; i < this.points.length; ++i) {
            context.lineTo(this.points[i][0], this.points[i][1]);
        }
        context.lineTo(this.points[0][0], this.points[0][1]);
        context.closePath();
        context.fillStyle = "#afefef";
        context.fill();
    }

    this.update = function(deltaTime) {
        
    };

    this.onMouseMove = function(position) {
        this.speed = [position[0] - this.screenCenter[0], position[1] - this.screenCenter[1]];

        let old_angle = this.angle;
        this.angle = vector_to_angle(this.speed);

        for (let i = 0; i < this.points.length; ++i) {
            this.points[i] = rotate_point(this.points[i], this.angle - old_angle , this.screenCenter);
        }
    }

    this.pressSpace = function(projectile) {
        projectile.addProjectile(this.angle, this.points[0], this.speed);
    }
}