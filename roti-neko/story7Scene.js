class story7Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'story7Scene' });
    }

    preload() {
        this.load.image('story7','assets/story7.png');
    }

    create () {

        this.add.image(0, 0, 'story7').setOrigin(0, 0);

        this.add.text(0, 580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is story6Scene");

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto introScene");
        this.scene.stop("story7Scene");
        this.scene.start("introScene");
        }, this );

    }

}
