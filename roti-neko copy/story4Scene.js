class story4Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'story4Scene' });
    }

    preload() {
        this.load.image('story4','assets/story4.png');
    }

    create () {

        this.add.image(0, 0, 'story4').setOrigin(0, 0);

        this.add.text(0, 580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is story4Scene");

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto story4Scene");
        this.scene.stop("story4Scene");
        this.scene.start("story5Scene");
        }, this );

    }

}
