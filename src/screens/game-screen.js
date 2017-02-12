(function (root) {
    const { MAP, GAME, SNAKE } = CONFIG;

    function createElement(name, styles) {
        let $el = document.createElement('i');
        Object.assign($el.style, styles);
        return $el;
    }

    let $tile = createElement('i', { 
        display: 'block',
        float: 'left',
        border: '1px solid #ddd',
        width: '8px',
        height: '8px'
    });

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
                let $t = $tile.cloneNode(true);
                $t.style.backgroundColor = colors[tile.value];

                $world.appendChild($t);
            });
        }
    }

    root.GameScreen = GameScreen;
})(window);
