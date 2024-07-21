export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.touchY = '';
        this.touchX = '';
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
            else if (e.key === 'p') this.game.setPause();
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
            this.touchX = e.changedTouches[0].pageX;
            // pause touch in button
            console.log(this.touchX, this.touchY);
            
            const btnX = this.game.btnPause.x - 100;
            const btnY = this.game.btnPause.y - 35;
            const radius = this.game.btnPause.radius;
            console.log(btnX, btnY);
            if (this.touchX >= btnX &&
                this.touchX <= btnX + radius * 2 && 
                this.touchY >= btnY &&
                this.touchY <= btnY + radius * 2
            )  {
                this.game.setPause();
            } 

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
        window.addEventListener('mousedown', e => {
            console.log(e);
            this.game.userDev.detector();
            this.touchY = e.offsetY;
            this.touchX = e.offsetX;
            // pause touch in button
            
            
            const btnX = this.game.btnPause.x -30;
            const btnY = this.game.btnPause.y - 30;
            const radius = this.game.btnPause.radius;
            console.log(this.touchX, this.touchY);
            console.log(btnX, btnY);
            if (this.touchX >= btnX &&
                this.touchX <= btnX + radius * 2 && 
                this.touchY >= btnY &&
                this.touchY <= btnY + radius * 2
            )  {
                console.log('pause');
                this.game.setPause();
            }
                
        });
    }
}