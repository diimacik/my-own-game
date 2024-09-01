import { Backgound } from "./backgrount.js";
import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { GroundEnemy, IceBoss, CoinBoss, Bird, IceLance} from "./enemies.js";
import { UI } from "./UI.js"
import { Cristal, Coins, Hearts } from "./things.js";
import { Joystick } from "./joystick.js";
import { btnPause, Btn1, Btn2, Btn3, BtnLeft, BtnRight, BtnSound, BtnLanguage, BtnScreen} from "./buttons.js";
import { UserDevice } from "./detector.js";
import { Menu1, Stack} from "./menu.js";
import { Achiev } from "./achieves.js";
import { Music } from "./sounds.js";
import { languageEn, languageUa, laguageDe, languageEs } from "./languages.js";


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
            this.maxSpeed = 10;
            this.languageId = 0;
            this.languageSet = [
                new languageEn(this),
                new languageUa(this),
                new laguageDe(this),
                new languageEs(this),
            ];
            this.languageId = 0;
            this.background = new Backgound(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.joystick = new Joystick(this, this.width * 0.16, this.height * 0.6, 75, 25);
            this.btnPause = new btnPause(this, this.width * 0.9, this.height * 0.1)
            this.btn1 = [
                new Btn1(this, this.width * 0.9 - 80, this.height * 0.3, 160, 50), 
                new Btn2(this, this.width * 0.9 - 80, this.height * 0.5, 160, 50), 
                new Btn3(this, this.width * 0.9 - 80, this.height * 0.7, 160, 50),
            ]
            this.menu1 = new Menu1(this);
            this.achievBtn = [
                new BtnLeft(this, 20, 230,  50, 250), 
                new BtnRight(this, this.menu1.width - 70, 230, 50, 250),
            ]
            this.settingBtn = [
                new BtnSound(this, 20, 20, 50, 50),
                new BtnLanguage(this, 120, 20, 200, 50),
                new BtnScreen(this, 20, 120, 50, 50),
            ]
            
            this.collisions = [];
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
            this.gamePuase = true;
            this.music = new Music(this);
            
            this.stack = new Stack(this, 20, 50, this.menu1.width - 40, this.height * 0.4);
            this.achiev = new Achiev(this);
            this.score = JSON.parse(localStorage.getItem('score')) || {
                coins:0,
                selles:[false, true, true, true],
                price:['free', 100, 200, 500],
                lives:10,
                energy:0,
                superPower:false,
                imageInd:0,
            }
            this.AchScore = JSON.parse(localStorage.getItem('AchScore')) || [
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
            ];
            //this.coins = this.score.coins;
            //this.lives = 10;
            
            this.kills = 0;
            this.energy = 0;
            this.bossPusher = false;
            
            this.userDev = new UserDevice(this);
            this.userDev.detector();
            
        }
        
        update(deltaTime) {
            this.music.update();
            if (this.score === undefined) {
                this.score = {
                    coins:0,
                    selles:[false, true, true, true],
                    price:['free', 100, 200, 500],
                    lives:10,
                    energy:0,
                    superPower:false,
                    imageInd:0,
                }
            }
            if (this.AchScore === undefined) {
                this.AchScore = [
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
            }
            if (!this.gamePuase) {
                //this.music.play = true;
                
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
                this.collisions.forEach(collision => {
                    collision.update(deltaTime);
                    this.music.enemyBoom();
                });
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
                this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
                this.particles = this.particles.filter(particle => !particle.markedForDeletion);
                this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
                this.things = this.things.filter(thing => !thing.markedForDeletion);
            }
            else if (this.gamePuase) {
                //this.music.play = false;
                //this.menu1.update(this.player, this.userDev.indexX, this.userDev.indexY, this.coins);
                this.stack.lisener(this.userDev.indexX, this.userDev.indexY);
                for (let i = 0; i < this.btn1.length; i++) {
                    this.btn1[i].lisener();
                }
                if (this.gamePuase && this.menu1.menuInd === 2) {
                    
                    this.achievBtn[0].lisener();
                    this.achievBtn[1].lisener();
                }
                if (this.gamePuase && this.menu1.menuInd === 3) {
                    this.settingBtn[0].lisener();
                    this.settingBtn[1].lisener();
                    this.settingBtn[2].lisener(canvas);

                }
            }  
        }

        draw(context) {
            
            
            this.background.draw(context);
            
            this.particles.forEach(particle => {
                particle.draw(context);
            })
            this.player.draw(context);
            this.things.forEach(thing => {
                thing.draw(context);
            })
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            })
            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.UI.draw(context);
            
            if (!this.userDev.leptop || this.debug) {
                this.joystick.draw(context);
            } //else {
            //    this.joystick.draw(context);
            //}
            

            this.things.forEach(thing => {
                thing.draw(context);
            });

            
            //this.menu1.stack.updateDraw(context);
            this.btnPause.draw(context);
            
            if (this.gamePuase) {
                this.menu1.draw(context);
                this.btn1[0].draw(context);
                this.btn1[1].draw(context);
                this.btn1[2].draw(context);
                
                if (this.menu1.menuInd === 1) {
                    this.stack.draw(context);
                }
                else if (this.menu1.menuInd === 2) {
                    this.achiev.draw(context);
                    this.achievBtn[0].draw(context);
                    this.achievBtn[1].draw(context);
                    //this.stack.draw(context);
                }
                else if (this.menu1.menuInd === 3) {
                    this.settingBtn[0].draw(context);
                    this.settingBtn[1].draw(context);
                    this.settingBtn[2].draw(context);

                }
            }
            
                
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
            if (Math.random() < 0.75) this.things.push(new Coins(this));
            else if (Math.random() > 0.75) this.things.push(new Cristal(this));
            else if (Math.random() > 0.97 && this.score.lives < 10) this.things.push(new Hearts(this));
            
        } 
        saveAll() {
            localStorage.setItem('score', JSON.stringify(this.score));

        }
        saveAchiev() {
            localStorage.setItem('AchScore', JSON.stringify(this.AchScore));
        }
        restartGame() {
            //this.player.restart();
            this.background.restart();
            this.score.lives = 10;
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
                this.stack.menuResponse = true;
                this.menu1.menuInd = 1;
                
            } else {
                this.gamePuase = false;
                this.stack.menuResponse = false;
                this.speed = 0;
                this.maxSpeed = 10;
            }
        }

    }
    
    

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    console.log(game.userDev.screenWidth, game.userDev.screenHeight, game.userDev.indexX, game.userDev.indexY);

    function animate(timeStapm) {
        const deltaTime = timeStapm - lastTime;
        lastTime = timeStapm;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime, canvas);
        game.draw(ctx);
        

        if (!game.gameOver) requestAnimationFrame(animate);
        


    }
    animate(0);

});