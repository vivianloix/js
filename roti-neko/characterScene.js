class  characterScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'characterScene' });
    }

    preload() {
        this.load.image('characters','assets/characters.png');

        this.load.spritesheet('fiji-blink', 'assets/fiji-blink.png', { frameWidth: 200, frameHeight: 200});
        this.load.spritesheet('violet-blink', 'assets/violet-blink.png', { frameWidth: 200, frameHeight: 200});
        this.load.spritesheet('tangy-blink', 'assets/tangy-blink.png', { frameWidth: 200, frameHeight: 200});

        //this.load.atlas('violet', 'assets/violet.png', 'assets/violet.json');

        this.load.audio('story_bgmusic','assets/audio/story.mp3');
        this.load.audio('select','assets/audio/select.mp3');
    }

    create () {

        this.selectSnd = this.sound.add('select');

        this.add.image(-20, 0, 'characters').setOrigin(0, 0);

        this.story_bgmusicSnd = this.sound.add('story_bgmusic');

        //this.add.text(0, 580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is characterScene");

        this.anims.create({
            key: 'fiji-blink',
            frames: this.anims.generateFrameNumbers('fiji-blink', { start: 9, end: 10 }),
            frameRate: 5,
            repeat: -1
        });


        this.anims.create({
            key: 'violet-blink',
            frames: this.anims.generateFrameNumbers('violet-blink', { start: 9, end: 10 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'tangy-blink',
            frames: this.anims.generateFrameNumbers('tangy-blink', { start: 9, end: 10 }),
            frameRate: 5,
            repeat: -1
        });

        this.fiji = this.add.group();
        this.violet = this.add.group();
        this.tangy = this.add.group();

        this.fiji.create(240, 240,'fiji-blink');
        this.violet.create(400, 240,'violet-blink');
        this.tangy.create(560, 240,'tangy-blink');

    //     this.anims.create({
    //     key: 'violetwalk',
    //     frames: this.anims.generateFrameNames('violet', {prefix: 'violet_', start: 10, end: 11, zeroPad: 2}),
    //     frameRate: 7,
    //     repeat: -1
    // });

        

        var key1 = this.input.keyboard.addKey(49);
        
        key1.on('down', function(data){

            this.story_bgmusicSnd.stop(); 
            this.fiji.create(241, 243,'fiji-blink').play('fiji-blink');
            this.selectSnd.play();

            this.time.delayedCall(1000,function(){
            this.scene.start("level1", {myPlayer : 'fiji'}); 
        },[], this);
        
        }, this );

        var key2 = this.input.keyboard.addKey(50);
        
        
        key2.on('down', function(data){

            this.story_bgmusicSnd.stop(); 
            this.violet.create(401.5, 244.7,'violet-blink').play('violet-blink');
            this.selectSnd.play();

            this.time.delayedCall(1000,function(){
            this.scene.start("level1", {myPlayer : 'violet'}); 
        },[], this);
        
        }, this );

        var key3 = this.input.keyboard.addKey(51);

        key3.on('down', function(data){

            this.story_bgmusicSnd.stop(); 
            this.tangy.create(562, 243,'tangy-blink').play('tangy-blink');
            this.selectSnd.play();

            this.time.delayedCall(1000,function(){
            this.scene.start("level1", {myPlayer : 'tangy'});
        },[], this);

        }, this );

    }

    // update () {
    //     if (this.scene.stop ("characterScene")) {
    //         this.story_bgmusicSnd.stop(); 

    //     }
    //}

}
