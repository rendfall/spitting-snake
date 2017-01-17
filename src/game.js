(function (root) {

    const { MAP, GAME, SNAKE } = CONFIG;

    class Game {
        constructor($root) {
            this.$root = $root;
            this.speed = GAME.SPEED;

            this.setupBoard();
            this.setupSnake();

            this.start();
        }

        setupBoard() {
            let board = this.board = new Board(MAP.SIZE);
        }

        setupSnake() {
            let snake = this.snake = new Snake(4, 4);
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
