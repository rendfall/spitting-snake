(function (root) {
    class EndScreen {
        constructor(game) {
            this.game = game;
        }

        render() {
            let { $world } = this.game;
            $world.innerText = 'GameOver';
        }
    }

    root.EndScreen = EndScreen;
})(window);
