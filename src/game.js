(function (root) {
    const { MAP, GAME, SNAKE } = CONFIG;
    const { DIRECTIONS, TILES } = CONSTANTS;

    class Game {
        constructor($world) {
            this.$world = $world;
            this.turnInterval = GAME.TURN_INTERVAL;
            this.isEnded = false;

            this.setupStage();
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

        loop() {
            let { stage } = this;

            stage.update();

            this.debug();
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

        debug() {
            let { $world, board } = this;
            let colors = ['white', 'red', 'green', 'yellow'];

            $world.innerHTML = '';
            $world.style.cssText = 'width:200px;height:200px';

            board.forEachTile((tile) => {
                let $el = document.createElement('i');

                $el.setAttribute('style', [
                    'display: block',
                    'float: left',
                    'border: 1px solid black',
                    'background-color: ' + colors[tile.value],
                    'width: 8px',
                    'height: 8px'
                ].join(';'));
                $el.setAttribute('title', `[${tile.x}, ${tile.y}]: ${tile.value}`);

                this.$world.appendChild($el);
            });
        }
    }

    root.Game = Game;
})(window);

document.addEventListener('DOMContentLoaded', () => {
    let $world = document.getElementById('world');

    new Game($world);
});
