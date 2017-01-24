(function (root) {
    const { TILES, DIRECTIONS } = CONSTANTS;
    const { GAME } = CONFIG;

    class GameStage {
        constructor(game) {
            this.game = game;
            this.speed = this.game.turnInterval;
        }

        increaseSpeed() {
            let { speed, game } = this;

            this.speed = speed - (speed * GAME.SPEED_MULTIPIER);
            game.turnInterval = this.speed;
            console.log(this.speed);
        }

        snakeUpdate() {
            let { snake, board, pickups } = this.game;
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

            if (pickups.isPickup(x, y)) {
                pickups.remove(x, y);
                this.speedLevel++;
                this.increaseSpeed();
            } else {
                nextBody.pop();
            }

            nextBody.unshift({ x, y });
            snake.body = nextBody;

            snake.forEachSegment((segment, i) => {
                let { x, y } = segment;
                board.putTile(x, y, TILES.SNAKE);
            });
        }

        pickupsUpdate() {
            let { board, pickups } = this.game;
            let emptyTiles = board.getTilesByType(0);
            pickups.refreshPool(emptyTiles);

            pickups.pool.forEach((item) => {
                let { x, y } = item;
                board.putTile(x, y, TILES.PICKUPS);
            });
        }

        update() {
            let { board } = this.game;

            board.clearMap();

            this.snakeUpdate();
            this.pickupsUpdate();
        }
    }

    root.GameStage = GameStage;
})(window);
