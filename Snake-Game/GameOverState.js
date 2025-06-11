import GameState from './GameState.js';

class GameOverState extends GameState {
    enter(game) {
        console.clear();
        console.log("💀 GAME OVER 💀");
        console.log(`Score final: ${game.score}`);
        console.log("Appuyez sur ESPACE pour rejouer");
    }

    update(game) {
        if (game.lastKey === ' ') {
            game.setState(game.menuState);
        }
    }
}

export default GameOverState;