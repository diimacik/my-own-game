class Things {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 15;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }
    update(deltaTime) {
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval) {
            
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;   
            this.frameTimer = 0; 
        } else {
            this.frameTimer += deltaTime;
        }
        // chacke on screen
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context) {
        if (this.game.debug) {
            context.beginPath();
            context.lineWidth = '3';
            context.strokeStyle = 'black'
            context.rect(this.x, this.y, this.width, this.height);
            context.stroke(); 
            
            
            
            context.beginPath();
            context.strokeStyle = 'red';
            context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2.5, 0, Math.PI * 2);
            context.stroke();
        }
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

export class Cristal extends Things {
    constructor(game) {
        super();
        this.game = game;
        this.width = 64;
        this.height = 64;
        this.x = this.game.width;
        this.y = this.game.height - this.game.ground - this.height;
        this.image = document.getElementById('cristal');

        
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 5;
    }
    getEfact() {
        if (!this.game.player.superPower) {
            this.game.player.superPower = true;
            this.game.energy += 10;
        }
        else this.game.energy++;
    }
}

export class Coins extends Things {
    constructor(game) {
        super();
        this.game = game;
        this.width = 64;
        this.height = 64;
        this.x = this.game.width;
        this.y = this.game.height - this.game.ground - this.height;
        this.image = document.getElementById('coins');

        
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 3;
    }
    getEfact() {
        this.game.coins++;
    }

}
