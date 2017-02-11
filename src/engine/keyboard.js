(function (root) {
    class Keyboard {
        constructor($element = root) {
            this.$element = $element;
            this.keyBindings = new Map();
            this.listeners = new Map();
            this.setupListeners();
        }

        setupListeners() {
            let { listeners, keyBindings, $element } = this;

            listeners.set('keydown', (evt) => {
                let key = Keyboard.getKey(evt.keyCode);
                let fn = keyBindings.get(key);

                if (typeof fn === 'function') {
                    fn.call(null, evt);
                }
            });

            $element.addEventListener('keydown', listeners.get('keydown'), false);
        }

        on(name, fn) {
            this.keyBindings.set(name.toUpperCase(), fn);
        }

        remove() {
            this.listeners.forEach((fn, name) => {
                root.removeEventListener(name, fn);
            })
        }

        static getKey(code) {
            for (let [k, c] of Object.entries(Keyboard.KEYCODES)) {
                if (c === code) return k;
            }

            return null;
        }

        static isKey(name, code) {
            return Keyboard.getCode(name) === code;
        }

        static getCode(name) {
            return Keyboard.KEYCODES[name];
        }

        static get KEYCODES() {
            return {
                BACKSPACE: 8,
                TAB: 9,
                ENTER: 13,
                SHIFT: 16,
                CTRL: 17,
                ALT: 18,
                PAUSE: 19,
                ESC: 27,
                SPACE: 32,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                INSERT: 45,
                DELETE: 46,
                COMMAND: 91,
                A: 65,
                B: 66,
                C: 67,
                D: 68,
                E: 69,
                F: 70,
                G: 71,
                H: 72,
                I: 73,
                J: 74,
                K: 75,
                L: 76,
                M: 77,
                N: 78,
                O: 79,
                P: 80,
                Q: 81,
                R: 82,
                S: 83,
                T: 84,
                U: 85,
                V: 86,
                W: 87,
                X: 88,
                Y: 89,
                Z: 90
            }
        }
    }

    root.Keyboard = Keyboard;
})(window);
