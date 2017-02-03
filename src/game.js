(function (root) {
    const { MAP, GAME, SNAKE } = CONFIG;
    const { DIRECTIONS, TILES } = CONSTANTS;

    class Game {
        constructor($world) {
            this.$world = $world;
            this.turnInterval = GAME.TURN_INTERVAL;
            this.isEnded = false;

            this.setupStage();
            this.setupRenderer();
            this.setupBoard();
            this.setupPickups();
            this.setupSnake();

            this.start();
        }

        setupStage() {
            this.stage = new GameStage(this);
        }

        setupBoard() {
            let board = this.board = new Board(MAP.SIZE);
        }

        setupPickups() {
            let pickups = this.pickups = new Pickups();
        }

        setupSnake() {
            let snake = this.snake = new Snake(4, 4);
        }

        setupRenderer() {
            let renderer = this.renderer = new Renderer(this);
        }

        loop() {
            let { stage, renderer } = this;

            stage.update();

            renderer.render();
        }

        start() {
            let ts = Date.now();
            let game = this;

            (function step() {
                if (game.isEnded) {
                    return alert('Game Over');
                }

                let delta = (Date.now() - ts);

                if (delta >= game.turnInterval) {
                    ts = Date.now();
                    game.loop();
                }

                game.loopID = root.requestAnimationFrame(step);
            })();
        }

        pause() {
            root.cancelAnimationFrame(this.loopID);
            console.log('Pausing...');
        }

        end() {
            this.isEnded = true;
        }
    }

    root.Game = Game;
})(window);

document.addEventListener('DOMContentLoaded', () => {
    let $world = document.getElementById('world');

    new Game($world);
});
