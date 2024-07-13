export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 40;
        this.fontFamily = 'Pixelify Sans'
        this.livesImage = document.getElementById('heart');
        this.energyImage = document.getElementById('energy');
    }
    draw(context) {
        context.save();
        context.font = this.fontSize + 'px ' + this.fontFamily;
        // coins
        context.fillText('Coins ' + this.game.coins, 20, 50);
        // kills
        context.fillText('Kills ' + this.game.kills, 20, 80);
        // lives
        for (let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.livesImage, 30 * i + 20, 95, 25, 25);
        }
        // energy
        for (let i = 0; i < this.game.energy; i++) {
            context.drawImage(this.energyImage, 30 * i + 20, 100, 25, 25);
        }
        context.restore();

    }
}