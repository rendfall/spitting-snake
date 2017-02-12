(function (root) {
    const { GAME } = CONFIG;

    class Renderer {
        constructor(game) {
            this.game = game;
            this.screens = new Map();
        }

        clearScreen() {
            this.game.$world.innerHTML = '';
        }

        addScreen(name) {
            let screenConstructor = root[name];

            if (typeof screenConstructor !== 'function') {
                throw new Error(`There is no such Screen as ${name}`);
            }

            let screen = new screenConstructor(this.game, name);
            this.screens.set(name, screen);
        }

        getScreen(name) {
            return this.screens.get(name);
        }

        render(stage) {
            let { STAGES, SCREENS } = GAME;
            let { game } = this;
            let screen = null;

            this.clearScreen();

            switch (stage.getName()) {
                case STAGES.MENU:
                    screen = this.getScreen(SCREENS.MENU);
                    break;

                case STAGES.GAME:
                    screen = this.getScreen(SCREENS.GAME);
                    break

                case STAGES.END:
                    screen = this.getScreen(SCREENS.END);
                    break;
            }

            screen.render();
        }
    }

    root.Renderer = Renderer;
})(window);
