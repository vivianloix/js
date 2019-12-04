class endScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'endScene' });
    }

    preload() {
        this.load.image('end','assets/endScene.png');

        this.load.audio('endmusic','assets/audio/end.mp3');
    }

    create () {

        this.add.image(0, 0, 'end').setOrigin(0, 0);

        this.endmusic_Snd = this.sound.add('endmusic');
        this.endmusic_Snd.play();
        

        console.log("This is endScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');

        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, reply game");
        this.scene.stop("endScene");
        this.scene.start("mainScene");
        }, this );

    }

}
