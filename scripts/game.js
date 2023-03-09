'use strict'

function Game(canvas_id) {
    const deltaTime = 1000 / 30;
    
    let canvas = document.getElementById(canvas_id);
    let context = canvas.getContext("2d", {
        alpha: false,
    });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let entities = [];
    let listeners = [];

    canvas.addEventListener('mousemove', function(event) {
        let position = [event.clientX, event.clientY];
        listeners.filter(listener => listener.onMouseMove != undefined).forEach(listener => {
            listener.onMouseMove(position);
        });
    });

    window.addEventListener('keypress', function(event) {
        listeners.filter(listener => listener.pressSpace != undefined).forEach(listener => {
            if (event.key == ' ' || event.code == "Space" || e.keyCode == 32) 
                listener.pressSpace(entities[2]);
        });
    });

    function clearCanvas() {
        context.fillStyle = "#17141B";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function update() {
        entities.forEach(entity => {
            entity.update(deltaTime);
        });
    }

    function render() {
        clearCanvas();
        entities.forEach(entity => {
            entity.render(context);
        });
    }

    function eventLoop() {
        update();
        checkCollision();
        render();
        setTimeout(eventLoop, deltaTime);
    }

    this.start = function() {
        setTimeout(eventLoop, deltaTime);
    }

    this.addEntity = function(entity) {
        entity.init(canvas.width, canvas.height);
        entities.push(entity);
    }

    this.addListener = function(listener) {
        listeners.push(listener);
    }
}
