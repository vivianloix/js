class mainScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'mainScene' });
    }

    preload() {
        this.load.image('main','assets/mainScene.png');

        this.load.tilemapTiledJSON('map1', 'assets/mountain.json');
    
        this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 64, frameHeight: 64});

        this.load.atlas('fiji', 'assets/fiji.png', 'assets/fiji.json');
        this.load.atlas('violet', 'assets/violet.png', 'assets/violet.json');
        this.load.atlas('tangy', 'assets/tangy.png', 'assets/tangy.json');

        this.load.image('weed', 'assets/enemy_01.png');
        this.load.image('rock', 'assets/enemy_02.png');
        this.load.image('crab', 'assets/enemy_03.png');
        this.load.image('seagull', 'assets/enemy_04.png');
        this.load.image('poop', 'assets/enemy_05.png');
        this.load.image('rat', 'assets/enemy_06.png');
        this.load.image('raindrops', 'assets/enemy_07.png');

        this.load.image('snack3', 'assets/snack_03.png');
        this.load.image('snack4', 'assets/snack_04.png');
        this.load.image('snack1', 'assets/snack_01.png');
        this.load.image('snack2', 'assets/snack_02.png');
        this.load.image('snack2', 'assets/snack_02.png');
        this.load.image('snack4', 'assets/snack_04.png');

        this.load.image('snack3drop', 'assets/snack_03.png');
        this.load.image('snack4drop', 'assets/snack_04.png');
        this.load.image('snack1drop', 'assets/snack_01.png');
        this.load.image('snack2drop', 'assets/snack_02.png');
        this.load.image('snack5drop', 'assets/snack_02.png');
        this.load.image('snack6drop', 'assets/snack_04.png');

        this.load.image('lvl1_totem1', 'assets/totem-1.png');
        this.load.image('lvl1_totem2', 'assets/totem-2.png');
        this.load.image('lvl1_totem3', 'assets/totem-3.png');

        this.load.image('lvl1-bg_b','assets/lvl1-bg_b.png');
        this.load.image('lvl1-bg_f','assets/lvl1-bg_f.png');
        this.load.image('lvl2-bg_b','assets/lvl2-bg_b.png');
        this.load.image('lvl2-bg_f1','assets/lvl2-bg_f1.png');
        this.load.image('lvl2-bg_f2','assets/lvl2-bg_f2.png');
        this.load.image('lvl3-bg_b','assets/lvl3-bg_b.png');
        this.load.image('lvl3-bg_f1','assets/lvl3-bg_f1.png');
        this.load.image('lvl3-bg_f','assets/lvl3-bg_f.png');
        this.load.image('lvl3-bg_f2','assets/lvl3-bg_f2.png');

        this.load.audio('jump','assets/audio/jump.mp3');
        this.load.audio('collect','assets/audio/collect.mp3');
        this.load.audio('lvl1_bgmusic','assets/audio/lvl1.mp3');
        this.load.audio('lvl1_drop','assets/audio/drop2.mp3');
        this.load.audio('lvl2_bgmusic','assets/audio/lvl2.mp3');
        this.load.audio('lvl3_bgmusic','assets/audio/lvl3.mp3');
        this.load.audio('endmusic','assets/audio/end.mp3');
        this.load.audio('gameover_music','assets/audio/gameover.mp3');
    
        this.load.image('invisible','assets/invisible-thingy.png');

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

