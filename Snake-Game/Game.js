import SnakeBuilder from './SnakeBuilder.js';
import PlayerMoveStrategy from './PlayerMoveStrategy.js';
import FoodFactory from './FoodFactory.js';
import MenuState from './MenuState.js';
import RunningState from './RunningState.js';
import GameOverState from './GameOverState.js';

class Game {
    constructor() {
        this.gridSize = 10;
        this.score = 0;
        this.lastKey = null;
        this.moveStrategy = new PlayerMoveStrategy();

        // États du jeu
        this.menuState = new MenuState();
        this.runningState = new RunningState();
        this.gameOverState = new GameOverState();
        
        this.state = this.menuState;
        this.state.enter(this);
    }

    initGame() {
        this.snake = new SnakeBuilder()
            .withPosition(Math.floor(this.gridSize / 2), Math.floor(this.gridSize / 2))
            .withLength(3)
            .build();

        this.food = FoodFactory.generateFood(this.gridSize, this.snake.body);
    }

    setState(newState) {
        this.state.exit(this);
        this.state = newState;
        this.state.enter(this);
    }

    start() {
        // Configuration des entrées clavier
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        
        process.stdin.on('data', (key) => {
            if (key === '\u0003') process.exit(); // Ctrl+C
            
            this.lastKey = key;
            this.moveStrategy.setNextDirection(key);
        });

        // Boucle de jeu
        setInterval(() => {
            this.state.update(this);
            this.state.render(this);
        }, 300);
    }
}

// Lancement du jeu
const game = new Game();
game.start();