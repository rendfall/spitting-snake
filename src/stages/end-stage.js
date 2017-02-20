(function (root) {
    class EndStage extends Stage {
        constructor(game, name) {
            super(game, name);
        }

        update() {
            console.log('EndStage');
        }
    }

    root.EndStage = EndStage;
})(window);
