(function (root) {
    const { TILES, DIRECTIONS } = CONSTANTS;

    class GameStage {
        constructor(game) {
            this.game = game;
        }

        update() {
            let { snake, board, food } = this.game;
            let { RIGHT, LEFT, DOWN, UP } = DIRECTIONS;
            let { x, y } = snake.getHead();
            let nextBody = snake.body.slice();

            switch (snake.direction) {
                case RIGHT: x++; break;
                case LEFT: x--; break;
                case DOWN: y++; break;
                case UP: y--; break;
            }

            if (board.isOutOfBounds(x, y)) {
                return this.game.end();
            }

            let nextTile = board.getTile(x, y);

            if (nextTile === TILES.SNAKE) {
                return this.game.end();
            }

            if (food.isFood(x, y)) {
                food.remove(x, y);
            } else {
                nextBody.pop();
            }

            nextBody.unshift({ x, y });
            snake.body = nextBody;

            let emptyTiles = board.getTilesByType(0);
            food.refreshPool(emptyTiles);

            board.clearMap();

            food.pool.forEach((f) => {
                let { x, y } = f;
                board.putTile(x, y, TILES.FOOD);
            });

            snake.forEachSegment((segment, i) => {
                let { x, y } = segment;
                board.putTile(x, y, TILES.SNAKE);
            });
        }
    }

    root.GameStage = GameStage;
})(window);
