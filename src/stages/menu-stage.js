(function (root) {
    class MenuStage extends Stage {
        constructor(game, name) {
            super(game, name);

            this.game.keyboard.on('UP', () => {
                console.log('UP');
            })

            this.game.keyboard.on('ENTER', () => {
                this.game.stateManager.go('GameStage');
            });
        }

        update() {
            // console.log('MenuStage');
        }
    }

    root.MenuStage = MenuStage;
})(window);
