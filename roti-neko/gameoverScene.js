class gameoverScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'gameoverScene' });
    }

    init(data){
        this.currentLevel = data.currentLevel;
    }

    preload() {
        this.load.image('gameover','assets/gameover.png');

        this.load.audio('gameover_music','assets/audio/gameover.mp3');

    }

    create () {

        this.gameoverSnd = this.sound.add('gameover_music');
        this.gameoverSnd.play();

        this.add.image(0, -50, 'gameover').setOrigin(0, 0);

        this.add.text(270,390, 'Hit Spacebar to Replay', { font: '21px Courier', fill: '#221C48' });
        this.add.text(300,410, 'Hit "Q" to Quit', { font: '21px Courier', fill: '#221C48' });

        console.log("This is gameoverScene");
        console.log(this.currentLevel)

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        var qDown = this.input.keyboard.addKey('Q');

        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, replay game");
        this.scene.stop("gameoverScene");

            if (this.currentLevel == 1) {
            this.scene.start("level1");
            }

            else if (this.currentLevel == 2) {
            this.scene.start("level2");
            }

            else if (this.currentLevel == 3) {
                this.scene.start("level3");
                }
        }, this );

        qDown.on('down', function(){
            console.log("Q pressed (main menu)");
            this.scene.stop("gameoverScene");
            this.scene.start("mainScene");
            }, this );

    }

}
