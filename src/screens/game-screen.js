(function (root) {
    const { MAP, GAME, SNAKE } = CONFIG;

    class GameScreen {
        constructor(game) {
            this.game = game;
        }

        render() {
            let { board, $world } = this.game;
            let colors = ['white', 'red', 'green', 'yellow'];

            $world.style.width = '200px';
            $world.style.height = '200px';

            board.forEachTile((tile) => {
                let $t = Elements.create('tile');
                $t.style.backgroundColor = colors[tile.value];

                $world.appendChild($t);
            });
        }
    }

    root.GameScreen = GameScreen;
})(window);
