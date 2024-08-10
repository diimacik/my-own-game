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
        context.fillText('Coins ' + this.game.score.coins, 20, 50);
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
        if (this.game.gameOver) {
            let text = 'Game Over, press \n Enter or swipe down \n to restart this game';
            let x = this.game.width / 2;
            let y = 150;
            let linehieght = 40;
            let lines = text.split('\n');

            for (let i = 0; i < lines.length; i++) {
                context.textAlign = 'center';
        
                context.fillStyle = 'rgb(0, 0, 0)';
                context.fontSize = 50;
                context.fillText(lines[i], x, y + (i * linehieght));
                context.fillStyle = 'rgb(255, 255, 255)';
                context.fontSize = 50;
                context.fillText(lines[i], x + 3, y + 3 + (i * linehieght));
            }
            
            

            //context.fillText(text, x, y);
        }
        context.restore();

    }
}