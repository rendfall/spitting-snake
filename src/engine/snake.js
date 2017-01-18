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
                return { 
                    x: (x - i),
                    y: y
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

        getSegment(i) {
            return {
                x: this.body[i].x,
                y: this.body[i].y
            }
        }

        setDirection(d) {
            this.direction = d;
        }

        render(board) {
            this.forEachSegment((segment, i) => {
                let { x, y } = segment;
                board.putTile(x, y, TILES.SNAKE);
            });
        }

        move() {
            let { RIGHT, LEFT, DOWN, UP } = DIRECTIONS;
            let { body, direction } = this;
            let head = this.getSegment(0);

            switch (direction) {
                case RIGHT: head.x++; break;
                case LEFT: head.x--; break;
                case DOWN: head.y++; break;
                case UP: head.y--; break;
            }
            
            body.pop();
            body.unshift(head);
        }

        update() {
            this.move();
        }
    }

    root.Snake = Snake;
})(window);
