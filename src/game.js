(function (root) {
    const { MAP, GAME, SNAKE } = CONFIG;
    const { DIRECTIONS, TILES } = CONSTANTS; 

    class Game {
        constructor($world) {
            this.$world = $world;
            this.turnInterval = GAME.TURN_INTERVAL;
            this.isEnded = false;

            this.setupBoard();
            this.setupSnake();
            this.setupKeyboard();

            this.start();
        }

        setupBoard() {
            let board = this.board = new Board(MAP.SIZE);
        }

        setupSnake() {
            let snake = this.snake = new Snake(4, 4);
        }

        setupKeyboard() {
            root.addEventListener('keydown', (event) => {
                let { RIGHT, LEFT, DOWN, UP } = DIRECTIONS;
                let { snake } = this;

                switch (event.keyCode) {
                    case 68: // d
                    case 39: // left
                        if (!snake.isMovingTo(LEFT))
                            snake.setDirection(RIGHT);
                        break;
                    case 65: // a
                    case 37: // right
                        if (!snake.isMovingTo(RIGHT))
                            snake.setDirection(LEFT);
                        break;
                    case 83: // s
                    case 40: // down
                        if (!snake.isMovingTo(UP))
                            snake.setDirection(DOWN);
                        break;
                    case 87: // w
                    case 38: // up
                        if (!snake.isMovingTo(DOWN))
                            snake.setDirection(UP);
                        break;
                    case 27:
                        this.pause();
                        break;
                }
            }, false);
        }

        loop() {
            let { board, snake } = this;

            // Snake turn
            let head = snake.getHead();
            let { x, y } = snake.getNextMove();
            let tile = board.getTile(x, y);

            switch (tile) {
                case TILES.SNAKE: this.end(); break;
                case TILES.EMPTY: snake.moveTo(x, y); break;
                case TILES.FOOD: snake.eat(); snake.moveTo(x, y); break;
            }

            board.clearMap();
            snake.render(this.board);

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
