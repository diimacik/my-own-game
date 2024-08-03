class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 15;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }
    update(deltaTime) {
        this.x -= this.speedX + this.game.maxSpeed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval) {
            
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;   
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
            context.arc(this.x + this.width / 3 + 20, this.y + this.height / 3 + 20, this.width / 2.5, 0, Math.PI * 2);
            context.stroke();
        }
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

export class GroundEnemy extends Enemy{
    constructor(game) {
        super();
        this.game = game;
        this.width = 128;
        this.height = 128;
        this.x = this.game.width;
        this.y = this.game.height - this.game.ground - this.height;
        this.image = document.getElementById('ice-enemy');
        this.lives = 1;
        this.speedX = 0;
        this.speedY = 0;
        this.minFrame = 0;
        this.maxFrame = 4;
    }
}

export class IceBoss extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 192;
        this.height = 192;
        this.x = this.game.width;
        this.y = this.game.height - this.game.ground - this.height;
        this.image = document.getElementById('iceBoss');
        this.imageHeart = document.getElementById('enemy-heart')
        this.lives = 10;
        this.speedX = -4;
        this.speedY = 0;
        this.minFrame = 0;
        this.maxFrame = 4;
    }
    update(deltaTime) {
        super.update(deltaTime);
        if (this.x < 0 ) {
            this.minFrame = 5;
            this.maxFrame = 9;
            this.speedX = -14;
            
        } else if (this.x > this.game.width - this.width) {
            this.minFrame = 0;
            this.maxFrame = 4;
            this.speedX = -4;
                
        }
    }
    draw(context) {
        super.draw(context);
        for (let i = 0; i < this.lives; i++) {
            context.save();
            context.drawImage(this.imageHeart, 20 * i + this.x, this.y, 25, 25);
            context.restore();
        }
    }
}

export class CoinBoss extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 165;
        this.height = 165;
        this.x = this.game.width;
        this.y = this.game.height / 2 - this.height;
        this.image = document.getElementById('coinBoss');
        this.imageHeart = document.getElementById('enemy-heart')
        this.lives = 10;
        this.speedX = -6;
        this.speedY = 0;
        this.minFrame = 0;
        this.maxFrame = 5;
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
        if (this.x < 0 ) {
            this.speedX = -14;
            
        } else if (this.x > this.game.width - this.width) {
            this.speedX = -6;
                
        }
    }
    draw(context) {
        super.draw(context);
        for (let i = 0; i < this.lives; i++) {
            context.save();
            context.drawImage(this.imageHeart, 20 * i + this.x, this.y, 25, 25);
            context.restore();
        }
    }
}

export class Bird extends Enemy{
    constructor(game) {
        super();
        this.game = game;
        this.width = 128;
        this.height = 64;
        this.x = this.game.width;
        this.y = this.game.height / 2 - this.height;
        this.image = document.getElementById('bird');
        this.lives = 1;
        this.speedX = 0;
        this.speedY = 0;
        this.minFrame = 0;
        this.maxFrame = 3;
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

export class IceLance extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 112;
        this.height = 112;
        this.x = Math.random() * this.game.width;
        this.y = 0;
        this.image = document.getElementById('ice-lance');
        this.lives = 1;
        this.speedX = -5.4;
        this.speedY = Math.random() * 6 + 4;
        this.minFrame = 0;
        this.maxFrame = 0;

    }
    update(deltaTime) {
        super.update(deltaTime);
        if (this.y == this.game.height - this.game.ground - this.height / 2) {
            this.markedForDeletion = true;
        }
    }
}

