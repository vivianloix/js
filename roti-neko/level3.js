// moving enemies
class level3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level3' });
        this.snackCount = 0;

    }

    init(data){
        this.myPlayer = data.myPlayer;
      }

preload() {

    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map3', 'assets/city.json');
    
    this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 64, frameHeight: 64});

    //player
    this.load.atlas('fiji', 'assets/fiji.png', 'assets/fiji.json');
    this.load.atlas('violet', 'assets/violet.png', 'assets/violet.json');
    this.load.atlas('tangy', 'assets/tangy.png', 'assets/tangy.json');
    
    //enemy
    this.load.image('rat', 'assets/enemy_06.png');
    this.load.image('raindrops', 'assets/enemy_07.png');
    //this.load.image('pacifier', 'assets/pacifier.png');

    //totem
    this.load.image('lvl3_totem1', 'assets/totem-1.png');
    this.load.image('lvl3_totem2', 'assets/totem-2.png');
    this.load.image('lvl3_totem3', 'assets/totem-3.png');

    //snacks
    this.load.image('snack2', 'assets/snack_02.png');
    this.load.image('snack4', 'assets/snack_04.png');

    this.load.image('snack5drop', 'assets/snack_02.png');
    this.load.image('snack6drop', 'assets/snack_04.png');

    //bg
    this.load.image('lvl3-bg_b','assets/lvl3-bg_b.png');
    this.load.image('lvl3-bg_f1','assets/lvl3-bg_f1.png');
    this.load.image('lvl3-bg_f','assets/lvl3-bg_f.png');
    this.load.image('lvl3-bg_f2','assets/lvl3-bg_f2.png');

    //mp3
    this.load.audio('jump','assets/audio/jump.mp3');
    this.load.audio('collect','assets/audio/collect.mp3');
    this.load.audio('lvl3_bgmusic','assets/audio/lvl3.mp3');
    this.load.audio('lvl3_drop','assets/audio/drop2.mp3');

    //invisible thingy
    this.load.image('invisible','assets/invisible-thingy.png');

}

