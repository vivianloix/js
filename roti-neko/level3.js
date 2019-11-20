// moving enemies
class level3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level3' });
        this.snackCount = 0;

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

    //bg
    this.load.image('bg_b','assets/lvl3-bg_b.png');
    this.load.image('bg_f','assets/lvl3-bg_f.png');

}

create() {


    this.map = this.make.tilemap({key: 'map3'});
    
    // Must match tileSets name
   // var coinTiles = map.addTilesetImage('goldCoin');

    // Must match tileSets name
    this.tiles = this.map.addTilesetImage('tiles','tiles');

    // create the ground layer
    this.groundLayer = this.map.createDynamicLayer('groundLayer', this.tiles, 0, 0);
    //this.platformLayer = this.map.createDynamicLayer('platformLayer', this.tiles, 0, 0);

    // Set starting and ending position using name
    // this.startPoint3 = this.map.findObject("ObjectLayer", obj => obj.name === "startPoint");
    this.endPoint = this.map.findObject("ObjectLayer", obj => obj.name === "endPoint");

    // console.log('startPoint ', this.startPoint.x, this.startPoint.y);
    console.log('endPoint ', this.endPoint.x, this.endPoint.y);
    
    // add coins as tiles
    //coinLayer = map.createDynamicLayer('coinLayer', coinTiles, 0, 0);

    // create the player sprite    
    this.player = this.physics.add.sprite(200, 200, 'fiji');
    this.player = this.physics.add.sprite(200, 200, 'violet');
    this.player = this.physics.add.sprite(200, 200, 'tangy');
    this.player.setBounce(0.1); // our this.player will bounce from items
    
    // small fix to our this.player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width*.5, this.player.height*.7);
    this.player.setCollideWorldBounds(true); // don't go out of the map  

    // Set this.player to starting position
    this.player.setPosition(0, 0);  

    console.log('player ', this.player.x, this.player.y);

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

     // Add random bomb
     this.rat = this.physics.add.group({
        key: 'rat',
        repeat: 6,
        setXY: { x: 400, y: 0, stepX: 600 }
    });

    this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.moveLeft, callbackScope: this, loop: true });
    this.timedEvent2 = this.time.addEvent({ delay: 4000, callback: this.moveRight, callbackScope: this, loop: true });
       

    // Collide platform with stars
    //this.physics.add.collider(this.platformLayer, this.bombs);
    this.physics.add.collider(this.groundLayer, this.rat);

    //this.physics.add.overlap(this.stars, this.bombs, this.removeBombs, null, this );
    this.physics.add.overlap(this.player, this.rats, this.hitBombs, null, this );

    this.add.text(20,20, 'City Night', { font: '21px Courier', fill: '#221C48' }).setScrollFactor(0);
    this.add.text(160,20, '08:17 PM', { font: '21px Courier', fill: '#221C48' }).setScrollFactor(0);

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

collectSnack1(player, snack1) {
    snack1.disableBody(true, true);
    this.snackCount += 1; // add 10 points to the score
    console.log(this.snackCount);
    this.snackText.setText(snackCount); // set the text to show the current score
    return false;
}

hitRat(player,rat) {
    //bombs.disableBody(true, true);
    console.log('Hit bomb, restart game');
    this.cameras.main.shake(200);
    // delay 1 sec
    this.time.delayedCall(2000,function() {

        this.scene.restart();
//        this.scene.start("gameoverScene");
    },[], this);
}

removeBombs(bombs,stars) {
    bombs.disableBody(true, true);
}

moveLeft(rat) {
    this.tweens.add({
        targets: this.rat.getChildren().map(function (c) { return c.body.velocity }),
        x: Phaser.Math.Between(-150, -50) ,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: false
    });
}
moveRight(rat) {
    this.tweens.add({
        targets: this.rat.getChildren().map(function (c) { return c.body.velocity }),
        x:  Phaser.Math.Between(50, 150),
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: false
    });
}


update() {

    if (this.cursors.left.isDown)
    {
        this.player.body.setVelocityX(-200);
        this.player.anims.play('tangywalk', true); // walk left
        this.player.flipX = true; // flip the sprite to the left
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.setVelocityX(200);
        this.player.anims.play('tangywalk', true);
        this.player.flipX = false; // use the original sprite looking to the right
    } else {
        this.player.body.setVelocityX(0);
        this.player.anims.play('tangy', true);
    }
    // jump 
    if (this.cursors.up.isDown && this.player.body.onFloor())
    {
        this.player.body.setVelocityY(-230);        
    }

    console.log('Current this.player pos ', this.player.x, this.player.y);

    // end point
    let x = this.endPoint.x - this.player.x;
    let y = this.endPoint.y - this.player.y;

    // Check for reaching endPoint object
    if ( this.player.x >= this.endPoint.x && this.player.y >= this.endPoint.y ) {
        console.log('Reached End, game over');
        //this.cameras.main.shake(500);
        // this.time.delayedCall(500,function() {
            this.scene.stop("level3");
            this.scene.start("endScene");
        // },[], this);
    }
    
}


}