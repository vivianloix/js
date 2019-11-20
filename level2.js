// static enemies
class level2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level2' });
        this.snackCount = 0;

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

    //bg
    this.load.image('bg_b','assets/lvl2-bg_b.png');
    this.load.image('bg_f','assets/lvl2-bg_f.png');

    //snacks
    this.load.image('snack1', 'assets/snack_01.png');
    this.load.image('snack2', 'assets/snack_02.png');

}

create() {


    this.map = this.make.tilemap({key: 'map2'});

    this.bg_b=this.add.tileSprite(0 , 0, game.config.width, game.config.height, 'bg_b');
    this.bg_b.setOrigin(0,0);
    this.bg_b.setScrollFactor(0);

    this.bg_f=this.add.tileSprite(0 , -40, game.config.width, game.config.height, 'bg_f');
    this.bg_f.setOrigin(0,0);
    this.bg_f.setScrollFactor(0);
    
    // Must match tileSets name
   // var coinTiles = map.addTilesetImage('goldCoin');

    // Must match tileSets name
    this.tiles = this.map.addTilesetImage('tiles','tiles');

    // create the ground layer
    this.groundLayer = this.map.createDynamicLayer('groundLayer', this.tiles, 0, 0);

    // Set starting and ending position using name
    this.startPoint = this.map.findObject("objectLayer", obj => obj.name === "startPoint");
    this.endPoint = this.map.findObject("objectLayer", obj => obj.name === "endPoint");

    console.log('endPoint', this.endPoint.x, this.endPoint.y);
    
    // add coins as tiles
    //coinLayer = map.createDynamicLayer('coinLayer', coinTiles, 0, 0);

    // create the player sprite    
    // this.player = this.physics.add.sprite(200, 200, 'fiji');
    // this.player = this.physics.add.sprite(200, 200, 'violet');
    this.player = this.physics.add.sprite(200, 200, 'tangy');
    this.player.setBounce(0.1); // our this.player will bounce from items
    
    // small fix to our this.player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width*.5, this.player.height*.7);
    this.player.setCollideWorldBounds(true); // don't go out of the map  

    // Set this.player to starting position
    //this.player.setPosition(this.startPoint2.x, this.startPoint2.y);  

    console.log('violet', this.player.x, this.player.y);

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
    this.physics.add.collider(this.crab, this.player);

    this.seagull = this.add.group({
        key: 'seagull',
        repeat: 10,
        setXY: { x: 350, y: 50, stepX: 500 },
    });

    this.snacks1=this.physics.add.group({
        key:'snack1',
        repeat:10,
        setXY: { x:400, y:0, stepX: Phaser.Math.Between(200, 200) }
        });
    this.physics.add.collider(this.groundLayer, this.snacks1);

    this.snacks2=this.physics.add.group({
        key:'snack2',
        repeat:5,
        setXY: { x:600, y:0, stepX:500}
        });
    
        this.physics.add.collider(this.groundLayer, this.snacks2);

    // this.poop = this.physics.add.group({
    //     key: 'poop',
    //     repeat: 7,
    //     setXY: { x: 100, y: 0, stepX: Phaser.Math.Between(200, 200) }

    // });
    
    //this.physics.add.collider(this.poop, this.player);

    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.moveLeft, callbackScope: this, loop: true });
    this.timedEvent2 = this.time.addEvent({ delay: 2000, callback: this.moveRight, callbackScope: this, loop: true }); 

    // Collide platform with enemy
    this.physics.add.collider(this.groundLayer, this.crab);
    //this.physics.add.collider(this.groundLayer, this.poop);

    //this.physics.add.overlap(this.stars, this.bombs, this.removeBombs, null, this );
    this.physics.add.overlap(this.player, this.snacks1,this.snacks2, this.collectSnack1, this.collectSnack2,null, this );
    this.physics.add.overlap(this.player, this.crab, this.hitCrab, null, this );

    this.add.text(20,20, 'Beach Day', { font: '21px Courier', fill: '#221C48' }).setScrollFactor(0);
    this.add.text(150,20, '11:36 AM', { font: '21px Courier', fill: '#221C48' }).setScrollFactor(0);

    // this text will show the score
    this.snackText = this.add.text(20, 50, '0', {
        fontSize: '30px',
        fill: '#221C48'
    });
    // fix the text to the camera
    this.snackText.setScrollFactor(0);
    this.snackText.visible = true;

    // //fiji
    // this.anims.create({
    //     key: 'fiji',
    //     frames: [{key: 'fiji', frame: 'fiji_01'}],
    //     frameRate: 10,
    // });

    // // Create the walking animation with prefix of fiji
    // this.anims.create({
    //     key: 'fijiwalk',
    //     frames: this.anims.generateFrameNames('fiji', {prefix: 'fiji_', start: 2, end: 9, zeroPad: 2}),
    //     frameRate: 7,
    //     repeat: -1
    // });

    // //violet
    // this.anims.create({
    //     key: 'violet',
    //     frames: [{key: 'violet', frame: 'violet_01'}],
    //     frameRate: 10,
    // });

    // this.anims.create({
    //     key: 'violetwalk',
    //     frames: this.anims.generateFrameNames('violet', {prefix: 'violet_', start: 2, end: 9, zeroPad: 2}),
    //     frameRate: 7,
    //     repeat: -1
    // });

    //tangy
    this.anims.create({
        key: 'tangy',
        frames: [{key: 'tangy', frame: 'tangy_01'}],
        frameRate: 10,
    });

    // Create the walking animation with prefix of fiji
    this.anims.create({
        key: 'tangywalk',
        frames: this.anims.generateFrameNames('tangy', {prefix: 'tangy_', start: 2, end: 9, zeroPad: 2}),
        frameRate: 7,
        repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();

  // set bounds so the camera won't go outside the game world
  this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
  // make the camera follow the this.player
  this.cameras.main.startFollow(this.player);

  // set background color, so the sky is not black    
  this.cameras.main.setBackgroundColor('#ccccff');

}

collectSnack1(player, snacks1) {
    snacks1.disableBody(true, true);
    this.snackCount += 1; // add 10 points to the score
    console.log(this.snackCount);
    //this.snackText.setText(this.snackCount); // set the text to show the current score
    return false;
}

// collectSnack2(player, snacks2) {
//     snacks2.disableBody(true, true);
//     this.snackCount += 1; // add 10 points to the score
//     console.log(this.snackCount);
//     this.snackText.setText(this.snackCount); // set the text to show the current score
//     return false;
// }

hitCrab(player,crab) {
    //bombs.disableBody(true, true);
    console.log('Hit bomb, restart game');
    this.cameras.main.shake(200);
    //delay 1 sec
    this.time.delayedCall(2000,function() {

        this.scene.restart();
        //this.scene.start("gameoverScene");
    },[], this);
}

moveLeft(crab) {
    this.tweens.add({
        targets: this.crab.getChildren().map(function (c) { return c.body.velocity }),
        x: Phaser.Math.Between(-150, -100) ,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: false
    });
}
moveRight(crab) {
    this.tweens.add({
        targets: this.crab.getChildren().map(function (c) { return c.body.velocity }),
        x:  Phaser.Math.Between(150, 100),
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: false
    });
}

removeBombs(bombs,stars) {
    bombs.disableBody(true, true);
}

update() {

    if (this.cursors.left.isDown)
    {
        this.player.body.setVelocityX(-200);
        // this.player.anims.play('fijiwalk', true); // walk left
        // this.player.anims.play('violetwalk', true);
        this.player.anims.play('tangywalk', true);
        this.player.flipX = true; // flip the sprite to the left
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.setVelocityX(200);
        // this.player.anims.play('fijiwalk', true);
        // this.player.anims.play('violetwalk', true);
        this.player.anims.play('tangywalk', true);
        this.player.flipX = false; // use the original sprite looking to the right
    } else {
        this.player.body.setVelocityX(0);
        // this.player.anims.play('fiji', true);
        // this.player.anims.play('violet', true);
        this.player.anims.play('tangy', true);
    }
    // jump 
    if (this.cursors.up.isDown && this.player.body.onFloor())
    {
        this.player.body.setVelocityY(-250);        
    }

    //bg
    this.bg_b.tilePositionX=this.cameras.main.scrollX*.2;
    this.bg_b.tilePositionX=this.cameras.main.scrollX*.7;

    this.bg_f.tilePositionX=this.cameras.main.scrollX*.2;
    this.bg_f.tilePositionX=this.cameras.main.scrollX*.7;

    console.log('Current this.player pos ', this.player.x, this.player.y);

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
            //this.cameras.main.shake(500);
            //this.time.delayedCall(500,function() {
                //this.scene.stop("level2");
                // if ( this.snackCount > 3 ) {
                        this.scene.stop("level2");
                        this.scene.start("level3");
                    
                // } else {
                // this.scene.start("gameoverScene");
                // }
        
    
            // }
            
    }

}

} // end of update

