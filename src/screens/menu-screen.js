(function (root) {
    function createElement(name, styles) {
        let $el = document.createElement('i');
        Object.assign($el.style, styles);
        return $el;
    }

    let $menuItem = createElement('i', { 
        display: 'block',
        float: 'left',
        width: '100px',
        textAlign: 'center',
        padding: '10px 0',
        height: '30px',
        border: '1px solid #ddd'
    });

    class MenuScreen {
        constructor(game) {
            this.game = game;
        }

        render() {
            let { $world } = this.game;
            let $item = $menuItem.cloneNode(true);

            $item.innerText = 'Start';

            $world.appendChild($item);
        }
    }

    root.MenuScreen = MenuScreen;
})(window);
