(function (root) {
    const { STAGES } = CONFIG.GAME;

    class StageManager {
        constructor(game) {
            this.game = game;
            this.stages = new Map();
            this.active = null;
        }

        add(name) {
            let stageConstructor = root[name];

            if (typeof stageConstructor !== 'function') {
                throw new Error(`There is no such Stage as ${name}`);
            }

            let stage = new stageConstructor(this.game, name);
            this.stages.set(name, stage);
        }

        get(name) {
            return this.stages.get(name);
        }

        getActive() {
            return this.active;
        }

        reset() {
            this.game.keyboard.reset();
        }

        go(name, params = {}) {
            let oldStage = this.active;

            if (oldStage) {
                oldStage.close();
            }
            
            this.reset();

            let newStage = this.get(name);
            newStage.open(params);

            this.active = newStage;
        }
    }

    root.StageManager = StageManager;
})(window);
