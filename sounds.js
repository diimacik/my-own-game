export class Music {
    constructor(game) {
        this.game = game;
        this.gameMusic = new Audio('sounds/game-musuc.mp3');
        this.runMusic = [
            new Audio('sound/boom.wav'),
            new Audio('sound/sfx_sounds_damage3.wav'),
        ];
        this.play = false;
    }
    update() {
    
        if (this.play) {
            this.gameMusic.play();
        } else {
            this.gameMusic.pause();
        }
        
        
        
    }
}