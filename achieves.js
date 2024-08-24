export class Achiev {
    constructor(game){
        this.game = game;
        this.achievWindow = {
            x:20,
            y:50,
            width:this.game.menu1.width - 40,
            height:150,
        }
        this.windows = {
            x: 100,
            y: 230,
            width:this.game.menu1.width - 200,
            height:250,
        }
        this.notAchievImg = [document.getElementById('dontHave-small'), document.getElementById('dontHave-big')];
        this.achiev = {
            imageSmall:[
                document.getElementById('firstCoins-small'),
                document.getElementById('secontCoins-small'),
                document.getElementById('n4Coins-small'),
                document.getElementById('n5Coins-small'),
                document.getElementById('blood1-small'),
                document.getElementById('blood2-small'),
                document.getElementById('blood3-small'),
                document.getElementById('buy1-small'),
                document.getElementById('buy2-small'),
                document.getElementById('killBoss1-small'),
            ],
            imageBig:[
                document.getElementById('firstCoins-big'),
                document.getElementById('secontCoins-big'),
                document.getElementById('n4Coins-big'),
                document.getElementById('n5Coins-big'),
                document.getElementById('blood1-big'),
                document.getElementById('blood2-big'),
                document.getElementById('blood3-big'),
                document.getElementById('buy1-big'),
                document.getElementById('buy2-big'),
                document.getElementById('killBoss1-big'),
            ],
            text:[
                // Coins
                'first Coins \n you mast to have \n more 20 Coins',
                'moer rich have \n  more than \n 200 coins',
                'very rich have \n  more 500 coins',
                'super rich have\n  more 5000 coins',
                // Kill 
                'first blood, \n kill  more 20 \n enemy',
                'a small killer, \n kill more 100',
                'a grazy killer, \n kill more 500',
                // Skin 
                'first buy, \n buy  a first Skin',
                'buing is complite \n buy all \n the Skines',
                'kill a IceBoss',
            ],
            /*
            active:[
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
            ],*/
        }
        //this.textSplit = this.achiev.text.split('\n');
        //this.achievInd = 0;
        this.achieveInd = 0;
        this.sizeIcon = 65;
    }
    checkKills() {
        if (this.game.kills >= 20) {
            this.game.AchScore[4] = true;
        }
        if (this.game.kills >= 100) {
            this.game.AchScore[5] = true;
        }
        if (this.game.kills >= 500) {
            this.game.AchScore[6] = true;
        }
        
    }
    checkBuy() {
        if (!this.game.score.selles) {
            this.achiev[8] = true;
        }
    }
    draw(context) {
        
        context.beginPath();
        context.lineWidth = '3';
        context.strokeStyle = 'black'
        context.rect(this.achievWindow.x, this.achievWindow.y, this.achievWindow.width, this.achievWindow.height);
        context.font = 40 + 'px ' + 'Pixelify Sans';
        //context.fillText(this.windows.x + 45, this.windows.y + 100);
        context.rect(this.windows.x, this.windows.y, this.windows.width, this.windows.height);
        context.stroke();
        
        for (let i = 0; i < 10; i++) {
            
            context.beginPath();
            context.lineWidth = '3';
            context.strokeStyle = 'black';
            context.rect(this.achievWindow.x + 15, this.achievWindow.y + this.sizeIcon / 2, this.sizeIcon * i + this.sizeIcon, this.sizeIcon);
            context.stroke();

            context.beginPath();
            context.lineWidth = '3';
            context.strokeStyle = 'white'
            context.rect(this.achievWindow.x + 15 + this.sizeIcon * this.achieveInd, this.achievWindow.y + this.sizeIcon / 2, this.sizeIcon , this.sizeIcon);
            context.stroke();
            if (this.game.AchScore[i]) {
                context.drawImage(this.achiev.imageSmall[i], 0, 0, 60, 60, this.achievWindow.x * 2  + i * 65, this.achievWindow.y + this.sizeIcon / 2 + 5, 60, 60, 60)

            } else {
                context.drawImage(this.notAchievImg[0], 0, 0, 60, 60, this.achievWindow.x * 2  + i * 65, this.achievWindow.y + this.sizeIcon / 2 + 3, 60, 60, 60)

            }

        }
        if (this.game.AchScore[this.achieveInd]) {
            context.drawImage(this.achiev.imageBig[this.achieveInd], 0, 0, 180, 180, this.windows.x, this.windows.y, 180, 180, 180)

        } else {
            context.drawImage(this.notAchievImg[1], 0, 0, 180, 180, this.windows.x, this.windows.y , 180, 180, 180)

        }
        let text  = this.achiev.text[this.achieveInd];
        let linerheight = 40;
        let lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            context.save();
            context.fillStyle = 'white'
            context.font = 40 + 'px ' + 'Pixelify Sans';
            context.fillText(lines[i], this.windows.x + 180 , this.windows.y + 40 + (i * linerheight));
            context.restore();
        }
        if (this.game.AchScore[this.achieveInd]) {
            context.save();
            context.fillStyle = 'white'
            context.font = 30 + 'px ' + 'Pixelify Sans';
            context.fillText('Staus, you have', this.windows.x + 180 , this.windows.y + 200);
            context.restore();
        } else if (!this.game.AchScore[this.achieveInd]) {
            context.save();
            context.fillStyle = 'white'
            context.font = 30 + 'px ' + 'Pixelify Sans';
            context.fillText("Staus, you don't have", this.windows.x + 180 , this.windows.y + 200);
            context.restore();
        }
        

    }
}