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
                let _x = (x - i);
                let _y = y;
                let tile = this.board.getTile(_x, _y);

                return { 
                    x: _x,
                    y: _y, 
                    tile: tile 
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

        addSegment(x, y, tile) {
            this.body.push({ x, y, tile });
        }

        spawn() {
            this.forEachSegment((segment) => {
                this.board.putTile(segment.x, segment.y, TILES.SNAKE);
            });
        }

        moveRight() {
            this.forEachSegment((segment, i) => {
                let { x, y, tile } = this.body[i];
                let _x = (x + 1);
                let _y = y;

                this.body[i] = { 
                    x: _x,
                    y: _y,
                    tile
                };

                this.board.putTile(x, _y, tile);
                this.board.putTile(_x, _y, TILES.SNAKE);
            });

            let size = this.body.length;
            let lastSegment = this.body[size - 1];
            
            this.board.putTile(lastSegment.x - 1, lastSegment.y, lastSegment.tile);
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
