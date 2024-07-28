
export class UserDevice {
    constructor(game) {
        this.game = game;
        this.UserAgent = navigator.userAgent;
        this.device = {
            iPad: /iPad/.test(this.UserAgent),
            iPhone: /iPhone/.test(this.UserAgent),
            Android: /Android/.test(this.UserAgent),
            windows: /Windows/.test(this.UserAgent),
        }
        this.dev = this.device[0];
        this.leptop = false;
        this.screenWidth = screen.width;
        this.screenHeight = screen.height;
        this.indexX = this.screenWidth / this.game.width;
        this.indexY = this.screenHeight / this.game.height;
    }
    detector() {
        if (this.device.windows) {
            this.leptop = true;
        }
    }
}