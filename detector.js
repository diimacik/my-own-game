/*export function userDevice() {
    const UserAgent = navigator.userAgent;
    const device = {
        iPad: /iPad/.test(UserAgent),
        iPhone: /iPhone/.test(UserAgent),
        Android: /Android/.test(UserAgent),
        windows: /Windows/.test(UserAgent),
    }
    let dev = device[0];
    console.log(device);
    for (dev in device) {
        if (device[dev]) {
            console.log('You are useing ' + dev);
        }
    }
}
    */
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
    }
    detector() {
        
        for (this.dev in this.device) {
            if (this.device[this.dev]) {
                console.log(this.dev);
            }
        }
    }
}