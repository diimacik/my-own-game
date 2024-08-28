export class Music {
    constructor(game) {
        this.game = game;
        this.gameMusic = new Audio('sounds/game-musuc.mp3');
        this.boomMusic =  new Audio('sounds/boom.wav');
        this.damageMusic = new Audio('sounds/damage.mp3');
        this.btnSound = new Audio('sounds/click-button-166324.mp3');
        this.energySound = new Audio('sounds/sci-fi-charge-up-37395.mp3');
        this.coinsSound = new Audio('sounds/pick-up-or-found-it-secret-item-104874.mp3');
        this.heartSound = new Audio('sounds/take-it-90781.mp3');
        this.play = false;
        this.boomPlay = false;
    }
    update() {
    
        if (this.play) {
            this.gameMusic.volume = 0.3;
            this.gameMusic.play();
        } else {
            this.gameMusic.pause();
        }    
    }
    damagePlay() {
        if (this.play) {
            this.damageMusic.currentTime = 0;
            this.damageMusic.play();
        }
        
    }

    enemyBoom() {
        if (this.play) {
            //this.boomMusic.currentTime = 0;
            this.boomMusic.play();
        }
        
    }
    pressBtnSound() {
        if (this.play) {
            this.btnSound.currentTime = 0;
            this.btnSound.play();
        }
    }
    energyPlay() {
        if (this.play) {
            this.energySound.currentTime = 0;
            this.energySound.play();
        }
    }
    coinsPlay() {
        if (this.play) {
            this.coinsSound.currentTime = 0;
            this.coinsSound.play();
        }
    }
    heartPlay() {
        if (this.play) {
            this.heartSound.currentTime = 0;
            this.heartSound.play();
        }
    }
}