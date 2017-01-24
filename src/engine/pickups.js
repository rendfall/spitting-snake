(function (root) {
    const { PICKUPS, MAP } = CONFIG;
    const { TILES, DIRECTIONS } = CONSTANTS; 

    class Pickups {
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
            let count = PICKUPS.MAX - this.pool.length;
            this.generatePool(slots, count);
        }

        shuffle(arr) {
            return arr.slice().sort(() => (0.5 - Math.random()));
        }

        remove(x, y) {
            let idx = this.pool.findIndex((item) => {
                return (item.x === x && item.y === y);
            });

            this.pool.splice(idx, 1);
        }

        isPickup(x, y) {
            let founded = this.pool.filter((item) => {
                return (item.x === x && item.y === y);
            });
            return (founded.length > 0);
        }
    }

    root.Pickups = Pickups;
})(window);