create() {


    this.map = this.make.tilemap({key: 'map3'});

    this.jumpSnd = this.sound.add('jump');
    this.collectSnd = this.sound.add('collect');
    
    this.lvl3_dropSnd = this.sound.add('lvl3_drop');
    this.lvl3_bgmusicSnd = this.sound.add('lvl3_bgmusic');

    this.lvl3_bgmusicSnd.play();

    this.lvl3_bgmusicSnd.loop = true;

    this.lvl3_bg_b = this.add.tileSprite(0 , 0, game.config.width, game.config.height, 'lvl3-bg_b');
    this.lvl3_bg_b.setOrigin(0,0);
    this.lvl3_bg_b.setScrollFactor(0);

    this.lvl3_bg_f1 = this.add.tileSprite(0 , 60, game.config.width, game.config.height, 'lvl3-bg_f1');
    this.lvl3_bg_f1.setOrigin(0,0);
    this.lvl3_bg_f1.setScrollFactor(0);
    
    this.lvl3_bg_f = this.add.tileSprite(0 , 80, game.config.width, game.config.height, 'lvl3-bg_f');
    this.lvl3_bg_f.setOrigin(0,0);
    this.lvl3_bg_f.setScrollFactor(0);

    this.add.image(30, 30, 'lvl3-bg_f2').setOrigin(0, 0).setScrollFactor(0);

    // Must match tileSets name
    this.tiles = this.map.addTilesetImage('tiles','tiles');

    // create the ground layer
    this.groundLayer = this.map.createDynamicLayer('groundLayer', this.tiles, 0, 0);
    //this.platformLayer = this.map.createDynamicLayer('platformLayer', this.tiles, 0, 0);

    // Set starting and ending position using name
    // this.startPoint3 = this.map.findObject("ObjectLayer", obj => obj.name === "startPoint");
    this.endPoint = this.map.findObject("ObjectLayer", obj => obj.name === "endPoint");

    // console.log('startPoint ', this.startPoint.x, this.startPoint.y);
    //console.log('endPoint ', this.endPoint.x, this.endPoint.y);

    // create the player sprite    
    this.player = this.physics.add.sprite(200, 200, this.myPlayer);
    this.player.setBounce(0.1); // our this.player will bounce from items
    
    // small fix to our this.player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width*.5, this.player.height*.7);
    this.player.setCollideWorldBounds(true); // don't go out of the map  

    // Set this.player to starting position
    this.player.setPosition(70, 70);  

    //console.log('player ', this.player.x, this.player.y);

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // the this.player will collide with this layer
    this.groundLayer.setCollisionByProperty({ bricks: true });
    //this.platformLayer.setCollisionByProperty({ collides: true });
    
    this.physics.add.collider(this.groundLayer, this.player);
    //this.physics.add.collider(this.platformLayer, this.player);

    // Add random stars
    // this.stars = this.physics.add.group({
    //     key: 'star',
    //     repeat: 40,
    //     setXY: { x: 0, y: 0, stepX: Phaser.Math.Between(100, 300) }
    // });

    // // Collide platform with stars
    // this.physics.add.collider(this.platformLayer, this.stars);
    // this.physics.add.collider(this.groundLayer, this.stars);

    // this.physics.add.overlap(this.player, this.stars,this.collectStars, null, this );
    //enemy
     this.rats = this.physics.add.group({
        key: 'rat',
        repeat: 4,
        setXY: { x: 500, y: 0, stepX: 700 }
    });

    window.rats = this.rats;

    this.snacks5 = this.physics.add.group({
        key: 'snack2',
        repeat: 10,
        setXY: { x: 350, y: 0, stepX: 200 }
    });

    this.physics.add.collider(this.groundLayer, this.snacks5);

    this.snacks6 = this.physics.add.group({
        key: 'snack4',
        repeat: 10,
        setXY: { x: 550, y: 0, stepX: 270 }
    });

    this.physics.add.collider(this.groundLayer, this.snacks6);

    this.rain = this.physics.add.group({defaultKey: 'raindrops'})
    // this.rain = this.physics.add.group({
    //     key: 'raindrops',
    //     repeat: 10,
    //     setXY: { x: 400, y: 0, stepX: 200 }
    // });

    this.snacks5Drop = this.physics.add.group({
        key:'snack5drop',
       //  repeat:5,
        setXY: { x: 4000, y: -50 }
        });

        this.physics.add.collider(this.groundLayer, this.snacks5Drop);

   this.snacks6Drop = this.physics.add.group({
       key:'snack6drop',
       //  repeat:5,
       setXY: { x: 4000, y: -100 }
       });

       this.physics.add.collider(this.groundLayer, this.snacks6Drop);

    this.invisibleguy = this.physics.add.group({
    key:'invisible',
    //repeat:5,
    setXY: { x:3900, y:0 }
    });
    
    this.physics.add.collider(this.groundLayer, this.invisibleguy);
    this.physics.add.overlap(this.player, this.invisibleguy, this.hitInvisi, null, this );

    this.timedEvent = this.time.addEvent({ delay: 4000, callback: this.moveLeft, callbackScope: this, loop: true });
    this.timedEvent2 = this.time.addEvent({ delay: 6000, callback: this.moveRight, callbackScope: this, loop: true });
    this.timedEvent3 = this.time.addEvent({ delay: Phaser.Math.Between(2000, 4000), callback: this.dropRain, callbackScope: this, loop: true }); 
    this.timedEvent4 = this.time.addEvent({ delay: Phaser.Math.Between(5000, 7000), callback: this.dropRain2, callbackScope: this, loop: true }); 
       

    // Collide platform with stars
    //this.physics.add.collider(this.platformLayer, this.bombs);
    this.physics.add.collider(this.groundLayer, this.rats);

    //this.physics.add.overlap(this.stars, this.bombs, this.removeBombs, null, this );
    this.physics.add.overlap(this.player, this.snacks5, this.collectsnack5, null, this );
    this.physics.add.overlap(this.player, this.snacks6, this.collectsnack6, null, this );
    this.physics.add.overlap(this.player, this.rats, this.hitRat, null, this );
    this.physics.add.overlap(this.player, this.rain, this.hitRain, null, this );

    this.add.text(20,20, 'City Night', { font: '21px Courier', fill: '#B8C4D8' }).setScrollFactor(0);
    this.add.text(160,20, '08:17 PM', { font: '21px Courier', fill: '#B8C4D8' }).setScrollFactor(0);

    // this text will show the score
    this.snackText = this.add.text(20, 50, '0' + '/15', {
        fontSize: '30px',
        fill: '#B8C4D8'
    });
    // fix the text to the camera
    this.snackText.setScrollFactor(0);
    this.snackText.visible = true;

    this.add.image(3900, 220,'lvl3_totem1').setOrigin(0,0);

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

collectsnack5(player, snacks5) {
    snacks5.disableBody(true, true);
    this.snackCount += 1; // add 10 points to the score
    console.log(this.snackCount);
    this.snackText.setText(this.snackCount+'/15'); // set the text to show the current score
    this.collectSnd.play();
    return false;
}

collectsnack6(player, snacks6) {
    snacks6.disableBody(true, true);
    this.snackCount += 1; // add 10 points to the score
    console.log(this.snackCount);
    this.snackText.setText(this.snackCount+'/15'); // set the text to show the current score
    this.collectSnd.play();
    return false;
}

hitRat(player,rats) {
    //bombs.disableBody(true, true);
    console.log('Hit rat, restart game');
    this.cameras.main.shake(30);
    this.lvl3_dropSnd.play(); 
    this.player.x -= this.player.width;
    this.snackCount -= 1;
    this.snackText.setText(this.snackCount+'/15');
    
    if (this.snackCount < 0) {
        this.snackCount = 0;
        this.lvl3_bgmusicSnd.stop();
        this.lvl3_bgmusicSnd.loop = false;
        this.scene.start("gameoverScene",  {currentLevel : 3});
    }
}

hitRain(player,rain) {
    //bombs.disableBody(true, true);
    console.log('Hit rat, restart game');
    this.cameras.main.shake(30);
    this.lvl3_dropSnd.play(); 
    this.snackCount -= 1;
    this.snackText.setText(this.snackCount+'/15');
    rain.disableBody(true, true);
    
    if (this.snackCount < 0) {
        this.snackCount = 0;
        this.lvl3_bgmusicSnd.stop();
        this.lvl3_bgmusicSnd.loop = false;
        this.scene.start("gameoverScene",  {currentLevel : 3});
    }
}

moveLeft(rats) {
    this.tweens.add({
        targets: this.rats.getChildren().map(function (c) { return c.body.velocity }),
        x: Phaser.Math.Between(-100, -50),
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: false,
        
    });

    this.rats.children.iterate(rat => {
        rat.flipX = true;
    }) 
}
moveRight(rats) {
    this.tweens.add({
        targets: this.rats.getChildren().map(function (c) { return c.body.velocity }),
        x:  Phaser.Math.Between(50, 100),
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: false,
        
    });

    this.rats.children.iterate(rat => {
        rat.flipX = false;
    }) 
}

dropRain() {
	// Add random bombs
    console.log('Dropping bombs');
    this.rain.createMultiple({
    key: 'raindrops',
    repeat: 1,
	setVelocityY: 5,
	//SetAllowGravity:true,
    setXY: { x: this.player.x-20, y: this.player.y-500, stepX: Phaser.Math.Between(300, 600) }
    });
}

dropRain2() {
	// Add random bombs
    console.log('Dropping bombs');
    this.rain.createMultiple({
    key: 'raindrops',
    repeat: 1,
	setVelocityY: 5,
	//SetAllowGravity:true,
    setXY: { x: this.player.x-30, y: this.player.y-500, stepX: Phaser.Math.Between(600, 1000) }
    });
}

hitInvisi(player,invisibleguy) {
    //this.player.x = this.player.width;
    // this.snackText.setText(this.snackCount+'/5');
    //bombs.disableBody(true, true);
    console.log('Hit invisi');
    invisibleguy.disableBody(true, true);

    

    if ( this.snackCount >= 15 ) {
        this.timedEvent = this.time.addEvent({ delay: 500, callback: this.dropSnack5, callbackScope: this, loop: true });
        this.timedEvent2 = this.time.addEvent({ delay: 500, callback: this.dropSnack6, callbackScope: this, loop: true });
    }
}

dropSnack5() {
    // Add random bombs
    console.log('Dropping snacks');
    this.snacks5Drop.createMultiple({
        key: 'snack5drop',
        repeat: 2,
        setXY: { x: 4000, y: -370, stepY:130 }
    })
}

dropSnack6() {
    // Add random bombs
    console.log('Dropping snacks');
    this.snacks6Drop.createMultiple({
        key: 'snack6drop',
        repeat: 2,
        setXY: { x: 4000, y: -330, stepY:130 }
    })
}

removeSnacks(groundLayer,snacks5Drop) {
    console.log('Hit ground');
    snacks5Drop.disableBody(true, true);

    return false;
}

update() {

    if (this.cursors.left.isDown)
    {
        this.player.body.setVelocityX(-150);
        this.player.anims.play(this.myPlayer+'walk', true); // walk left
        this.player.flipX = true; // flip the sprite to the left
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.setVelocityX(150);
        this.player.anims.play(this.myPlayer+'walk', true);
        this.player.flipX = false; // use the original sprite looking to the right
    } else {
        this.player.body.setVelocityX(0);
        this.player.anims.play(this.myPlayer, true);
    }
    // jump 
    if (this.space.isDown && this.player.body.onFloor())
    {
        this.player.body.setVelocityY(-290); 
        this.jumpSnd.play();       
    }

    console.log('Current this.player pos ', this.player.x, this.player.y);

    // end point
    let x = this.endPoint.x - this.player.x;
    let y = this.endPoint.y - this.player.y;

    // Check for reaching endPoint object
    // if ( this.player.x >= this.endPoint.x && this.player.y >= this.endPoint.y ) {
    //     console.log('Reached End, game over');
    //     //this.cameras.main.shake(500);
    //     // this.time.delayedCall(500,function() {
    //         this.scene.stop("level3");
    //         this.scene.start("endScene");
    //         this.lvl3_bgmusicSnd.stop();
    //     // },[], this);
    // }

    if ( this.player.x >= this.endPoint.x && this.player.y >= this.endPoint.y ) {
        console.log('Reached End, game over');
        if ( this.snackCount >= 15 ) {
            this.add.image(3900, 220,'lvl3_totem2').setOrigin(0,0);
            
            this.time.delayedCall(2000,function(){
                this.lvl3_bgmusicSnd.loop = false;
                this.lvl3_bgmusicSnd.stop(); 
                this.scene.stop("level3");
                this.scene.start("endScene", {myPlayer : this.myPlayer});
            },[], this);
                
             } else {
                this.add.image(3900, 220,'lvl3_totem3').setOrigin(0,0);
        
                this.time.delayedCall(2000,function(){
                this.lvl3_bgmusicSnd.loop = false;
                this.lvl3_bgmusicSnd.stop(); 
                this.snackCount = 0;
                this.scene.start("gameoverScene",  {currentLevel : 3});
                },[], this);
             }
        
}

    
    //bg
    this.lvl3_bg_b.tilePositionX=this.cameras.main.scrollX*.2;
    this.lvl3_bg_b.tilePositionX=this.cameras.main.scrollX*.7;

    this.lvl3_bg_f1.tilePositionX=this.cameras.main.scrollX*.8;
    this.lvl3_bg_f1.tilePositionX=this.cameras.main.scrollX*.2;

    this.lvl3_bg_f.tilePositionX=this.cameras.main.scrollX*.4;
    this.lvl3_bg_f.tilePositionX=this.cameras.main.scrollX*.3;

}


}
