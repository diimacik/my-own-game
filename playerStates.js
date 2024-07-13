const states = {
    GOINGRIGHT: 0,
    GOINGLEFT: 1,
    JUMPRIGHT: 2,
    JUMPLEFT: 3,
    FALLRIGHT: 4,
    FALLLEFT: 5,
};

class State {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}

export class GoningRight extends State {
    constructor(game) {
        super('GOINGRIGHT', game);
    }
    enter() {
        this.game.player.minFrameX = 0;
        this.game.player.frameX = 0;
        this.game.player.maxFrameX = 5;
    }
    hendlerInpu(input) {
        if (input.includes('ArrowLeft') || input.includes('swipe left')) {
            this.game.player.setStates(states.GOINGLEFT, 1);
        } else if (input.includes('ArrowUp') || input.includes('swipe up')) {
            this.game.player.setStates(states.JUMPRIGHT, 1);
        }
    }
}

export class GoningLeft extends State {
    constructor(game) {
        super('GOINGLEFT', game);
    }
    enter() {
        this.game.player.minFrameX = 6;
        this.game.player.frameX = 6;
        this.game.player.maxFrameX = 11;
    }
    hendlerInpu(input) {
        if (input.includes('ArrowRight') || input.includes('swipe right')) {
            this.game.player.setStates(states.GOINGRIGHT, 1);
        } else if (input.includes('ArrowUp') || input.includes('swipe up')) {
            this.game.player.setStates(states.JUMPLEFT, 1);
        }
    }
}

export class JumpRight extends State {
    constructor(game) {
        super('JUMPRIGHT', game);
    }
    enter() {
        if (this.game.player.onGround()) {
            this.game.player.vy -= 22;
        }
        this.game.player.minFrameX = 12;
        this.game.player.frameX = 12;
        this.game.player.maxFrameX = 16;
    }
    hendlerInpu(input) {
        if (input.includes('ArrowLeft') || input.includes('swipe left')) {
            this.game.player.setStates(states.JUMPLEFT, 1);
        }
        if (this.game.player.vy > this.game.player.weight) {
            this.game.player.setStates(states.FALLRIGHT, 1);
        }
    }
}

export class JumpLeft extends State {
    constructor(game) {
        super('JUMPLEFT', game);
    }
    enter() {
        if (this.game.player.onGround()) {
            this.game.player.vy -= 22;
        }
        this.game.player.minFrameX = 19;
        this.game.player.frameX = 19;
        this.game.player.maxFrameX = 25;
    }
    hendlerInpu(input) {
        if (input.includes('ArrowRight') || input.includes('swipe right')) {
            this.game.player.setStates(states.JUMPRIGHT, 1);
        }
        if (this.game.player.vy > this.game.player.weight) {
            this.game.player.setStates(states.FALLLEFT, 1);
        }
    }
}

export class FallRight extends State {
    constructor(game) {
        super('FALLRIGHT', game);
    }
    enter() {
        this.game.player.minFrameX = 26;
        this.game.player.frameX = 26;
        this.game.player.maxFrameX = 32;
    }
    hendlerInpu(input) {
        if (input.includes('ArrowLeft') || input.includes('swipe left')) {
            this.game.player.setStates(states.FALLLEFT, 1);
        }
        if (this.game.player.onGround()) {
            this.game.player.setStates(states.GOINGRIGHT, 1);
        }
    }
}

export class FallLeft extends State {
    constructor(game) {
        super('FALLLEFT', game);
    }
    enter() {
        this.game.player.minFrameX = 33;
        this.game.player.frameX = 33;
        this.game.player.maxFrameX = 39;
    }
    hendlerInpu(input) {
        if (input.includes('ArrowRight') || input.includes('swipe right')) {
            this.game.player.setStates(states.FALLRIGHT, 1);
        }
        if (this.game.player.onGround()) {
            this.game.player.setStates(states.GOINGLEFT, 1);
        }
    }    
}