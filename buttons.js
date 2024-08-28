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
            context.fillText(this.text, this.x + 10, this.y + this.height - 15);
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
        this.text = 'skin';
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
        this.color = 'rgba(0, 0, 0, 1)';
        this.text = 'achieves';
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
        this.text = 'setting';
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