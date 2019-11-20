// collect stars, no enemies
class level1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level1' });
        // Put global variable here
        this.starCount = 0;
    }

preload() {

    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map1', 'assets/mountain.json');
    
    this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 64, frameHeight: 64});

    this.load.atlas('fiji', 'assets/fiji.png', 'assets/fiji.json');

    // this.load.spritesheet('mummy', 'assets/mummy37x45.png', { frameWidth:37, frameHeight:45 });

    //enemy
    this.load.image('weed', 'assets/enemy_01.png');
    this.load.image('rock', 'assets/enemy_02.png');

    //snacks
    this.load.image('snack1', 'assets/snack_01.png');
    this.load.image('snack2', 'assets/snack_02.png');

    //bg
    this.load.image('bg_b','assets/lvl1-bg_b.png');
    this.load.image('bg_f','assets/lvl1-bg_f.png');

    //mp3
    this.load.audio('ping','assets/p-ping.mp3');
}

create() {

    var map = this.make.tilemap({key:'map1'});
    let tiles = map.addTilesetImage('tiles','tiles');
    

    this.pingSnd = this.sound.add('ping');
    
    this.bg_b=this.add.tileSprite(0 , 0, game.config.width, game.config.height, 'bg_b');
    this.bg_b.setOrigin(0,0);
    this.bg_b.setScrollFactor(0);

    this.bg_f=this.add.tileSprite(0 , -40, game.config.width, game.config.height, 'bg_f');
    this.bg_f.setOrigin(0,0);
    this.bg_f.setScrollFactor(0);

    this.groundLayer = map.createDynamicLayer('groundLayer', tiles, 0, 0);

    // Set starting and ending position using object names in tiles
    //this.startPoint = map.findObject("ObjectLayer", obj => obj.name === "startPoint");
    this.endPoint = map.findObject("ObjectLayer", obj => obj.name === "endPoint");

    // Place an image manually on the endPoint
    //this.add.image(this.endPoint.x, this.endPoint.y, 'coin').setOrigin(0, 0);

    // console.log('startPoint ', this.startPoint.x, this.startPoint.y);
    console.log('endPoint ', this.endPoint.x, this.endPoint.y);

    // create the player sprite    
    this.player = this.physics.add.sprite(200, 200, 'fiji');
    // this.player = this.physics.add.sprite(200, 200, 'violet');
    // this.player = this.physics.add.sprite(200, 200, 'tangy');
    this.player.setBounce(0.1); // our this.player will bounce from items
    
    // small fix to our this.player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width*.5, this.player.height*.7);
    this.player.setCollideWorldBounds(true); // don't go out of the map  

    // Set this.player to starting position
    //this.player.setPosition(this.startPoint.x, this.startPoint.y);  
    this.player.setPosition(0, 0);  

    window.player = this.player;

    //console.log('player ', this.player.x, this.player.y);

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // the this.player will collide with this layer
    this.groundLayer.setCollisionByProperty({ grass: true });
    
    
    this.physics.add.collider(this.groundLayer, this.player);

    // add enemy
    this.weed=this.physics.add.group({
        key:'weed',
        repeat:5,
        setXY: { x:700, y:0, stepX:500}
        });
    
        this.physics.add.collider(this.groundLayer, this.weed);

    this.rock=this.physics.add.group({
        key:'rock',
        repeat:2,
        setXY: { x:300, y:0, stepX:600}
        });
    
        this.physics.add.collider(this.groundLayer, this.rock);

    // add snacks
    this.snack1=this.physics.add.group({
        key:'snack1',
        repeat:5,
        setXY: { x:400, y:0, stepX:1000 }
        });

       
        this.physics.add.collider(this.groundLayer, this.snack1);

    this.snack2=this.physics.add.group({
        key:'snack2',
        repeat:5,
        setXY: { x:600, y:0, stepX:500}
        });
    
        this.physics.add.collider(this.groundLayer, this.snack2);

    // Add random stars
    // this.stars = this.physics.add.group({
    //     key: 'star',
    //     repeat: 10,
    //     setXY: { x: 0, y: 0, stepX: Phaser.Math.Between(200, 200) }
    // });

    // // Collide platform with stars
    // this.physics.add.collider(this.platformLayer, this.stars);
    // this.physics.add.collider(this.groundLayer, this.stars);

    // this.physics.add.overlap(this.player, this.stars,this.collectStars, null, this );

    this.add.text(20,20, 'Hiking Day', { font: '21px Courier', fill: '#221C48' }).setScrollFactor(0);
    this.add.text(160,20, '05:02 PM', { font: '21px Courier', fill: '#221C48' }).setScrollFactor(0);

    // this text will show the score
    this.snackText = this.add.text(20, 50, '0', {
        fontSize: '30px',
        fill: '#221C48'
    });
    // fix the text to the camera
    this.snackText.setScrollFactor(0);
    this.snackText.visible = true;

    this.anims.create({
        key: 'fiji',
        frames: [{key: 'fiji', frame: 'fiji_01'}],
        frameRate: 10,
    });

    // Create the walking animation with prefix of fiji
    this.anims.create({
        key: 'fijiwalk',
        frames: this.anims.generateFrameNames('fiji', {prefix: 'fiji_', start: 2, end: 9, zeroPad: 2}),
        frameRate: 7,
        repeat: -1
    });

    // this.anims.create({
    //     key:'walk',
    //     frames:this.anims.generateFrameNumbers('mummy'),
    //     frameRate:20,
    //     yoyo:true,
    //     repeat:-1
    //  });

     // create mummies physics group
    //this.mummies=this.physics.add.group();

    // Add members to mummies group
    // this.mummies.create(400, 200, 'mummy').setScale(2);
    // this.mummies.create(800, 200, 'mummy').setScale(2);
    // this.mummies.create(1200, 200, 'mummy').setScale(2);
    // this.mummies.create(1600, 200, 'mummy').setScale(2);
    // this.mummies.create(2000, 200, 'mummy').setScale(2);

    // this.physics.add.collider(this.groundLayer,this.mummies);
    // this.physics.add.collider(this.player,this.mummies);


    // Iterate all the children and play the 'walk' animation
    // this.mummies.children.iterate(mummy=> {
    // mummy.play('walk')
    // })

    this.cursors = this.input.keyboard.createCursorKeys();

  // set bounds so the camera won't go outside the game world
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
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

// removeBombs(bombs,stars) {
//     bombs.disableBody(true, true);
// }

update() {

    // // Make mummies walk at speed
    // this.mummies.setVelocityX(80);

    //     // Check for end of screen at right , reset to left
    // this.mummies.children.iterate(mummy=> {
    //     if ( mummy.x>this.physics.world.bounds.width+50 ) {
    //         console.log('mummy');
    //         mummy.x=-10;
    //         }
    //     });
    
    if (this.cursors.left.isDown)
    {
        this.player.body.setVelocityX(-150);
        this.player.anims.play('fijiwalk', true); // walk left
        this.player.flipX = true; // flip the sprite to the left
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.setVelocityX(150);
        this.player.anims.play('fijiwalk', true);
        this.player.flipX = false; // use the original sprite looking to the right
    } else {
        this.player.body.setVelocityX(0);
        this.player.anims.play('fiji', true);
    }
    // jump 
    if (this.cursors.up.isDown && this.player.body.onFloor())
    {
        this.player.body.setVelocityY(-250);      
        this.pingSnd.play();  
    }

    //bg
    this.bg_b.tilePositionX=this.cameras.main.scrollX*.2;
    this.bg_b.tilePositionX=this.cameras.main.scrollX*.7;

    this.bg_f.tilePositionX=this.cameras.main.scrollX*.2;
    this.bg_f.tilePositionX=this.cameras.main.scrollX*.7;

    console.log('Current this.player pos ', this.player.x, this.player.y);
    
    // Check for more then 5 stars
    // if ( this.starCount > 3 ) {
    //     console.log('Collected 1 star, jump to level 2');
    //     this.scene.stop("level1");
    //     this.scene.start("level2");
    // }


    // end point
    let x = this.endPoint.x - this.player.x;
    let y = this.endPoint.y - this.player.y;
    
    //Check for reaching endPoint object
    if ( this.player.x >= this.endPoint.x && this.player.y >= this.endPoint.y ) {
        console.log('Reached endPoint, loading next level');
        this.scene.stop("level1");
        this.scene.start("level2");
    }
    
}


}