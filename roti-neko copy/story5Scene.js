class story5Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'story5Scene' });
    }

    preload() {
        this.load.image('story5','assets/story5.png');
    }

    create () {

        this.add.image(0, 0, 'story5').setOrigin(0, 0);

        this.add.text(0, 580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is story5Scene");

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto story6Scene");
        this.scene.stop("story5Scene");
        this.scene.start("story6Scene");
        }, this );

    }

}
