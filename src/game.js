class Game {
    constructor($root) {
        this.$root = $root;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Game('content');
});
