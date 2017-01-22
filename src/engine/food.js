(function (root) {
    const { FOOD, MAP } = CONFIG;
    const { TILES, DIRECTIONS } = CONSTANTS; 

    class Food {
        constructor() {
            this.pool = this.createPool();
        }

        createPool() {
            let length = FOOD.MAX - 1;

            return Array.from({ length }, (v, i) => {
                return this.getRandomPosition();
            });
        }

        refillPool() {
            let length = FOOD.MAX - this.pool.length - 1;

            for (let i = 0; i < length; i++) {
                let pos = this.getRandomPosition();
                this.pool.push(pos);
            }
        }

        getRandomPosition() {
            let max = MAP.SIZE;
            let r = Math.random;
            let x = r() * max |0;
            let y = r() * max |0;

            return { x, y };
        }

        isFood(x, y) {
            let founded = this.pool.filter((food) => {
                return (food.x === x && food.y === y);
            });
            return (founded.length > 0);
        }
    }

    root.Food = Food;
})(window);
