(function (root) {
    class Snake {
        constructor(board, x, y) {
            this.board = board;
            this.spawnPoint = { x, y };
        }

        update() {}
    }

    root.Snake = Snake;
})(window);
