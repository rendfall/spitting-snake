(function (root) {
    const { FOOD, MAP } = CONFIG;
    const { TILES, DIRECTIONS } = CONSTANTS; 

    class Food {
        constructor() {
            this.pool = [];
        }

        generatePool(slots, count) {
            for (let i = 0; i < count; i++) {
                let pos = this.shuffle(slots).pop();
                this.pool.push(pos);
            }

            return this.pool;
        }

        refreshPool(slots) {
            let count = FOOD.MAX - this.pool.length;
            this.generatePool(slots, count);
        }

        shuffle(arr) {
            return arr.slice().sort(() => (0.5 - Math.random()));
        }

        remove(x, y) {
            let idx = this.pool.findIndex((f) => {
                return (f.x === x && f.y === y);
            });

            this.pool.splice(idx, 1);
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
