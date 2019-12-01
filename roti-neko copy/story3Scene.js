class story3Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'story3Scene' });
    }

    preload() {
        this.load.image('story3','assets/story3.png');
    }

    create () {

        this.add.image(0, -81, 'story3').setOrigin(0, 0);

        this.add.text(0, 580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is story3Scene");

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto story4Scene");
        this.scene.stop("story3Scene");
        this.scene.start("story4Scene");
        }, this );

    }

}
