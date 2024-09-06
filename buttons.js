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

class Btn {
    constructor(x, y, width, heigth) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = heigth;
        this.preset = false;
    }
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        if (this.text) {
            context.save();
            context.fillStyle = 'white';
            context.font = 25 + 'px ' + 'Pixelify Sans';
            context.fillText(this.game.languageSet[this.game.languageId].btnText[this.id], this.x + 10, this.y + this.height - 15);
            context.restore();
        }
        
    }
    lisener() {
        addEventListener('mousedown', e => {
            this.touchY = e.offsetY;
            this.touchX = e.offsetX;
            if (document.fullscreenElement) {
                this.touchX = e.pageX / this.game.userDev.indexX;
                this.touchY = e.pageY / this.game.userDev.indexY;

            };
            if (this.touchX >= this.x && this.touchX <= this.x + this.width &&
                this.touchY >= this.y && this.touchY <= this.y + this.height
            ){
                
                this.preset = true;
                this.game.music.pressBtnSound();
            }
            
        });
        addEventListener('mouseup', () => {
            
            this.preset = false;
            
        });
        addEventListener('touchstart', e => {
            //this.touchX = e.targetTouches[0].pageX;
            //this.touchY = e.targetTouches[0].pageY;
            if (document.fullscreenElement && this.game.userDev.screenHeight >= this.game.height) {
                this.touchX = e.targetTouches[0].pageX / this.game.userDev.indexX
                this.touchY = e.targetTouches[0].pageY / this.game.userDev.indexY
                
            }
            else if (!document.fullscreenElement && this.game.userDev.screenHeight >= this.game.height) {
                let rect = e.target.getBoundingClientRect();
                this.touchX = e.targetTouches[0].pageX - rect.left;
                this.touchY = e.targetTouches[0].pageY - rect.top;
            }
            else if (!document.fullscreenElement && this.game.userDev.screenHeight <= this.game.height) {
                let rect = e.target.getBoundingClientRect();
                this.touchX = (e.targetTouches[0].pageX - rect.left) / (this.game.userDev.indexX - this.game.userDev.indexMin);
                this.touchY = e.targetTouches[0].pageY / this.game.userDev.indexY;  
                //console.log(this.touchX, this.game.userDev.indexX, this.game.userDev.indexMin);
            }
            else if (document.fullscreenElement && this.game.userDev.screenHeight <= this.game.height) {
                
                this.touchX = (e.targetTouches[0].pageX - this.game.userDev.lessScreen / 2) / (this.game.userDev.indexX - this.game.userDev.indexMin);
                this.touchY = e.targetTouches[0].pageY / this.game.userDev.indexY;  
                //console.log(this.touchX, this.game.userDev.indexX, this.game.userDev.indexMin);
            }
            

            if (this.touchX >= this.x && this.touchX <= this.x + this.width &&
                this.touchY >= this.y && this.touchY <= this.y + this.height
            ){
                
                this.preset = true;
                this.game.music.pressBtnSound();
            }
            
        })
        addEventListener('touchend', () => {
            this.preset = false;
        })
    }
}

export class Btn1 extends Btn {
    constructor(game, x, y, width, heigth) {
        super();
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = heigth;
        this.color = 'rgba(0, 0, 0, 1)';
        this.id = 0;
        this.text = true;
    }
    draw(context) {
        super.draw(context);
    }
    lisener(){
        super.lisener();
        if (this.preset) {
            this.game.menu1.menuInd = 1;
            
        }
    }
}
export class Btn2 extends Btn {
    constructor(game, x, y, width, heigth) {
        super();
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = heigth;
        this.id = 1;
        this.color = 'rgba(0, 0, 0, 1)';
        this.text = true;
    }
    draw(context) {
        super.draw(context);
    }
    lisener(){
        super.lisener();
        if (this.preset) {
            this.game.menu1.menuInd = 2;
            
        }
    }
}
export class Btn3 extends Btn {
    constructor(game, x, y, width, heigth) {
        super();
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = heigth;
        this.color = 'rgba(0, 0, 0, 1)';
        this.id = 2;
        this.text = true;
    }
    draw(context) {
        super.draw(context);
    }
    lisener(){
        super.lisener();
        if (this.preset) {
            this.game.menu1.menuInd = 3;
            
        }
    }

}

