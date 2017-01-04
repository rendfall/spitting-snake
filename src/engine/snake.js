(function (root) {
    const { SNAKE } = CONFIG;
    const { TILES, DIRECTIONS } = CONSTANTS; 

    class Snake {
        constructor(board, x, y) {
            this.board = board;
            this.direction = DIRECTIONS.RIGHT;
            this.body = [];

            this.createBody(x, y);
        }

        createBody(x, y) {
            let size = SNAKE.SIZE;

            for (let i = size; i > 0; i--) {
                this.addSegment(x - i, y);
            }

            this.spawn();
        }

        addSegment(x, y) {
            this.body.push({ x, y });
        }

        spawn() {
            this.body.forEach((coords) => {
                this.board.putTile(coords.x, coords.y, TILES.SNAKE);
            });
        }

        update() {}
    }

    root.Snake = Snake;
})(window);
