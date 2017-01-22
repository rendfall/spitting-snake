(function (root) {
    const { TILES, DIRECTIONS } = CONSTANTS;

    class GameStage {
        constructor(game) {
            this.game = game;
        }

        update() {
            let { snake, board, food } = this.game;
            let { RIGHT, LEFT, DOWN, UP } = DIRECTIONS;

            board.clearMap();

            let { x, y } = snake.getHead();
            let nextBody = snake.body.slice();

            switch (snake.direction) {
                case RIGHT: x++; break;
                case LEFT: x--; break;
                case DOWN: y++; break;
                case UP: y--; break;
            }

            if (!food.isFood(x, y)) {
                nextBody.pop();
            }

            nextBody.unshift({ x, y });

            snake.body = nextBody;
        }
    }

    root.GameStage = GameStage;
})(window);
