(function (root) {
    const { MAP, GAME, SNAKE } = CONFIG;
    const { DIRECTIONS, TILES } = CONSTANTS;

    class Game {
        constructor($world) {
            this.$world = $world;
            this.turnInterval = GAME.TURN_INTERVAL;
            this.isEnded = false;
            this.keyboard = new Keyboard();
            this.stageManager = new StageManager(this);

            this.setupRenderer();
            this.setupStages();
            this.setupBoard();
            this.setupPickups();
            this.setupSnake();

            this.start();
        }

        setupRenderer() {
            let renderer = this.renderer = new Renderer(this);
        }

        setupStages() {
            const { STAGES } = GAME;
            let { stageManager } = this;

            stageManager.add(STAGES.GAME);
            stageManager.add(STAGES.MENU);
            stageManager.add(STAGES.END);

            stageManager.go(STAGES.GAME);
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

        loop() {
            let { stageManager, renderer } = this;
            stageManager.getActive().update();
            renderer.render();
        }

        start() {
            let ts = Date.now();
            let game = this;

            (function step() {
                if (game.isEnded) {
                    return console.log('Game Over');
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
