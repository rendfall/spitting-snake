(function (root) {
    const { MAP, GAME, SNAKE } = CONFIG;

    class GameScreen {
        constructor(game) {
            this.game = game;

            this.setupScoreBoard();
        }

        setupScoreBoard() {
            this.$scoreBoard = Elements.create('score');
        }

        getScore() {
            let { stageManager } = this.game;
            let gameStage = stageManager.getActive();
            return gameStage.score || 0;
        }

        render() {
            let { $scoreBoard, game } = this;
            let { board, $world } = game;
            let colors = ['white', 'red', 'green', 'yellow'];
            let worldSize = MAP.TILE_SIZE * MAP.SIZE;
            let score = this.getScore();

            $scoreBoard.innerText = `Score: ${score}`;

            $world.style.width = `${worldSize}px`;
            $world.style.height = `${worldSize}px`;
            $world.appendChild($scoreBoard);

            board.forEachTile((tile) => {
                let $t = Elements.create('tile');
                $t.style.backgroundColor = colors[tile.value];
                $t.style.width = `${MAP.TILE_SIZE}px`;
                $t.style.height = `${MAP.TILE_SIZE}px`;

                $world.appendChild($t);
            });
        }
    }

    root.GameScreen = GameScreen;
})(window);
