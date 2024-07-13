export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.touchY = '';
        this.touchX = '';
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
        window.addEventListener('touchstart', e => {
            this.touchY = e.changedTouches[0].pageY;
            this.touchX = e.changedTouches[0].pageX;
            console.log(this.touchY, this.touchX);
        });
        window.addEventListener('touchmove', e => {
            const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
            const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;
            if (swipeDistanceY > -this.touchTresholdY && this.keys.indexOf('swipe up') === -1) this.keys.push('swipe up');
            else if (swipeDistanceY > this.touchTresholdY && this.keys.indexOf('swipe down') === -1) this.keys.push('swipe down');
            else if (swipeDistanceX > this.touchTresholdX && this.keys.indexOf('swipe right') === -1) this.keys.push('swipe right');
            else if (swipeDistanceX > -this.touchTresholdX && this.keys.indexOf('swipe left') === -1) this.keys.push('swipe left');
        });
        window.addEventListener('touchend', e => {
            console.log(this.keys);
            this.keys.splice(this.keys.indexOf('swipe up'), 1);
            this.keys.splice(this.keys.indexOf('swipe down'), 1);
            this.keys.splice(this.keys.indexOf('swipe right'), 1);
            this.keys.splice(this.keys.indexOf('swipe left'), 1);
            console.log(this.keys);
        });

    }
}