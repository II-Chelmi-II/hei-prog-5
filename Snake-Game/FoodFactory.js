import Point from './Point.js';

class FoodFactory {
    static generateFood(gridSize, snakeBody) {
        let food;
        const occupied = new Set(snakeBody.map(p => `${p.x},${p.y}`));
        
        do {
            food = new Point(
                Math.floor(Math.random() * gridSize),
                Math.floor(Math.random() * gridSize)
            );
        } while (occupied.has(`${food.x},${food.y}`));
        
        return food;
    }
}

export default FoodFactory;