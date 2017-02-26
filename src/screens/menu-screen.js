(function (root) {
    class MenuScreen {
        constructor(game) {
            this.game = game;
        }

        render() {
            let { $world } = this.game;
            let $item = Elements.create('menuItem');

            $item.innerText = 'Start';

            $world.appendChild($item);
        }
    }

    root.MenuScreen = MenuScreen;
})(window);
