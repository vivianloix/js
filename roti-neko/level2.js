// static enemies
class level2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level2' });
        this.snackCount = 0;

    }

    init(data){
        this.myPlayer = data.myPlayer;
      }

preload() {

    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map2', 'assets/sandy3.json');
    
    this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 64, frameHeight: 64});

    //this.load.image('goldCoin', 'assets/goldCoin.png');
    
    //player
    this.load.atlas('fiji', 'assets/fiji.png', 'assets/fiji.json');
    this.load.atlas('violet', 'assets/violet.png', 'assets/violet.json');
    this.load.atlas('tangy', 'assets/tangy.png', 'assets/tangy.json');

    //enemy
    this.load.image('crab', 'assets/enemy_03.png');
    this.load.image('seagull', 'assets/enemy_04.png');
    this.load.image('poop', 'assets/enemy_05.png');

    //totem
    this.load.image('lvl2_totem1', 'assets/totem-1.png');
    this.load.image('lvl2_totem2', 'assets/totem-2.png');
    this.load.image('lvl2_totem3', 'assets/totem-3.png');

    //bg
    this.load.image('lvl2-bg_b','assets/lvl2-bg_b.png');
    this.load.image('lvl2-bg_f1','assets/lvl2-bg_f1.png');
    this.load.image('lvl2-bg_f2','assets/lvl2-bg_f2.png');

    //snacks
    this.load.image('snack1', 'assets/snack_01.png');
    this.load.image('snack2', 'assets/snack_02.png');

    this.load.image('snack1drop', 'assets/snack_01.png');
    this.load.image('snack2drop', 'assets/snack_02.png');

    //mp3
    this.load.audio('jump','assets/audio/jump.mp3');
    this.load.audio('collect','assets/audio/collect.mp3');
    this.load.audio('lvl2_bgmusic','assets/audio/lvl2.mp3');
    this.load.audio('lvl2_drop','assets/audio/drop2.mp3');

    //invisible thingy
    this.load.image('invisible','assets/invisible-thingy.png');

}

