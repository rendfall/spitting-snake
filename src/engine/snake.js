(function (root) {
    const { SNAKE } = CONFIG;
    const { TILES, DIRECTIONS } = CONSTANTS; 

    class Snake {
        constructor(x, y) {
            this.direction = this.trail = DIRECTIONS.RIGHT;
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

        getHead() {
            return this.getSegment(0);
        }

        getTail() {
            return this.body.slice(-1)[0];
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

        setBody(body) {
            this.body = body;
            this.trail = this.direction;
        }

        isSnake(x, y) {
            let founded = this.body.filter((item) => {
                return (item.x === x && item.y === y);
            });
            return (founded.length > 0);
        }
    }

    root.Snake = Snake;
})(window);
