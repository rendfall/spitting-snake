(function (root) {

    const TILES = {
        EMPTY: 0
    };

    class Board {
        constructor(size) {
            this.size = size;
            this.createMap();
        }

        createMap() {
            let length = (this.size ** 2);
            this.map = Array.from({ length }, () => 0);
        }

        getTileIndex(x, y) {
            return (this.size * (y - 1) + x);
        }

        getTile(x, y) {
            let i = this.getTileIndex(x, y);
            return this.map[i];
        }

        emptyTile(x, y) {
            this.setTile(x, y, TILES.EMPTY);
        }

        setTile(x, y, value) {
            let i = this.getTileIndex(x, y);
            this.map[i] = value;
        }
    }

    root.Board = Board;
})(window);
