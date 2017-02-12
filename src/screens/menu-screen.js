(function (root) {
    class MenuScreen {
        constructor(game) {
            this.game = game;
        }

        render() {
            let { $world } = this.game;
            $world.innerText = 'MenuScreen';
        }
    }

    root.MenuScreen = MenuScreen;
})(window);
