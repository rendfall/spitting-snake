(function (root) {
    const { MAP, GAME, SNAKE } = CONFIG;
    const { DIRECTIONS } = CONSTANTS; 

    class Game {
        constructor($root) {
            this.$root = $root;
            this.speed = GAME.SPEED;

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
            window.addEventListener('keyup', (event) => {
                let { RIGHT, LEFT, DOWN, UP } = DIRECTIONS;

                switch (event.keyCode) {
                    case 68: // d
                        this.snake.setDirection(RIGHT); break;
                    case 65: // a
                        this.snake.setDirection(LEFT); break;
                    case 83: // s
                        this.snake.setDirection(DOWN); break;
                    case 87: // w
                        this.snake.setDirection(UP); break;
                }
            });
        }

        loop() {
            this.board.clearMap();

            this.snake.update();
            this.snake.render(this.board);

            this.debug();

        }

        start() {
            let ts = Date.now();
            let game = this;

            (function step() {
                let delta = (Date.now() - ts);

                if (delta >= game.speed) {
                    ts = Date.now();
                    game.loop();
                }

                game.loopID = window.requestAnimationFrame(step);
            })();
        }

        stop() {
            window.cancelAnimationFrame(this.loopID);
        }

        debug() {
            let { $root, board } = this;
            let colors = ['white', 'red', 'green', 'yellow'];

            $root.innerHTML = '';
            $root.style.cssText = 'width:200px;height:200px';

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
                $el.setAttribute('title', `${tile.x}, ${tile.y}`);

                this.$root.appendChild($el);
            });
        }
    }

    root.Game = Game;
})(window);

document.addEventListener('DOMContentLoaded', () => {
    let $content = document.getElementById('content');

    new Game($content);
});