export class BtnLeft extends Btn {
    constructor(game, x, y, width, heigth) {
        super();
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = heigth;
        this.color = 'rgba(0, 0, 0, 1)';
        //this.text = '<';
    }
    draw(context) {
        super.draw(context);
        context.save();
        context.fillStyle = 'white';
        context.font = 25 + 'px ' + 'Pixelify Sans';
        context.fillText('<', this.x - 10 +  this.width / 2, this.y + this.height / 2);
        context.restore();
    }
    lisener(){
        super.lisener();
        if (this.preset) {
            this.game.achiev.achieveInd--;
            if (this.game.achiev.achieveInd < 0) {
                this.game.achiev.achieveInd = 9;
            }
            this.preset = false;

        }
    }

}

export class BtnRight extends Btn {
    constructor(game, x, y, width, heigth) {
        super();
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = heigth;
        this.color = 'rgba(0, 0, 0, 1)';
        //this.text = '>';
    }
    draw(context) {
        super.draw(context);
        context.save();
        context.fillStyle = 'white';
        context.font = 25 + 'px ' + 'Pixelify Sans';
        context.fillText('>', this.x + this.width / 2, this.y + this.height / 2);
        context.restore();
    }
    lisener(){
        super.lisener();
        if (this.preset) {
            this.game.achiev.achieveInd++;
            if (this.game.achiev.achieveInd > 9) {
                this.game.achiev.achieveInd = 0;
            }
            this.preset = false;
            

        }
    }

}

// Btn For Settings
export class BtnSound extends Btn {
    constructor(game, x, y, width, height) {
        super();
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'rgba(255, 255, 255, 1)';
        this.musicOnImg = document.getElementById('music-on');
        this.musicOffImg = document.getElementById('music-off');
    }
    draw(context) {
        super.draw(context);
        if (this.game.music.play) {
            context.drawImage(this.musicOnImg, this.x, this.y, this.width, this.height);
        } else {
            context.drawImage(this.musicOffImg, this.x, this.y, this.width, this.height);
        }
    }
    lisener() {
        super.lisener();
        if (this.preset) {
            if (this.game.music.play) {
                this.game.music.play = false;
            } else {
                this.game.music.play = true;
            }
        }
        this.preset = false;
    }
}
export class BtnLanguage extends Btn {
    constructor(game, x, y, width, height) {
        super();
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'rgba(0, 0, 0, 1)';
    
    }
    draw(context) {
        super.draw(context);
        context.drawImage(this.game.languageSet[this.game.languageId].image, this.x + 10, this.y + 10, 32, 32);
        context.save();
            context.fillStyle = 'white';
            context.font = 25 + 'px ' + 'Pixelify Sans';
            context.fillText(this.game.languageSet[this.game.languageId].name, this.x + 50, this.y + this.height - 15);
            context.restore();
    }
    lisener() {
        super.lisener();
        if (this.preset) {
            if (this.game.languageId >= this.game.languageSet.length -1) {
                this.game.languageId = 0;
                this.game.saveLanguage();
            } else {
                this.game.languageId++;
                this.game.saveLanguage();
            }
            
        }
        this.preset = false;
    }
}

export class BtnScreen extends Btn {
    constructor(game, x, y, width, height) {
        super();
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'rgba(255, 255, 255, 1)';
        this.imageOn = document.getElementById('fullScreen-on');
        this.imageOff = document.getElementById('fullScreen-off');
    }
    draw(context) {
        super.draw(context);
        if (document.fullscreenElement) {
            context.drawImage(this.imageOff, this.x, this.y, this.width, this.height);
        } else {
            context.drawImage(this.imageOn, this.x, this.y, this.width, this.height);
        }
    }
    lisener(canvas) {
        super.lisener();
        if (this.preset) {
            this.toggleFullScreen(canvas);
            
        }
        this.preset = false;
    }
    toggleFullScreen(canvas){
        if (!document.fullscreenElement) {
            canvas.requestFullscreen().catch(err => {
                alert(`Error, can't enable full-screen mode: ${err.message}`);
            });
        }else {
            document.exitFullscreen();
            
        }
        
    }
}

export class BtnReset extends Btn {
    constructor(game, x, y, width, height) {
        super();
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'rgba(0, 0, 0, 1)';
        this.id = 3;
        this.text = true;
    }
    draw(context) {
        super.draw(context);
    }
    lisener() {
        super.lisener();
        if (this.preset) {
            this.resetAll();
        }
        this.preset = false;
    }
    resetAll() {
        if (confirm(this.game.languageSet[this.game.languageId].beforDelete)) {
                this.game.score = {
                coins:0,
                selles:[false, true, true, true],
                price:['free', 100, 200, 500],
                lives:10,
                energy:0,
                superPower:false,
                imageInd:0,
            }
            this.game.AchScore = [
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
            ]
            this.game.saveAll();
            this.game.saveAchiev();
        }
    }
}