

export class Menu1 {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = this.game.width * 0.8;
        this.height = this.game.height;
        this.color = 'rgba(66, 110, 182, 0.8)';
        this.text = 'skin of player';
        this.menuInd = 1;

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
        this.smallCoin = document.getElementById('smallCoin');
        this.coinsSize = 16;
        this.size = 157;
        this.imgSize = 128;
        this.touchMenuY = '';
        this.touchMenuX = '';
        this.menuResponse = true;
        
        this.touchScreen = false;
        this.windows = {
            x: 20,
            y: 280,
            width:this.game.menu1.width - 40,
            height:200,
        }
        this.text = ["It's first skin in this Game", 'More energy', 'More hearts', 'Just tegnoligy save hem']
    }
    
    draw(context) {
        for(let i = 0;i < this.countity; i++) {
            let check = typeof this.game.score.price[i];
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
            context.fillText(this.game.score.price[i], this.x + 45 + (this.size * i), this.size + 69);
            context.restore();
            
            if (check === "number") {
                context.drawImage(this.smallCoin, 0, 0, this.coinsSize, this.coinsSize, this.x * 2 + i * this.size + 5, this.y + this.size, this.coinsSize, this.coinsSize);

            }
            //context.drawImage(this.smallCoin, 0, 0, this.coinsSize, this.coinsSize, this.x * 2 + i * this.size + 3, this.y + this.size, this.coinsSize, this.coinsSize);

            context.beginPath();
            context.lineWidth = '3';
            context.strokeStyle = 'white'
            context.rect(this.x + 20 + this.game.score.imageInd * this.size, this.y + 20 , this.size, this.size);
            context.stroke();
            
            
        }
        
        context.beginPath();
        context.lineWidth = '3';
        context.strokeStyle = 'black'
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke(); 
        
        this.drawWindows(context);
    }
    drawWindows(context) {
        
        context.beginPath();
        context.lineWidth = '3';
        context.strokeStyle = 'black'
        context.rect(this.windows.x, this.windows.y, this.windows.width, this.windows.height);
        context.stroke();
        context.save();
        context.fillStyle = 'white'
        context.font = 40 + 'px ' + 'Pixelify Sans';
        context.fillText(this.text[this.game.score.imageInd], this.windows.x + 45, this.windows.y + 100);
        context.restore();
    }
    lisener(indexX, indexY) {
        
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
                
                this.game.score.imageInd = 0;
                this.game.music.pressBtnSound();
            }
            else if (this.touchMenuY >= this.y && this.touchMenuY <= this.height && 
                this.touchMenuX <= this.devWidth * 2 &&
                this.menuResponse    
            ) {
                this.game.music.pressBtnSound();
                if (this.game.score.selles[1] && this.game.score.coins >= this.game.score.price[1]) {
                    this.game.score.coins -= this.game.score.price[1];
                    

                    
                    this.game.score.imageInd = this.skinID;
                    this.game.score.selles[1] = false;
                    this.game.score.price[1] = 'own';
                    
                    
                }
             
                else  if (!this.game.score.selles[1]){
                    this.game.score.imageInd = 1;
                    this.game.AchScore[7] = true;
                    this.game.saveAchiev();
                }else {
                    this.game.score.imageInd = 0;
                }
                   
            }
            else if (this.touchMenuY >= this.y && this.touchMenuY <= this.height && 
                this.touchMenuX <= this.devWidth * 3 &&
                this.menuResponse
            ) {
                this.game.music.pressBtnSound();
                if (this.game.score.selles[2] && this.game.score.coins >= this.game.score.price[2]) {
                    this.game.score.coins -= this.game.score.price[2];
                    this.game.score.imageInd = 2;
                    this.game.score.selles[2] = false;
                    this.game.score.price[2] = 'own';
                    
                    
                }
             
                else  if (!this.game.score.selles[2]){
                    this.game.score.imageInd = 2;
                    this.game.AchScore[7] = true;
                    this.game.saveAchiev();
                }else {
                    this.game.score.imageInd = 0;
                }
            }
            else if (this.touchMenuY >= this.y && this.touchMenuY <= this.height &&
                this.touchMenuX <= this.devWidth * 4 && 
                this.menuResponse
            ) {
                this.game.music.pressBtnSound();
                if (this.game.score.selles[3] && this.game.score.coins >= this.game.score.price[3]) {
                    this.game.score.coins -= this.game.score.price[3];
                    this.game.score.imageInd = 3;
                    this.game.score.selles[3] = false;
                    this.game.score.price[3] = 'own';
                    
                }         
                else  if (!this.game.score.selles[3]){
                    this.game.score.imageInd = 3;
                    this.game.AchScore[7] = true;
                    this.game.saveAchiev();
                }else {
                    this.game.score.imageInd = 0;
                }
                
            }
            this.game.saveAll();
            if (this.game.score.price === 'free', 'own', 'own', 'own') {
                this.game.AchScore[8] = true;
                this.game.saveAchiev();
            }
        });
        
        window.addEventListener('touchstart', e => {
            this.menuResponse = true;
            
            if (document.fullscreenElement) {
                this.touchMenuX = e.changedTouches[0].pageX / indexX;
                this.touchMenuY = e.changedTouches[0].pageY / indexY;
                //console.log(e);
                //console.log(this.touchMenuX, indexX, this.touchMenuY, 'height '+ this.height, 'width ' + this.devWidth);
            }else if (!document.fullscreenElement) {
                let rect = e.target.getBoundingClientRect();
                this.touchMenuX = e.changedTouches[0].pageX - rect.left;
                this.touchMenuY = e.changedTouches[0].pageY - rect.top;
                
                //console.log(e);
                //console.log(this.touchMenuX, indexX, this.touchMenuY, '!height '+ this.height, '!width ' + this.devWidth);
            }
            
            if (this.touchMenuY >= this.y && this.touchMenuY <= this.height && 
                this.touchMenuX <= this.devWidth &&
                this.menuResponse
            ) {
                
                this.game.score.imageInd = 0;
                this.game.music.pressBtnSound();
            }
            else if (this.touchMenuY >= this.y && this.touchMenuY <= this.height && 
                this.touchMenuX <= this.devWidth * 2 &&
                this.menuResponse    
            ) {
                this.game.music.pressBtnSound();
                if (this.game.score.selles[1] && this.game.score.coins >= this.game.score.price[1]) {
                    this.game.score.coins -= this.game.score.price[1];
                    

                    
                    this.game.score.imageInd = this.skinID;
                    this.game.score.selles[1] = false;
                    this.game.score.price[1] = 'own';
                    
                    
                }
             
                else  if (!this.game.score.selles[1]){
                    this.game.score.imageInd = 1;
                    this.game.AchScore[7] = true;
                    this.game.saveAchiev();
                }else {
                    this.game.score.imageInd = 0;
                }
                   
            }
            else if (this.touchMenuY >= this.y && this.touchMenuY <= this.height && 
                this.touchMenuX <= this.devWidth * 3 &&
                this.menuResponse
            ) {
                this.game.music.pressBtnSound();
                if (this.game.score.selles[2] && this.game.score.coins >= this.game.score.price[2]) {
                    this.game.score.coins -= this.game.score.price[2];
                    this.game.score.imageInd = 2;
                    this.game.score.selles[2] = false;
                    this.game.score.price[2] = 'own';
                    
                    
                }
             
                else  if (!this.game.score.selles[2]){
                    this.game.score.imageInd = 2;
                    this.game.AchScore[7] = true;
                    this.game.saveAchiev();
                }else {
                    this.game.score.imageInd = 0;
                }
            }
            else if (this.touchMenuY >= this.y && this.touchMenuY <= this.height &&
                this.touchMenuX <= this.devWidth * 4 && 
                this.menuResponse
            ) {
                this.game.music.pressBtnSound();
                if (this.game.score.selles[3] && this.game.score.coins >= this.game.score.price[3]) {
                    this.game.score.coins -= this.game.score.price[3];
                    this.game.score.imageInd = 3;
                    this.game.score.selles[3] = false;
                    this.game.score.price[3] = 'own';
                    
                }         
                else  if (!this.game.score.selles[3]){
                    this.game.score.imageInd = 3;
                    this.game.AchScore[7] = true;
                    this.game.saveAchiev();
                }else {
                    this.game.score.imageInd = 0;
                }
                
            }
            this.game.saveAll();
            if (this.game.score.price === 'free', 'own', 'own', 'own') {
                this.game.AchScore[8] = true;
                this.game.saveAchiev();
            }
            /*
            if (this.touchMenuY >= this.y && this.touchMenuY <= this.height && 
                this.touchMenuX <= this.devWidth &&
                this.menuResponse
            ) {
                this.game.score.imageInd = 0;
                
                console.log(this.touchMenuX, this.touchMenuY,'height ' + this.height,'width ' + this.devWidth);
            }
            else if (this.touchMenuY >= this.y && this.touchMenuY <= this.height && 
                this.touchMenuX <= this.devWidth * 2 &&
                this.menuResponse
            ) {
                this.game.score.imageInd = 1;    
            }
            else if (this.touchMenuY >= this.y && this.touchMenuY <= this.height && 
                this.touchMenuX <= this.devWidth * 3 &&
                this.menuResponse
            ) {
                this.game.score.imageInd = 2;
            }
            else if (this.touchMenuY >= this.y && this.touchMenuY <= this.height &&
                this.touchMenuX <= this.devWidth * 4 && 
                this.menuResponse
            ) {
                this.game.score.imageInd = 3;
            }
            */            
        }); 
        addEventListener('touchend', () => {
            this.menuResponse = false;
        });

    }
    
}