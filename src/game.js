const CONFIG = {
    MAP_SIZE: 20
}

class Game {
    constructor($root) {
        this.$root = $root;

        this.setupBoard();
    }

    setupBoard() {
        let board = this.board = new Board(CONFIG.MAP_SIZE);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Game('content');
});
