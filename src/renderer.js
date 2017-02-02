(function (root) {
    const { MAP, GAME, SNAKE } = CONFIG;
    const { DIRECTIONS, TILES } = CONSTANTS;

    function createElement(name, obj) {
        let $el = document.createElement('i');
        Object.assign($el.style, obj);
        return $el;
    }

    let $tile = createElement('i', { 
        display: 'block',
        float: 'left',
        border: '1px solid #ddd',
        width: '8px',
        height: '8px'
    });

    class Renderer {
        constructor(game) {
            this.game = game;
        }

        render() {
            let { board, $world } = this.game;
            let colors = ['white', 'red', 'green', 'yellow'];

            $world.innerHTML = '';
            $world.style.width = '200px';
            $world.style.height = '200px';

            board.forEachTile((tile) => {
                let $t = $tile.cloneNode(true);
                $t.style.backgroundColor = colors[tile.value];

                $world.appendChild($t);
            });
        }
    }

    root.Renderer = Renderer;
})(window);
