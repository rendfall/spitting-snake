const CONFIG = {
    MAP: {
        SIZE: 20,
        TILE_SIZE: 12 // px
    },

    GAME: {
        STAGES: {
            MENU: 'MenuStage',
            GAME: 'GameStage',
            END: 'EndStage'
        },

        SCREENS: {
            MENU: 'MenuScreen',
            GAME: 'GameScreen',
            END: 'EndScreen'
        },

        TURN_INTERVAL: 500, // ms

        SPEED_MULTIPIER: 0.2
    },

    SNAKE: {
        SIZE: 6
    },

    PICKUPS: {
        MAX: 3,
        POINTS: 20
    }
};
