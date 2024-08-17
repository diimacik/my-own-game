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
                
            }
            //this.preset = false;
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
            console.log('preset on 1 btn');
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
            console.log('preset on 2 btn');
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
            console.log('preset on 3 btn');
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
            console.log('preset on lisf');
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
            console.log('preset on right');

        }
    }

}