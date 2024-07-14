export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.touchTresholdY = 100;
        this.touchTresholdX = 100;
        window.addEventListener('keydown', e => {

            if ((   e.key === 'ArrowUp'||
                    e.key === 'ArrowDown' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight'
                ) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }else if (e.key === 'd') this.game.debug = !this.game.debug;
        });
        window.addEventListener('keyup', e => {
            if (    e.key === 'ArrowUp'||
                    e.key === 'ArrowDown' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }

        });

    }
}