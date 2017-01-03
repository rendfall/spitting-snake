class Game {
    constructor($root) {
        this.$root = $root;
        this.speed = CONFIG.INITIAL_SPEED;

        this.setupBoard();
        this.setupSnake();

        this.start();
    }

    setupBoard() {
        let board = this.board = new Board(CONFIG.MAP_SIZE);
    }

    setupSnake() {
        let snake = this.snake = new Snake(this.board, 0, 0);
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

document.addEventListener('DOMContentLoaded', () => {
    new Game('content');
});
