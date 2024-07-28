

export class Menu1 {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = this.game.width * 0.8;
        this.height = this.game.height;
        this.color = 'rgba(66, 110, 182, 0.8)';
        this.text = 'Start Game';
    }
    draw(context) {
        
        
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.save();
        
        context.fillStyle = 'black';
        context.font = 40 + 'px ' + 'Pixelify Sans';
        context.fillText(this.text, 150, this.height / 2);
        
        context.restore();
    }
}

