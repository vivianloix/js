class mainScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'mainScene' });
    }

    preload() {
        this.load.image('main','assets/mainScene.png');

        //this.load.audio('main_bgmusic','assets/audio/mainscene2.mp3');

    }

    create () {

        this.add.image(0, -50, 'main').setOrigin(0, 0);
        
        this.add.text(270,390, 'Hit Spacebar to Start', { font: '21px Courier', fill: '#221C48' });

        // this.bgmusicSnd = this.sound.add('main_bgmusic');
        // this.bgmusicSnd.play(); 

        console.log("This is mainScene");
        
        //spacebar
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto storyScene");
        //this.bgmusicSnd.stop(); 
        this.scene.stop("mainScene");
        this.scene.start("storyScene");
        }, this );

        //number key
        var key1 = this.input.keyboard.addKey(49);

        key1.on('down', function(data){
            //this.bgmusicSnd.stop();
            this.scene.start("level1", {myPlayer : 'fiji'});
        }, this );

        var key2 = this.input.keyboard.addKey(50);

        key2.on('down', function(data){
            //this.bgmusicSnd.stop();
            this.scene.start("level2", {myPlayer : 'fiji'});
        }, this );

        var key3 = this.input.keyboard.addKey(51);

        key3.on('down', function(data){
            //this.bgmusicSnd.stop();
            this.scene.start("level3", {myPlayer : 'fiji'});
        }, this );

        var key4 = this.input.keyboard.addKey(52);

        key4.on('down', function(){
            //this.scene.start("gameoverScene");
        }, this );

    
    }
}

