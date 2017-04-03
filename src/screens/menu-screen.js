(function (root) {
    class MenuScreen {
        constructor(game) {
            this.game = game;
            this.menu = new Set();

            this.setupItems();
        }

        setupItems() {
            let { menu, game } = this;
            let { STAGES } = CONFIG.GAME;

            let $start = Elements.create('menuItem');
            let $classic = Elements.create('menuItem');
            let $spittingSnake = Elements.create('menuItem');

            $classic.innerText = 'Play: Classic';
            $classic.addEventListener('click', () => {
                game.stageManager.go(STAGES.GAME);
            });

            $spittingSnake.innerText = 'Play: Spitting snake'
            // Disabled
            $spittingSnake.style.color = '#aaa';
            $spittingSnake.style.cursor = 'default';

            menu.add($classic);
            // menu.add($spittingSnake);
        }

        render() {
            let { menu } = this;
            let { $world } = this.game;

            menu.forEach(($item) => {
                $world.appendChild($item);
            });
        }
    }

    root.MenuScreen = MenuScreen;
})(window);
