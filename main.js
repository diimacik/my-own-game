import { Backgound } from "./backgrount.js";
import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { GroundEnemy, IceBoss, CoinBoss, Bird, IceLance} from "./enemies.js";
import { UI } from "./UI.js"
import { Cristal, Coins } from "./things.js";
import { Joystick } from "./joystick.js";
import { btnPause } from "./buttons.js";

window.addEventListener('load', function() {
    const canvas = this.document.getElementById('canvas1');
    canvas.width = 900;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    const fullScreenButton =  this.document.getElementById('fullScreen')

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.ground = 55;
            this.speed = 0;
            this.maxSpeed = 4;
            this.background = new Backgound(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.joystick = new Joystick(this, 80, this.height / 2 + 80 / 2, 75, 25);
            this.btnPause = new btnPause(this, this.width - 50, 50)
            this.enemies = [];
            this.things = [];
            this.particles = [];
            this.maxParticles = 50;
            this.thingsTimer = 0;
            this.thingsInterval = 1000;
            this.enemyTimer = 0;
            this.enemyInterval = 3000;
            this.player.curranetState = this.player.state[0];
            this.player.curranetState.enter();
            this.debug = false;
            this.gameOver = false;
            this.gamePuase = false;
            this.lives = 10;
            this.coins = 0;
            this.kills = 0;
            this.energy = 0;
            this.bossPusher = false;
        }
        update(deltaTime) {
            this.background.update(deltaTime);
            this.player.update(this.input.keys, this.joystick.keys, deltaTime, this.enemies, this.things);
            this.joystick.update(deltaTime);
            this.joystick.listener();
            
            // handle enemies
            if (this.enemyTimer > this.enemyInterval && !this.gamePuase) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if (!this.bossPusher) {

                }
                if (enemy.markedForDeletion) {
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                }
            })
            // handle things
            if (this.thingsTimer> this.thingsInterval && !this.gamePuase) {
                this.addThins();
                this.thingsTimer = 0;
            } else {
                this.thingsTimer += deltaTime;
            }
            this.things.forEach(thing => {
                thing.update(deltaTime);
                if (thing.markedForDeletion) this.things.splice(this.things.indexOf(thing), 1);
            });
            // handle particles
            this.particles.forEach(particle => {
                particle.update();
            });
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.things = this.things.filter(thing => !thing.markedForDeletion);

        }
        draw(context) {
            
            this.background.draw(context);
            
            this.particles.forEach(particle => {
                particle.draw(context);
            })
            this.player.draw(context);
            
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            })
            this.UI.draw(context);
            this.btnPause.draw(context);
            this.joystick.draw(context);
            this.things.forEach(thing => {
                thing.draw(context);
            });
            
        }
        addEnemy() {
            if (this.kills >= 50 && Number.isInteger(this.kills / 50) && this.bossPusher) {    
                this.enemies.push(new IceBoss(this));
                this.bossPusher = false;
                
            } 
            else if (this.coins >= 50 && Number.isInteger(this.coins / 50) && this.bossPusher) {
                this.enemies.push(new CoinBoss(this));
                this.bossPusher = false;
            }
            else if (this.speed > 0 && Math.random() < 0.5) {
                this.enemies.push(new IceLance(this));
            }
            else if (Math.random() < 0.5){
                this.enemies.push(new GroundEnemy(this));
            } else {
                this.enemies.push(new Bird(this));
            }
            
            
        }
        addThins() {
            if (Math.random() < 0.9) this.things.push(new Coins(this));
            else this.things.push(new Cristal(this));
        } 
        restartGame() {
            //this.player.restart();
            this.background.restart();
            this.lives = 10;
            this.energy = 0;
            this.kills = 0;
            this.coins = 0;
            this.gameOver = false;
            this.enemies = [];
            animate(0);

        }
        setPause() {
            if (!this.gamePuase) {
                this.gamePuase = true;
            } else {
                this.gamePuase = false;
                animate(0);
            }
        }
    }

    function toggleFullScreen(){
        console.log(document.fullscreenElement);
        if (!document.fullscreenElement) {
            canvas.requestFullscreen().catch(err => {
                alert(`Error, can't enable full-screen mode: ${err.message}`);
            });
        }else {
            document.exitFullscreen();
        }
    }
    fullScreenButton.addEventListener('click', toggleFullScreen)

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;

    function animate(timeStapm) {
        const deltaTime = timeStapm - lastTime;
        lastTime = timeStapm;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        
        if (!game.gameOver && !game.gamePuase) requestAnimationFrame(animate);

    }
    animate(0);

});