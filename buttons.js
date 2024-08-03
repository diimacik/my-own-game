export class btnPause {
    constructor(game, x, y, color) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.radius = 30;
        this.color = color;
    }


    
    draw(context) {
        function circle(x, y, radius, color) {
            context.beginPath();
            context.fillStyle = color;
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
        circle(this.x, this.y, this.radius, '#3d3d3d');
        context.save();
        
        context.fillStyle = 'white';
        context.font = 40 + 'px ' + 'Pixelify Sans';
        context.fillText('| |', this.x - 11, this.y + 10);
        
        context.restore();
    }
}