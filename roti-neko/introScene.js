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

        this.add.text(0, 580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is introScene");

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto introScene");
        this.scene.stop("introScene");
        this.scene.start("level1");
        }, this );

    }

}
