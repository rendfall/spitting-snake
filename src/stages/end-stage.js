(function (root) {
    class EndStage extends Stage {
        constructor(game) {
            super(game);
        }

        update() {
            console.log('EndStage');
        }
    }

    root.EndStage = EndStage;
})(window);
