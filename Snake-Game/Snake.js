import Point from './Point.js';
import Direction from './Direction.js';

class Snake {
    constructor(initialPosition, initialLength = 3, initialDirection = Direction.RIGHT) {
        this.body = [];
        this.direction = initialDirection;
        this.nextDirection = initialDirection;
        this.growthPending = 0;
        
        // Initialisation du corps
        for (let i = 0; i < initialLength; i++) {
            this.body.push(new Point(
                initialPosition.x - i * initialDirection.dx,
                initialPosition.y - i * initialDirection.dy
            ));
        }
    }

    getHead() {
        return this.body[0];
    }

    changeDirection(newDirection) {
        // Empêche les mouvements inverses
        const oppositeX = this.direction.dx === -newDirection.dx;
        const oppositeY = this.direction.dy === -newDirection.dy;
        
        if (!(oppositeX || oppositeY)) {
            this.nextDirection = newDirection;
        }
    }

    move() {
        this.direction = this.nextDirection;
        const head = this.getHead();
        const newHead = new Point(
            head.x + this.direction.dx,
            head.y + this.direction.dy
        );

        this.body.unshift(newHead);
        
        if (this.growthPending > 0) {
            this.growthPending--;
        } else {
            this.body.pop();
        }
    }

    grow() {
        this.growthPending++;
    }

    checkCollision(gridSize) {
        const head = this.getHead();
        
        // Collision avec les murs
        if (
            head.x < 0 || 
            head.x >= gridSize || 
            head.y < 0 || 
            head.y >= gridSize
        ) {
            return true;
        }

        // Collision avec soi-même 
        for (let i = 1; i < this.body.length; i++) {
            if (head.equals(this.body[i])) {
                return true;
            }
        }

        return false;
    }
}

export default Snake;