(function (root) {
    const { MAP, GAME, SNAKE } = CONFIG;
    const { DIRECTIONS, TILES } = CONSTANTS;

    class Game {
        constructor($world) {
            this.$world = $world;
            this.turnInterval = GAME.TURN_INTERVAL;
            this.isEnded = false;
            this.keyboard = new Keyboard();
            this.renderer = new Renderer(this);
            this.stageManager = new StageManager(this);

            this.setupRenderer();
            this.setupStages();
            this.setupBoard();
            this.setupPickups();
            this.setupSnake();

            this.start();
        }

        setupRenderer() {
            const { SCREENS } = GAME;
            let { renderer } = this;

            renderer.addScreen(SCREENS.GAME);
            renderer.addScreen(SCREENS.MENU);
            renderer.addScreen(SCREENS.END);
        }

        setupStages() {
            const { STAGES } = GAME;
            let { stageManager } = this;

            stageManager.add(STAGES.GAME);
            stageManager.add(STAGES.MENU);
            stageManager.add(STAGES.END);

            stageManager.go(STAGES.MENU);
        }

        setupBoard() {
            this.board = new Board(MAP.SIZE);
        }

        setupPickups() {
            this.pickups = new Pickups();
        }

        setupSnake() {
            this.snake = new Snake(4, 4);
        }

        loop() {
            let { stageManager, renderer } = this;
            let activeStage = stageManager.getActive();

            activeStage.update();
            renderer.render(activeStage);
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
