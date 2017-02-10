(function (root) {
    const { TILES, DIRECTIONS } = CONSTANTS;
    const { GAME } = CONFIG;

    const AUDIO = {
        music: './src/assets/music.mp3',
        pause: './src/assets/pause.mp3',
        pickups: './src/assets/pickup.mp3',
        gameOver: './src/assets/die.mp3'
    };

    class GameStage extends Stage {
        constructor(game) {
            super(game);

            this.game = game;
            this.speed = this.game.turnInterval;
            this.requestedDirection = null;

            this.level = 1;

            this.setupMusic();
            this.setupSounds();
            this.setupKeyboard();
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
            root.addEventListener('keydown', (event) => {
                let { RIGHT, LEFT, DOWN, UP } = DIRECTIONS;

                switch (event.keyCode) {
                    case 68: // d
                    case 39: // right
                        this.requestedDirection = RIGHT;
                        break;
                    case 65: // a
                    case 37: // left
                        this.requestedDirection = LEFT;
                        break;
                    case 83: // s
                    case 40: // down
                        this.requestedDirection = DOWN;
                        break;
                    case 87: // w
                    case 38: // up
                        this.requestedDirection = UP;
                        break;
                    case 27:
                        this.gameOver();
                        break;
                }
            }, false);

            window.addEventListener('blur', (event) => {
                this.gamePause();
            });
            window.addEventListener('focus', (event) => {
                this.gameResume();
            });
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
            this.speed = (1 / this.level * 500) + 50;

            game.turnInterval = this.speed;
            console.log(this.speed);
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
            this.music.play(AUDIO.pause, true);
        }

        gameOver() {
            this.music.pause();
            this.sounds.play(AUDIO.gameOver);
            this.game.end();
        }
    }

    root.GameStage = GameStage;
})(window);
