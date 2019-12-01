class introScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'introScene' });
    }

    preload() {
        this.load.image('intro','assets/intro.png');
    }

    create () {

        this.add.image(0, 0, 'intro').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto introScene");
        this.scene.stop("introScene");
        this.scene.start("characterScene");
        }, this );

    }

}
