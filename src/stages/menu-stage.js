(function (root) {
    const { STAGES } = CONFIG.GAME;

    class MenuStage extends Stage {
        constructor(game, name) {
            super(game, name);
        }

        open() {
            let { game } = this;

            game.keyboard.on('ENTER', () => {
                game.stageManager.go(STAGES.GAME);
            });
        }

        update() {
        }
    }

    root.MenuStage = MenuStage;
})(window);