create() {


    this.map = this.make.tilemap({key: 'map2'});

    this.jumpSnd = this.sound.add('jump');
    this.collectSnd = this.sound.add('collect');

    this.lvl2_dropSnd = this.sound.add('lvl2_drop');
    this.lvl2_bgmusicSnd = this.sound.add('lvl2_bgmusic');

    this.lvl2_bgmusicSnd.play();

    this.lvl2_bgmusicSnd.loop = true;

    this.lvl2_bg_b=this.add.tileSprite(0 , 0, game.config.width, game.config.height, 'lvl2-bg_b');
    this.lvl2_bg_b.setOrigin(0,0);
    this.lvl2_bg_b.setScrollFactor(0);

    this.lvl2_bg_f1=this.add.tileSprite(0 , -40, game.config.width, game.config.height, 'lvl2-bg_f1');
    this.lvl2_bg_f1.setOrigin(0,0);
    this.lvl2_bg_f1.setScrollFactor(0);

    this.lvl2_bg_f2=this.add.tileSprite(0 , 0, game.config.width, game.config.height, 'lvl2-bg_f2');
    this.lvl2_bg_f2.setOrigin(0,0);
    this.lvl2_bg_f2.setScrollFactor(0);
    
    // Must match tileSets name
   // var coinTiles = map.addTilesetImage('goldCoin');

    // Must match tileSets name
    this.tiles = this.map.addTilesetImage('tiles','tiles');

    // create the ground layer
    this.groundLayer = this.map.createDynamicLayer('groundLayer', this.tiles, 0, 0);

    // Set starting and ending position using name
    //this.startPoint = this.map.findObject("objectLayer", obj => obj.name === "startPoint");
    this.endPoint = this.map.findObject("objectLayer", obj => obj.name === "endPoint");

    console.log('endPoint', this.endPoint.x, this.endPoint.y);
    
    // add coins as tiles
    //coinLayer = map.createDynamicLayer('coinLayer', coinTiles, 0, 0);

    // create the player sprite    
    this.player = this.physics.add.sprite(200, 200, this.myPlayer);
    this.player.setBounce(0.1); // our this.player will bounce from items
    
    // small fix to our this.player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width*.5, this.player.height*.7);
    this.player.setCollideWorldBounds(true); // don't go out of the map  

    // Set this.player to starting position
    this.player.setPosition(70, 70);  

    //console.log('violet', this.player.x, this.player.y);

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // the this.player will collide with this layer
    this.groundLayer.setCollisionByProperty({ sand: true });
    
    this.physics.add.collider(this.groundLayer, this.player);

    

     // enemy
     this.crab = this.physics.add.group({
        key: 'crab',
        repeat: 10,
        setXY: { x: 350, y: 0, stepX: 500 }
        
    });

    this.snacks1 = this.physics.add.group({
        key:'snack1',
        repeat:9,
        setXY: { x:200, y:0, stepX: Phaser.Math.Between(200, 200) }
        });
    this.physics.add.collider(this.groundLayer, this.snacks1);

    this.snacks2 = this.physics.add.group({
        key:'snack2',
        repeat:4,
        setXY: { x:600, y:0, stepX:500}
        });
    
    this.physics.add.collider(this.groundLayer, this.snacks2);

    this.seagull = this.add.group({
        key: 'seagull',
        repeat: 10,
        setXY: { x: 350, y: 50, stepX: 800 },
    });

    // this.poopy = this.physics.add.group({
    //     key: 'poop',
    //     repeat: 10,
    //     setXY: { x: 348, y: 50, stepX: 800 },

    // });

    this.poopy = this.physics.add.group({defaultKey: 'poop'})

    this.snacks1Drop = this.physics.add.group({
        key:'snack1drop',
        // repeat:10,
        setXY: { x:3100, y:-50 }
        });

        this.physics.add.collider(this.groundLayer, this.snacks1Drop);

    this.snacks2Drop = this.physics.add.group({
        key:'snack2drop',
        // repeat:10,
        setXY: { x:3100, y:-100 }
        });

        this.physics.add.collider(this.groundLayer, this.snacks2Drop);

        this.invisibleguy = this.physics.add.group({
            key:'invisible',
            //repeat:5,
            setXY: { x:2900, y:0 }
            });
        
            this.physics.add.collider(this.groundLayer, this.invisibleguy);
            this.physics.add.overlap(this.player, this.invisibleguy, this.hitInvisi, null, this );

    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.moveLeft, callbackScope: this, loop: true });
    this.timedEvent2 = this.time.addEvent({ delay: 2000, callback: this.moveRight, callbackScope: this, loop: true }); 
    this.timedEvent3 = this.time.addEvent({ delay: 2500, callback: this.dropPoop, callbackScope: this, loop: true });

    // Collide platform with enemy
    this.physics.add.collider(this.groundLayer, this.crab);
    //this.physics.add.collider(this.groundLayer, this.poop);

    //this.physics.add.overlap(this.stars, this.bombs, this.removeBombs, null, this );
    this.physics.add.overlap(this.player, this.snacks1, this.collectsnack1, null, this );
    this.physics.add.overlap(this.player, this.snacks2, this.collectsnack2, null, this );
    this.physics.add.overlap(this.player, this.crab, this.hitCrab, null, this );
    this.physics.add.overlap(this.player, this.poopy, this.hitPoop, null, this );

    this.add.text(20,20, 'Beach Day', { font: '21px Courier', fill: '#221C48' }).setScrollFactor(0);
    this.add.text(150,20, '11:36 AM', { font: '21px Courier', fill: '#221C48' }).setScrollFactor(0);

    // this text will show the score
    this.snackText = this.add.text(20, 50, '0'+'/10', {
        fontSize: '30px',
        fill: '#221C48'
    });
    // fix the text to the camera
    this.snackText.setScrollFactor(0);
    this.snackText.visible = true;

    this.add.image(3000, 220,'lvl2_totem1').setOrigin(0,0);

    //player
    this.anims.create({
        key: this.myPlayer,
        frames: [{key: this.myPlayer, frame: this.myPlayer+'_01'}],
        frameRate: 10,
    });

    // Create the walking animation with prefix of fiji
    this.anims.create({
        key: this.myPlayer+'walk',
        frames: this.anims.generateFrameNames(this.myPlayer, {prefix: this.myPlayer+'_', start: 2, end: 9, zeroPad: 2}),
        frameRate: 7,
        repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey('SPACE');

  // set bounds so the camera won't go outside the game world
  this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
  // make the camera follow the this.player
  this.cameras.main.startFollow(this.player);

  // set background color, so the sky is not black    
  this.cameras.main.setBackgroundColor('#ccccff');

}

collectsnack1(player, snacks1) {
    snacks1.disableBody(true, true);
    this.snackCount += 1; // add 10 points to the score
    console.log(this.snackCount);
    this.snackText.setText(this.snackCount+'/10'); // set the text to show the current score
    this.collectSnd.play();
    return false;
}

collectsnack2(player, snacks2) {
    snacks2.disableBody(true, true);
    this.snackCount += 1; // add 10 points to the score
    console.log(this.snackCount);
    this.snackText.setText(this.snackCount+'/10'); // set the text to show the current score
    this.collectSnd.play();
    return false;
}

hitCrab(player,crab) {
    //bombs.disableBody(true, true);
    console.log('Hit crab');
    this.cameras.main.shake(20);
    this.lvl2_dropSnd.play();
    this.player.x -= this.player.width;
    this.snackCount -= 1;
    this.snackText.setText(this.snackCount+'/10');

    if (this.snackCount < 0) {
        this.snackCount = 0;
        this.lvl2_bgmusicSnd.stop();
        this.lvl2_bgmusicSnd.loop = false;
        this.scene.start("gameoverScene",  {currentLevel : 2});
    }
}

hitPoop(player,poopy) {
    //bombs.disableBody(true, true);
    console.log('Hit poop');
    this.cameras.main.shake(20);
    this.lvl2_dropSnd.play();
    this.snackCount -= 1;
    this.snackText.setText(this.snackCount+'/10');
    poopy.disableBody(true, true);

    if (this.snackCount < 0) {
        this.snackCount = 0;
        this.lvl2_bgmusicSnd.stop();
        this.lvl2_bgmusicSnd.loop = false;
        this.scene.start("gameoverScene",  {currentLevel : 2});
    }
    
}

moveLeft(crab) {
    this.tweens.add({
        targets: this.crab.getChildren().map(function (c) { return c.body.velocity }),
        x: Phaser.Math.Between(-50, -100) ,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: false
    });
}

moveRight(crab) {
    this.tweens.add({
        targets: this.crab.getChildren().map(function (c) { return c.body.velocity }),
        x:  Phaser.Math.Between(50, 100),
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: false
    });
}

dropPoop() {
	// Add random bombs
    console.log('Dropping poop');
    this.poopy.createMultiple({
        key: 'poop',
        repeat: 10,
        setXY: { x: 348, y: 52, stepX: 800 }
    });
    // this.poopy = this.physics.add.group({
    // key: 'poop',
    // repeat: 10,
	// setVelocityY: 5,
	// //SetAllowGravity:true,
    // setXY: { x: 348, y: 52, stepX: 800 }
    // });
}

hitInvisi(player,invisibleguy) {
    //this.player.x = this.player.width;
    // this.snackText.setText(this.snackCount+'/5');
    //bombs.disableBody(true, true);
    console.log('Hit invisi');
    invisibleguy.disableBody(true, true);

    

    if ( this.snackCount >= 10 ) {
        this.timedEvent = this.time.addEvent({ delay: 500, callback: this.dropSnack3, callbackScope: this, loop: true });
        this.timedEvent2 = this.time.addEvent({ delay: 500, callback: this.dropSnack4, callbackScope: this, loop: true });
    }
}

dropSnack3() {
    // Add random bombs
    console.log('Dropping snacks');
    this.snacks1Drop.createMultiple({
        key: 'snack1drop',
        repeat: 2,
        setXY: { x: 3100, y: -370, stepY:130 }
    })
}

dropSnack4() {
    // Add random bombs
    console.log('Dropping snacks');
    this.snacks2Drop.createMultiple({
        key: 'snack2drop',
        repeat: 2,
        setXY: { x: 3100, y: -330, stepY:130 }
    })
}

removeSnacks(groundLayer,snacks1Drop) {
    console.log('Hit ground');
    snacks1Drop.disableBody(true, true);

    return false;
}

update() {

    if (this.cursors.left.isDown)
    {
        this.player.body.setVelocityX(-170);
        // this.player.anims.play('fijiwalk', true); // walk left
        // this.player.anims.play('violetwalk', true);
        this.player.anims.play(this.myPlayer+'walk', true);
        this.player.flipX = true; // flip the sprite to the left
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.setVelocityX(170);
        //this.player.body.setVelocityX(400);
        this.player.anims.play(this.myPlayer+'walk', true);
        this.player.flipX = false; // use the original sprite looking to the right
    } else {
        this.player.body.setVelocityX(0);
        this.player.anims.play(this.myPlayer, true);
    }
    // jump 
    if (this.space.isDown && this.player.body.onFloor())
    {
        this.player.body.setVelocityY(-280);     
        this.jumpSnd.play();   
    }

    //bg
    this.lvl2_bg_b.tilePositionX=this.cameras.main.scrollX*.1;
    this.lvl2_bg_b.tilePositionX=this.cameras.main.scrollX*.2;

    this.lvl2_bg_f1.tilePositionX=this.cameras.main.scrollX*.1;
    this.lvl2_bg_f1.tilePositionX=this.cameras.main.scrollX*.5;

    this.lvl2_bg_f2.tilePositionX=this.cameras.main.scrollX*.7;
    this.lvl2_bg_f2.tilePositionX=this.cameras.main.scrollX*.2;

    //console.log('Current this.player pos ', this.player.x, this.player.y);

    // Check for reaching endPoint object
    // if ( this.snackCount > 3 ) {
    //     //console.log('Reached End, goto level3');
    //     //this.cameras.main.shake(500);
    //     this.time.delayedCall(1000,function() {
    //         this.scene.stop("level2");
    //         this.scene.start("level3");
    //     },[], this);
    // }
    
    // end point
    let x = this.endPoint.x - this.player.x;
    let y = this.endPoint.y - this.player.y;
    
    if ( this.player.x >= this.endPoint.x && this.player.y >= this.endPoint.y ) {
            console.log('Reached End, game over');
            if ( this.snackCount >= 10 ) {
                this.add.image(3000, 220,'lvl2_totem2').setOrigin(0,0);
    
                this.time.delayedCall(2000,function(){
                    this.lvl2_bgmusicSnd.loop = false;
                    this.lvl2_bgmusicSnd.stop();
                    this.scene.stop("level2");
                    this.scene.start("level3", {myPlayer : this.myPlayer});
                },[], this);
                           
                } else {
                    this.add.image(3000, 220,'lvl2_totem3').setOrigin(0,0);
                    
                    this.time.delayedCall(2000,function(){
                        this.lvl2_bgmusicSnd.loop = false;
                        this.lvl2_bgmusicSnd.stop();
                        this.snackCount = 0;
                        this.lvl2_bgmusicSnd.loop = false;
                        this.lvl2_bgmusicSnd.stop();
                        this.scene.start("gameoverScene",  {currentLevel : 2});
                },[], this);
                        
                 }
            
    }

}

} // end of update

