(function (root) {
    class Stage {
        constructor(game, name) {
            this.game = game;
            this.name = name;
        }

        getName() {
            return this.name;
        }
    }

    root.Stage = Stage;
})(window);
