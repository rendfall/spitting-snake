(function (root) {
    const { STAGES } = CONFIG.GAME;
    const INIT_STAGE = STAGES.GAME;

    class StageManager {
        constructor(game) {
            this.game = game;
            this.stages = new Map();
            this.active;
        }

        add(name) {
            let stageConstructor = root[name];

            if (typeof stageConstructor !== 'function') {
                throw new Error(`There is no such Stage as ${name}`);
            }

            let stage = new stageConstructor(this.game);
            this.stages.set(name, stage);
        }

        get(name) {
            return this.stages.get(name);
        }

        getActive() {
            return this.active;
        }

        go(name) {
            let stage = this.get(name);
            this.active = stage;
        }
    }

    root.StageManager = StageManager;
})(window);
