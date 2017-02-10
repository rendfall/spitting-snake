(function (root) {
    class MenuStage extends Stage {
        constructor(game) {
            super(game);
        }

        update() {
            console.log('MenuStage');
        }
    }

    root.MenuStage = MenuStage;
})(window);
