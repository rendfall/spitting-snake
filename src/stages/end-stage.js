(function (root) {
    const AUDIO = {
        end: './src/assets/end.mp3',
        gameOver: './src/assets/die.mp3'
    };

    class EndStage extends Stage {
        constructor(game, name) {
            super(game, name);
            this.score = 0;
            this.setupMusic();
            this.setupSounds();
        }

        setupMusic() {
            this.music = new AudioElement();
            this.music.setVolume(0.5);
        }

        setupSounds() {
            this.sounds = new AudioElement();
        }

        setupFocus() {
            root.addEventListener('blur', (event) => {
                this.music.pause();
            });
            root.addEventListener('focus', (event) => {
                this.music.play();
            });
        }

        open(params) {
            let { music, sounds } = this;

            this.score = params.score;
            this.setupFocus();

            sounds.onEnded(() => {
                music.play(AUDIO.end, true);
            });

            sounds.play(AUDIO.gameOver);
            console.log(`GameOver. Your score is: ${params.score}`);
        }

        update() {
        }
    }

    root.EndStage = EndStage;
})(window);
