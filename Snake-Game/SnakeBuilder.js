import Snake from './Snake.js';
import Direction from './Direction.js';
import Point from './Point.js';

class SnakeBuilder {
    constructor() {
        this.position = new Point(5, 5);
        this.length = 3;
        this.direction = Direction.RIGHT;
    }

    withPosition(x, y) {
        this.position = new Point(x, y);
        return this;
    }

    withLength(length) {
        this.length = length;
        return this;
    }

    withDirection(direction) {
        this.direction = direction;
        return this;
    }

    build() {
        return new Snake(this.position, this.length, this.direction);
    }
}

export default SnakeBuilder;