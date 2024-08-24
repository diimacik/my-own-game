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
        this.x -= this.speedX + this.game.maxSpeed;
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

        
        this.speedX = -5.4;
        this.speedY = 0;
        this.maxFrame = 5;
    }
    getEfact() {
        if (!this.game.score.superPower) {
            this.game.score.superPower = true;
            this.game.score.energy += 10;
        }
        else this.game.score.energy++;
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

        
        this.speedX = -5.4;
        this.speedY = 0;
        this.maxFrame = 3;
    }
    getEfact() {
        this.game.score.coins++;
        this.game.saveAll();
        if (this.game.score.coins >= 20) {
            this.game.AchScore[0] = true;        
        }
        if (this.game.score.coins >= 200) {
            this.game.AchScore[1] = true;    
        }
        if (this.game.score.coins >= 500) {
            this.game.AchScore[2] = true;    
        } 
        if (this.game.score.coins >= 5000) {
            this.game.AchScore[3] = true;
        }         
        this.game.saveAchiev();  
        //localStorage.setItem('this.score', JSON.stringify(this.score));
    }

}
export class Hearts extends Things {
    constructor(game) {
        super();
        this.game = game;
        this.width = 64;
        this.height = 64;
        this.x = this.game.width;
        this.y = this.game.height - this.game.ground - this.height;
        this.image = document.getElementById('getLive');

        
        this.speedX = -5.4;
        this.speedY = 0;
        this.maxFrame = 5;
    }
    getEfact() {
        this.game.score.lives++;
        this.game.saveAll();
    }
}
