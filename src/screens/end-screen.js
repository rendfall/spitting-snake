(function (root) {
    class EndScreen {
        constructor(game) {
            this.game = game;
            this.setupScoreBoard;
        }

        getScore() {
            let { stageManager } = this.game;
            let endStage = stageManager.getActive();
            return endStage.score || 0;
        }

        render() {
            let { $world } = this.game;
            let score = this.getScore();

            $world.innerText = `
                GameOver.
                Your score: ${score} points.
                To try again please refresh the page.
            `;
        }
    }

    root.EndScreen = EndScreen;
})(window);
