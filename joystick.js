

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(vector) {
        return new Vector2(this.x + vector.x, this.y + vector.y)
    }
    sub(vector) {
        return new Vector2(this.x - vector.x, this.y - vector.y)
    }
    mul(n) {
        return new Vector2(this.x * n, this.y * n);
    }
    div(n) {
        return new Vector2(this.x / n, this.y / n);
    }
    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    normalize() {
        return this.mag() === 0 ? new Vector2(0, 0) : this.div(this.mag());
    }
}


export class Joystick {
    constructor(game, x, y, radius, handleRadius) {
        this.game = game;
        this.pos = new Vector2(x, y);
        this.origin = new Vector2(x, y);
        this.radius = radius;
        this.handleRadius = handleRadius;
        this.handleFriction = 0.5;
        this.ondrag = false;
        this.keys = [];
        this.touchPos = new Vector2(0, 0);
        this.fps = 30;
        this.jostickTimer = 0;
        this.jostickInterval = 1000/this.fps;
        this.listener();
    }
    listener() {
        addEventListener('touchstart', e => {
            this.touchPos = new Vector2(e.touches[0].pageX - 80, e.touches[0].pageY + 40);
            if (this.touchPos.sub(this.origin).mag() <= this.radius) this.ondrag = true;
            
            //console.log(e.touches);
            
            //console.log(this.touchPos, e.touches[0].pageX, e.touches[0].pageY, this.ondrag);
        })
        addEventListener('touchend', () => {
            this.ondrag = false;
            //this.touchPos = new Vector2(e.touches[0].pageX, e.touches[0].pageY);
            this.keys.splice(this.keys.indexOf('swipe up'), 1);
            this.keys.splice(this.keys.indexOf('swipe down'), 1);
            this.keys.splice(this.keys.indexOf('swipe left'), 1);
            this.keys.splice(this.keys.indexOf('swipe right'), 1);
        })
        addEventListener('touchmove', e => {
            
            this.touchPos = new Vector2(e.touches[0].pageX - 80, e.touches[0].pageY + 40);
            if (this.touchPos.sub(this.origin).mag() <= this.radius) this.ondrag = true;
            /*
            this.keys.splice(this.keys.indexOf('swipe up'), 1);
            this.keys.splice(this.keys.indexOf('swipe down'), 1);
            this.keys.splice(this.keys.indexOf('swipe left'), 1);
            this.keys.splice(this.keys.indexOf('swipe right'), 1);
            */
            //console.log(this.ondrag);
        })
    }
    resposition() {
        if (this.ondrag == false) {
            this.pos = this.pos.add(this.origin.sub(this.pos).mul(this.handleFriction));

        } else {
            const diff = this.touchPos.sub(this.origin);
            const maxDist = Math.min(diff.mag(), this.radius);
            this.pos = this.origin.add(diff.normalize().mul(maxDist));
            const directionX = diff.x
            const directionY = diff.y
            const distance = maxDist / 2;

            //console.log(maxDist, diff, directionX, directionY, distance);

            if (directionY < -distance) {
                if (this.keys.indexOf('swipe up') === -1) {
                    this.keys.push('swipe up');
                }    
            }
            else if (directionY > distance) {
                if (this.keys.indexOf('swipe down') === -1) {
                    this.keys.push('swipe down');    
                }
            }
            else if (directionX > -distance) {
                if (this.keys.indexOf('swipe right') === -1) {
                    this.keys.push('swipe right');    
                }
            }
            else if (directionX < distance) {
                if (this.keys.indexOf('swipe left') === -1) {
                    this.keys.push('swipe left');
                }
            }    
        }
        //console.log(this.keys);
    }

    
    draw(context) {
        function circle(pos, radius, color) {
            context.beginPath();
            context.fillStyle = color;
            context.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
        // Draw Joystick
        circle(this.origin, this.radius, 'rgba(0,0,128, 0.5)');
        // Draw Handle 
        circle(this.pos, this.handleRadius, '#3d3d3d');
    }
    update(deltaTime) {
        
        if (this.jostickTimer > this.jostickInterval) {
            
            this.resposition();
            
            this.jostickTimer = 0;
        } else {
            this.jostickTimer += deltaTime;
        }
    }
}
