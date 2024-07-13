
class Layer {
    constructor(game, width, height, speadModifier, image) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.speadModifier = speadModifier;
        this.width = width;
        this.height = height;
        this.image = image;
    }
    update() {
        this.x -= this.speadModifier;
        if (this.x < -this.width) {
            this.x = 0;
        }
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, 0, this.width, this.height);
    }
}
export class Backgound {
    constructor(game) {
        this.game = game;
        this.width = 4900;
        this.height = 500;
        this.layerImage1 = document.getElementById('ice-background');
        this.layerImage2 = document.getElementById('ice-picks');
        this.layerImage3 = document.getElementById('clouds');
        this.layerImage4 = document.getElementById('ocean');
        this.layerImage5 = document.getElementById('ice');

        this.layer1 = new Layer(this.game, this.width, this.height, 1, this.layerImage1);
        this.layer2 = new Layer(this.game, this.width, this.height, 0.7, this.layerImage2);
        this.layer3 = new Layer(this.game, this.width, this.height, 0.3, this.layerImage3);
        this.layer4 = new Layer(this.game, this.width, this.height, 0.5, this.layerImage4);
        this.layer5 = new Layer(this.game, this.width, this.height, 4, this.layerImage5);

        this.backgroundLayers = [this.layer4, this.layer3, this.layer2, this.layer1, this.layer5];

    }
    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update();
        });

        
    }
    draw(context) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        })
    }
}
