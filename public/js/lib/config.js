function config() {

    this.app = {
        lang: "en",
        // mode: "pc",
        mode: "webkit",
        debug: 1,
        color_sheme: "default",
        keys: {
            opera: {
                13: "ok",
                208: "left",
                210: "right",
                209: "up",
                211: "down",
                18: "back",
                207: "home",
                218: 'leftRw',
                219: "pause",
                220: "stop",
                221: 'rightRw',
                200: "red",
                201: "green",
                202: "yellow",
                203: "blue"
            },
            webkit: {
                13: "ok",
                37: "left",
                39: "right",
                38: "up",
                40: "down",
                8: "back",
                36: "home",
                119: 'leftRw',
                121: "pause",
                120: "stop",
                122: 'rightRw',
                112: "red",
                113: "green",
                114: "yellow",
                115: "blue",
                126: "exit", //also pip
                145: "chup",
                19: "chdown",
                117: "menu",
                187: "volup",
                189: "voldown",
                116: "mute",
                127: "text",
                91: 'info',
                45: 'subtitles',
                124: 'next',
                125: 'prev',
                27: 'escape'
            },
            pc: {
                13: "ok",
                37: "left",
                39: "right",
                38: "up",
                40: "down",
                77: "back",
                72: "home",
                73: "info",
                81: "menu",
                49: "red",
                50: "green",
                51: "yellow",
                52: "blue",
                69: "exit",
                187: "chup",
                189: "chdown",
                107: "volup",
                109: "volDown"
            }
        }
    };
}

var config = new config();