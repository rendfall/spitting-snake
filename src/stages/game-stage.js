(function (root) {
    const { TILES, DIRECTIONS } = CONSTANTS;
    const { GAME, PICKUPS } = CONFIG;

    const AUDIO = {
        music: './src/assets/music.mp3',
        pause: './src/assets/pause.mp3',
        pickups: './src/assets/pickup.mp3'
    };

    class GameStage extends Stage {
        constructor(game, name) {
            super(game, name);
            this.game = game;
        }

        open() {
            this.speed = this.game.turnInterval;
            this.requestedDirection = null;
            this.level = 1;
            this.score = 0;

            this.setupMusic();
            this.setupSounds();
            this.setupKeyboard();
        }

        close() {
            this.music.destroy();
            this.sounds.destroy();
        }

        setupMusic() {
            this.music = new AudioElement();
            this.music.setVolume(0.5);
            this.music.play(AUDIO.music, true);
        }

        setupSounds() {
            this.sounds = new AudioElement();
        }

        setupKeyboard() {
            let { RIGHT, LEFT, DOWN, UP } = DIRECTIONS;
            let { keyboard } = this.game;

            keyboard.on('RIGHT', () => this.requestedDirection = RIGHT);
            keyboard.on('d', () => this.requestedDirection = RIGHT);

            keyboard.on('LEFT', () => this.requestedDirection = LEFT);
            keyboard.on('a', () => this.requestedDirection = LEFT);

            keyboard.on('DOWN', () => this.requestedDirection = DOWN);
            keyboard.on('s', () => this.requestedDirection = DOWN);

            keyboard.on('UP', () => this.requestedDirection = UP);
            keyboard.on('w', () => this.requestedDirection = UP);

            keyboard.on('ESC', () => this.gameOver());
        }

        canSnakeChangeDirection() {
            let { RIGHT, LEFT, DOWN, UP } = DIRECTIONS;
            let direction = this.game.snake.direction;
            let requested = this.requestedDirection;

            return (requested === RIGHT && direction !== LEFT) ||
                (requested === LEFT && direction !== RIGHT) ||
                (requested === UP && direction !== DOWN) ||
                (requested === DOWN && direction !== UP);
        }

        increaseSpeed() {
            let { speed, game } = this;

            this.level++;
            this.score += (PICKUPS.POINTS * this.level);

            this.speed = (1 / this.level * 500) + 50;

            game.turnInterval = this.speed;
        }

        snakeUpdate() {
            let { snake, board, pickups } = this.game;
            let { RIGHT, LEFT, DOWN, UP } = DIRECTIONS;
            let { x, y } = snake.getHead();
            let nextBody = snake.body.slice();

            if (this.canSnakeChangeDirection()) {
                snake.direction = this.requestedDirection;
            }

            switch (snake.direction) {
                case RIGHT: x++; break;
                case LEFT: x--; break;
                case DOWN: y++; break;
                case UP: y--; break;
            }

            if (board.isOutOfBounds(x, y)) {
                return this.gameOver();
            }

            let nextTile = board.getTile(x, y);

            if (snake.isSnake(x, y)) {
                return this.gameOver();
            }

            if (pickups.isPickup(x, y)) {
                pickups.remove(x, y);
                this.speedLevel++;
                this.increaseSpeed();
                this.sounds.play(AUDIO.pickups, false);
            } else {
                nextBody.pop();
            }

            nextBody.unshift({ x, y });
            snake.setBody(nextBody);

            snake.forEachSegment((segment, i) => {
                let { x, y } = segment;
                board.putTile(x, y, TILES.SNAKE);
            });
        }

        pickupsUpdate() {
            let { board, pickups } = this.game;
            let emptyTiles = board.getTilesByType(0);
            pickups.refreshPool(emptyTiles);

            pickups.pool.forEach((item) => {
                let { x, y } = item;
                board.putTile(x, y, TILES.PICKUPS);
            });
        }

        update() {
            let { board } = this.game;

            board.clearMap();

            this.snakeUpdate();
            this.pickupsUpdate();
        }

        gameResume() {
            this.game.start();
            this.music.setVolume(0.5);
            this.music.play(AUDIO.music, true);
        }

        gamePause() {
            this.game.pause();
            this.music.setVolume(0.2);
        }

        gameOver() {
            let { score } = this;
            this.music.pause();
            this.game.stageManager.go('EndStage', { score });
        }
    }

    root.GameStage = GameStage;
})(window);
