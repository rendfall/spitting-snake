(function (root) {
    const { SNAKE } = CONFIG;
    const { TILES, DIRECTIONS } = CONSTANTS; 

    class Snake {
        constructor(x, y) {
            this.direction = DIRECTIONS.RIGHT;
            this.body = this.createBody(x, y);
        }

        createBody(x, y) {
            let length = SNAKE.SIZE;

            return Array.from({ length }, (v, i) => {
                let _x = (x - i);
                let _y = y;

                return { 
                    x: _x,
                    y: _y
                };
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

        moveRight() {
            this.forEachSegment((segment, i) => {
                let { x, y } = segment;
                this.body[i] = {
                    x: x + 1,
                    y: y
                };
            });

        }

        render(board) {
            this.forEachSegment((segment, i) => {
                let { x, y } = segment;
                board.putTile(x, y, TILES.SNAKE);
            });
        }

        move() {
            let { LEFT, RIGHT, UP, DOWN } = DIRECTIONS;
            let { direction, body } = this;

            switch (direction) {
                case RIGHT:
                    this.moveRight();
                    break;

                case LEFT:
                    console.log('LEFT');
                    break;

                case UP:
                    console.log('UP');
                    break;

                case DOWN:
                    console.log('DOWN');
                    break;
            }
        }

        update() {
            this.move();
        }
    }

    root.Snake = Snake;
})(window);
