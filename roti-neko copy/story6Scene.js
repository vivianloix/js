class story6Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'story6Scene' });
    }

    preload() {
        this.load.image('story6','assets/story6.png');
    }

    create () {

        this.add.image(0, 0, 'story6').setOrigin(0, 0);

        this.add.text(0, 580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is story6Scene");

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto story7Scene");
        this.scene.stop("story6Scene");
        this.scene.start("story7Scene");
        }, this );

    }

}
