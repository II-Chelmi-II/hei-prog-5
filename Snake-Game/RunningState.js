import GameState from './GameState.js';

class RunningState extends GameState {
    enter(game) {
        game.score = 0;
        game.initGame();
    }

    update(game) {
        // Mise à jour de la direction
        const nextDirection = game.moveStrategy.computeNextDirection();
        if (nextDirection) {
            game.snake.changeDirection(nextDirection);
        }

        // Déplacement du serpent
        game.snake.move();

        // Vérification des collisions
        if (game.snake.checkCollision(game.gridSize)) {
            game.setState(game.gameOverState);
            return;
        }

        // Vérification de la nourriture
        const head = game.snake.getHead();
        if (head.equals(game.food)) {
            game.snake.grow();
            game.score++;
            game.food = FoodFactory.generateFood(game.gridSize, game.snake.body);
        }
    }

    render(game) {
        console.clear();
        console.log(`Score: ${game.score}\n`);

        // Rendu de la grille
        const grid = Array(game.gridSize).fill()
            .map(() => Array(game.gridSize).fill('.'));

        // Placement de la nourriture
        grid[game.food.y][game.food.x] = '@';

        // Placement du serpent
        game.snake.body.forEach((segment, index) => {
            grid[segment.y][segment.x] = index === 0 ? 'H' : '#';
        });

        // Affichage
        grid.forEach(row => console.log(row.join(' ')));
    }
}

export default RunningState;