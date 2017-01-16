(function (root) {
    const { SNAKE } = CONFIG;
    const { TILES, DIRECTIONS } = CONSTANTS; 

    class Snake {
        constructor(board, x, y) {
            this.board = board;
            this.direction = DIRECTIONS.RIGHT;
            this.body = this.createBody(x, y);

            this.spawn();
        }

        createBody(x, y) {
            let length = SNAKE.SIZE;

            return Array.from({ length }, (v, i) => {
                return { x: x - i, y: y };
            });
        }

        getSize() {
            return this.body.length;
        }

        forEachSegment(fn) {
            let size = this.getSize();

            for (let i = 0; i < size; i++) {
                 fn.call(fn, this.body[i], i);
            }
        }

        addSegment(x, y) {
            this.body.push({ x, y });
        }

        spawn() {
            this.forEachSegment((segment) => {
                this.board.putTile(segment.x, segment.y, TILES.SNAKE);
            });
        }

        update() {

        }
    }

    root.Snake = Snake;
})(window);
