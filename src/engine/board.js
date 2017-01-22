(function (root) {
    const { TILES } = CONSTANTS;

    class Board {
        constructor(size) {
            this.size = size;
            this.createMap();
        }

        createMap() {
            let length = (this.size ** 2);
            this.map = Array.from({ length }).fill(0);
        }

        clearMap() {
            this.map.fill(0);
        }

        getMap() {
            return this.map;
        }

        getTilesByType(type) {
            let group = [];

            this.forEachTile((tile) => {
                if (tile.value === type) {
                    group.push(tile);
                }
            });

            return group;
        }

        forEachTile(fn) {
            let a = this.size;

            for (let y = 0; y < a; y++) {
                for (let x = 0; x < a; x++) {
                    let value = this.getTile(x, y);

                    fn.call(fn, { x, y, value});
                }
            }
        }

        getTileIndex(x, y) {
            return (this.size * y + x);
        }

        getTile(x, y) {
            let i = this.getTileIndex(x, y);
            return this.map[i];
        }

        clearTile(x, y) {
            this.setTile(x, y, TILES.EMPTY);
        }

        putTile(x, y, value) {
            let i = this.getTileIndex(x, y);
            this.map[i] = value;
        }
    }

    root.Board = Board;
})(window);
