import MoveStrategy from './MoveStrategy.js';
import Direction from './Direction.js';

class PlayerMoveStrategy extends MoveStrategy {
    constructor() {
        super();
        this.nextDirection = null;
    }

    setNextDirection(key) {
        switch(key) {
            case 'w': this.nextDirection = Direction.UP; break;
            case 's': this.nextDirection = Direction.DOWN; break;
            case 'a': this.nextDirection = Direction.LEFT; break;
            case 'd': this.nextDirection = Direction.RIGHT; break;
        }
    }

    computeNextDirection() {
        return this.nextDirection;
    }
}

export default PlayerMoveStrategy;