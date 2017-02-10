(function (root) {
    class AudioElement {
        constructor($target = document.body) {
            this.$element = document.createElement('audio');
            $target.appendChild(this.$element);
        }

        setup() {
            $audio.type = type;
            
        }

        getElement() {
            return this.$element;
        }

        setVolume(value) {
            this.getElement().volume = value;
        }

        play(src, loop = false) {
            let $el = this.getElement();

            $el.addEventListener('canplaythrough', () => {
                $el.play();    
            }, false);

            $el.src = src;
            $el.loop = loop;
        }

        pause() {
            this.getElement().pause();
        }
    }

    root.AudioElement = AudioElement;
})(window);
