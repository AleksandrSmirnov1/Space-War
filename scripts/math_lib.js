function vector_to_angle(vector) {
    return Math.atan2(vector[1], vector[0]);
}

function negate_vector(vector) {
    return [-vector[0], -vector[1]];
}

function rotate_point(point, angle, center) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);

    return [c * (point[0] - center[0]) - s * (point[1] - center[1]) + center[0], s * (point[0] - center[0]) + c * (point[1] - center[1]) + center[1]];
}

function randomBound(min, max) {
    return Math.random() * (max - min) + min;
}

function snap_with_direction(point, direction, width, height) {
    let adx = Math.abs(direction[0]);
    let ady = Math.abs(direction[1]);

    if (Math.random() * (adx + ady) <= adx) {
        if (direction[0] <= 0.0) {
            point[0] = width;
        } else {
            point[0] = 0;
        }
    } else {
        if (direction[1] <= 0.0) {
            point[1] = height;
        } else {
            point[1] = 0;
        }
    }
}