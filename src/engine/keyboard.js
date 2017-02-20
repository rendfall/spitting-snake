(function (root) {
    const { KEYCODES } = CONSTANTS;

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

        reset() {
            this.listeners.forEach((fn, name) => {
                root.removeEventListener(name, fn);
            });
            this.listeners = new Map();
            this.keyBindings = new Map();

            this.setupListeners();
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
            return KEYCODES;
        }
    }

    root.Keyboard = Keyboard;
})(window);
