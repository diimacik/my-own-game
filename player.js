import { GoningRight, GoningLeft, JumpRight, JumpLeft, FallRight, FallLeft } from "./playerStates.js";
import { Ice } from "./particles.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 128;
        this.height = 128;
        this.playerImg0 = document.getElementById('player');
        this.playerImg1 = document.getElementById('player1');
        this.playerImg2 = document.getElementById('player2');
        this.playerImg3 = document.getElementById('player3');
        this.image = [
            this.playerImg0,
            this.playerImg1,
            this.playerImg2,
            this.playerImg3,
        ];
        //this.imageInd = 0;
        this.imagesMax = 3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.ground;
        this.minFrameX = 0;
        this.frameX = 0;
        this.maxFrameX = 5;
        this.fps = 10;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
        this.speed = 1;
        this.maxSpeed = 10;
        this.vy = 0;
        this.weight = 1;
        this.superPower = false;
        this.state = [new GoningRight(this.game), new GoningLeft(this.game), new JumpRight(this.game), new JumpLeft(this.game), new FallRight(this.game), new FallLeft(this.game)];
        this.curranetState = null;
        this.damageInterval = 150;
        this.damageTimer = 0;
        this.damage = false;
        //this.image[0];
    }
    update(input, joystick,  deltaTime) {
        this.checkCollision(deltaTime);
        this.pickUp();
        this.curranetState.hendlerInpu(input, joystick);
        this.x += this.speed;
        // horizontall movment
        if (input.includes('ArrowRight') || joystick.includes('swipe right')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft') || joystick.includes('swipe left')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        // horizontall boundaries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        //if (input.includes('ArrowUp') && this.onGround) this.y -= this.vy;
        // vertecall movment
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

        if (this.y > this.game.height  - this.height - this.game.ground) this.y = this.game.height - this.height - this.game.ground;
        if (this.frameTimer > this.frameInterval) {
            this.frameX++;
            if (this.frameX > this.maxFrameX) {
                this.frameX = this.minFrameX;
            }
            this.frameTimer = 0;
        } else this.frameTimer += deltaTime;
        if (this.game.score.superPower) {
            this.game.particles.unshift(new Ice(this.game, this.x + this.width * 0.5, this.y + this.height * 0.5));
        }
        if (this.damage) {
            if (this.damageTimer > this.damageInterval) {
                this.game.lives--;
                this.damage = false;
                this.damageTimer = 0;
            }
            else {
                this.damageTimer += deltaTime;
            }
        }
        
        
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
        context.arc(this.x + this.width / 3 + 20, this.y + this.height / 3 + 20, this.width / 3, 0, Math.PI * 2);
        context.stroke();
        }
        

        
        context.drawImage(this.image[this.game.score.imageInd], this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);

    }
    changeInd() {
        if (this.game.score.imageInd >= this.imagesMax) {
            this.game.score.imageInd = 0;
        }else this.game.score.imageInd++;
    }

        
    onGround() {
        return this.y >= this.game.height - this.height - this.game.ground;
    }
    setStates(state, speed) {
        this.curranetState = this.state[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.curranetState.enter();
    }
    restart() {
        this.x = 0;
        this.y = this.gameHeght - this.height - this.game.ground;
        this.maxFrameX = 5;
        this.minFrameX = 0;
    }
    checkCollision(deltaTime) {
        // collision enemies
        this.game.enemies.forEach(enemy => {
            const dx = (enemy.x + enemy.width / 2 + 20) - (this.x + this.width / 2 + 20);
            const dy = (enemy.y + enemy.height / 2 + 20) - (this.y + this.width / 2 + 20);
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < enemy.width / 2.5 + this.width / 3) {
                
                this.damage = true;
                if (!this.game.score.superPower && this.damage) {
                    if (this.damageTimer > this.damageInterval) {
                        this.game.score.lives--;
                        this.damage = false;
                        this.damageTimer = 0;
                    }
                    else {
                        this.damageTimer += deltaTime;
                    }
                }

                else if (this.game.score.superPower) {
                    this.damage = false;
                    enemy.lives--;
                     
                    this.game.bossPusher = true;
                    if (enemy.lives == 0) {
                        enemy.markedForDeletion = true;
                        this.game.kills++; 
                    }  
                    if (this.game.score.energy == 0) this.superPower = false;
                    else this.game.score.energy--;
                }
                if (this.game.score.lives == 0) {
                    this.game.gameOver = true;
                    }
            }
            
        });
    }
        
    
    pickUp() {
        this.game.things.forEach(thing => {
            const dx = (thing.x + thing.width / 2) - (this.x + this.width / 2);
            const dy = (thing.y + thing.height / 2) - (this.y + this.width / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < thing.width / 2.5 + this.width / 3) {
                thing.markedForDeletion = true;
                thing.getEfact();

            }
        });
    }
}