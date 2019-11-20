class gameoverScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'gameoverScene' });
    }

    preload() {
        this.load.image('gameover','assets/gameover.png');

    }

    create () {

        this.add.image(0, -50, 'gameover').setOrigin(0, 0);

        this.add.text(270,390, 'Hit Spacebar to Replay', { font: '21px Courier', fill: '#221C48' });
        this.add.text(300,410, 'Hit "Q" to Quit', { font: '21px Courier', fill: '#221C48' });

        console.log("This is gameoverScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        var qDown = this.input.keyboard.addKey('Q');

        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, reply game");
        this.scene.stop("gameoverScene");
        this.scene.start("level1");
        }, this );

        qDown.on('down', function(){
            console.log("Q pressed (main menu)");
            this.scene.stop("gameoverScene");
            this.scene.start("mainScene");
            }, this );

    }

}
