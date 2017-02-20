(function (root) {
    class EndStage extends Stage {
        constructor(game, name) {
            super(game, name);
        }

        open() {
            console.log('GameOver');
        }

        update() {
        }
    }

    root.EndStage = EndStage;
})(window);
