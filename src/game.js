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
            let snake = this.snake = new Snake(this.board, 10, 1);
        }

        loop() {
            this.snake.update();
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
    }

    root.Game = Game;
})(window);

document.addEventListener('DOMContentLoaded', () => {
    new Game('content');
});
