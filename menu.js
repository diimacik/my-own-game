

export class Menu1 {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = this.game.width * 0.8;
        this.height = this.game.height;
        this.color = 'rgba(66, 110, 182, 0.8)';
        this.text = 'skin of player';
        //this.stack = new Stack(this, 20, 50, this.width - 40, this.height * 0.4);
    }
    /*
    update(player, indexX, indexY, coins) {
        //this.stack.lisener(player, indexX, indexY, coins);
        
        
        //this.stack.update(deltaTime, player);
        //this.stack.updateDraw(context);

    }*/
    draw(context) {
        
        context.beginPath();
        context.lineWidth = '3';
        context.strokeStyle = 'black'
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke(); 
        
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.save();
        
        context.fillStyle = 'black';
        context.font = 40 + 'px ' + 'Pixelify Sans';
        context.fillText(this.text, 120, this.height * 0.07);
        
        //this.stack.draw(context);
        //this.stack.updateDraw(context);
        context.restore();
    }
}

export class Stack {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.countity = 4;
        this.devWidth = this.width / this.countity;
        this.image = [
            document.getElementById('player'),
            document.getElementById('player1'),
            document.getElementById('player2'),
            document.getElementById('player3'),
        ];
        
        this.size = 157;
        this.imgSize = 128;
        this.touchMenuY = '';
        this.touchMenuX = '';
        this.menuResponse = true;
        this.skinID = 0;
        //this.selles = this.game.score.selles;
        //this.price = ['free', 100, 200, 500];   
    }
    
    draw(context) {
        for(let i = 0;i < this.countity; i++) {
            
            context.beginPath();
            context.lineWidth = '3';
            context.strokeStyle = 'black'
            context.rect(this.x + 20 + i * this.size, this.y + 20 , this.size, this.size);
            context.stroke();

            context.drawImage(this.image[i], 0, 0, this.imgSize, this.imgSize, this.x * 2 + i * this.size, this.y * 2 - 10, this.imgSize, this.imgSize)

            context.beginPath();
            context.lineWidth = '3';
            context.strokeStyle = 'black'
            context.rect(this.x + 20 + i * this.size, 40 + this.size, this.size, 30);
            context.stroke();
            context.save();
            context.fillStyle = 'white'
            context.font = 40 + 'px ' + 'Pixelify Sans';
            context.fillText(this.game.score.price[i], this.x + 30 + (this.size * i), this.size + 69);
            context.restore();
            context.beginPath();
            context.lineWidth = '3';
            context.strokeStyle = 'white'
            context.rect(this.x + 20 + this.skinID * this.size, this.y + 20 , this.size, this.size);
            context.stroke();
            
            
        }
        
        context.beginPath();
        context.lineWidth = '3';
        context.strokeStyle = 'black'
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke(); 
        
    }
    lisener(player, indexX, indexY, coins) {
        
        window.addEventListener('mousedown', e => {
            
            if (document.fullscreenElement) {
                this.touchMenuX = e.pageX / indexX;
                this.touchMenuY = e.pageY / indexY;

            }else {
                this.touchMenuX = e.offsetX;
                this.touchMenuY = e.offsetY;
            }

            if (this.touchMenuY >= this.y && this.touchMenuY <= this.height && 
                this.touchMenuX <= this.devWidth &&
                this.menuResponse
            ) {
                this.skinID = 0;
                player.imageInd = this.skinID;
                console.log('bumm');
            }
            else if (this.touchMenuY >= this.y && this.touchMenuY <= this.height && 
                this.touchMenuX <= this.devWidth * 2 &&
                this.menuResponse    
            ) {
                if (this.game.score.selles[1] && coins >= this.game.score.price[1]) {
                    this.game.score.coins -= this.game.score.price[1];
                    this.skinID = 1;

                    
                    player.imageInd = this.skinID;
                    this.game.score.selles[1] = false;
                    this.game.score.price[1] = 'own';
                    
                }
             
                else  if (!this.game.score.selles[1]){
                    this.skinID = 1;
                    player.imageInd = this.skinID;
                }else {
                    this.skinID = 0;
                    player.imageInd = this.skinID;
                }
                   
            }
            else if (this.touchMenuY >= this.y && this.touchMenuY <= this.height && 
                this.touchMenuX <= this.devWidth * 3 &&
                this.menuResponse
            ) {
                if (this.game.score.selles[2] && coins >= this.game.score.price[2]) {
                    this.game.score.coins -= this.game.score.price[2];
                    this.skinID = 2;

                    
                    player.imageInd = this.skinID;
                    this.game.score.selles[2] = false;
                    this.game.score.price[2] = 'own';
                    
                }
             
                else  if (!this.game.score.selles[2]){
                    this.skinID = 2;
                    player.imageInd = this.skinID;
                }else {
                    this.skinID = 0;
                    player.imageInd = this.skinID;
                }
            }
            else if (this.touchMenuY >= this.y && this.touchMenuY <= this.height &&
                this.touchMenuX <= this.devWidth * 4 && 
                this.menuResponse
            ) {
                if (this.game.score.selles[3] && coins >= this.game.score.price[3]) {
                    this.game.score.coins -= this.game.score.price[3];
                    this.skinID = 3;

                    
                    player.imageInd = this.skinID;
                    this.game.score.selles[3] = false;
                    this.game.score.price[3] = 'own';
                    
                }
             
                else  if (!this.game.score.selles[3]){
                    this.skinID = 3;
                    player.imageInd = this.skinID;
                }else {
                    this.skinID = 0;
                    player.imageInd = this.skinID;
                }
            }
            this.game.saveAll();
        });

        window.addEventListener('touchstart', e => {
            this.touchMenuX = e.changedTouches[0].pageX / indexX;
            this.touchMenuY = e.changedTouches[0].pageY / indexY;

            if (this.touchMenuY >= this.y && this.touchMenuY <= this.height && 
                this.touchMenuX <= this.devWidth &&
                this.menuResponse
            ) {
                this.skinID = 0;
                player.imageInd = this.skinID;
                
                console.log('bumm');
            }
            else if (this.touchMenuY >= this.y && this.touchMenuY <= this.height && 
                this.touchMenuX <= this.devWidth * 2 &&
                this.menuResponse
            ) {
                this.skinID = 1;
                player.imageInd = this.skinID;    
            }
            else if (this.touchMenuY >= this.y && this.touchMenuY <= this.height && 
                this.touchMenuX <= this.devWidth * 3 &&
                this.menuResponse
            ) {
                this.skinID = 2;
                player.imageInd = this.skinID;
            }
            else if (this.touchMenuY >= this.y && this.touchMenuY <= this.height &&
                this.touchMenuX <= this.devWidth * 4 && 
                this.menuResponse
            ) {
                this.skinID = 3;
                player.imageInd = this.skinID;
            }
        });    
    }
    
}