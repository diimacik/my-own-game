export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.touchY = '';
        this.touchTresholdY = 50;
        //this.touchTresholdX = 100;
        window.addEventListener('keydown', e => {

            if ((   e.key === 'ArrowUp'||
                    e.key === 'ArrowDown' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight'
                ) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }else if (e.key === 'd') this.game.debug = !this.game.debug;
            else if (e.key === 'Enter' && this.game.gameOver) {
                this.game.restartGame();
            }
        });
        window.addEventListener('keyup', e => {
            if (    e.key === 'ArrowUp'||
                    e.key === 'ArrowDown' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }

        });

        // touch listener for restart game :)
        window.addEventListener('touchstart', e => {
            this.touchY = e.changedTouches[0].pageY;
        });
        window.addEventListener('touchmove', e => {
            const swipeDistace = e.changedTouches[0].pageY - this.touchY;
            if (swipeDistace > this.touchTresholdY && this.keys.indexOf('swipe down') === -1) {
                this.keys.push('swipe down');
                if (this.game.gameOver) this.game.restartGame();
            }
        });
        window.addEventListener('touchend', () => {
            this.keys.splice(this.keys.indexOf('swipe down'));
        });

    }
}