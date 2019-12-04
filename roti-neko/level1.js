// collect stars, no enemies
class level1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level1' });
        // Put global variable here
        this.snackCount = 0;
    }

    init(data){
        this.myPlayer = data.myPlayer;
      }

preload() {

    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map1', 'assets/mountain.json');
    
    this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 64, frameHeight: 64});

    this.load.atlas('fiji', 'assets/fiji.png', 'assets/fiji.json');
    this.load.atlas('violet', 'assets/violet.png', 'assets/violet.json');
    this.load.atlas('tangy', 'assets/tangy.png', 'assets/tangy.json');

    // this.load.spritesheet('mummy', 'assets/mummy37x45.png', { frameWidth:37, frameHeight:45 });

    //enemy
    this.load.image('weed', 'assets/enemy_01.png');
    this.load.image('rock', 'assets/enemy_02.png');

    //snacks
    this.load.image('snack3', 'assets/snack_03.png');
    this.load.image('snack4', 'assets/snack_04.png');

    this.load.image('snack3drop', 'assets/snack_03.png');
    this.load.image('snack4drop', 'assets/snack_04.png');

    //totem
    this.load.image('lvl1_totem1', 'assets/totem-1.png');
    this.load.image('lvl1_totem2', 'assets/totem-2.png');
    this.load.image('lvl1_totem3', 'assets/totem-3.png');

    //bg
    this.load.image('lvl1-bg_b','assets/lvl1-bg_b.png');
    this.load.image('lvl1-bg_f','assets/lvl1-bg_f.png');

    //mp3
    this.load.audio('jump','assets/audio/jump.mp3');
    this.load.audio('collect','assets/audio/collect.mp3');
    this.load.audio('lvl1_bgmusic','assets/audio/lvl1.mp3');
    this.load.audio('lvl1_drop','assets/audio/drop2.mp3');

    //invisible thingy
    this.load.image('invisible','assets/invisible-thingy.png');
}

create() {

    var map = this.make.tilemap({key:'map1'});
    let tiles = map.addTilesetImage('tiles','tiles');
    
    this.jumpSnd = this.sound.add('jump');
    this.collectSnd = this.sound.add('collect');

    this.lvl1_dropSnd = this.sound.add('lvl1_drop'),{volume: 100};
    this.lvl1_bgmusicSnd = this.sound.add('lvl1_bgmusic');

    this.lvl1_bgmusicSnd.play();
    
    this.lvl1_bgmusicSnd.loop = true;
    
    this.lvl1_bg_b=this.add.tileSprite(0 , 0, game.config.width, game.config.height, 'lvl1-bg_b');
    this.lvl1_bg_b.setOrigin(0,0);
    this.lvl1_bg_b.setScrollFactor(0);

    this.lvl1_bg_f=this.add.tileSprite(0 , -40, game.config.width, game.config.height, 'lvl1-bg_f');
    this.lvl1_bg_f.setOrigin(0,0);
    this.lvl1_bg_f.setScrollFactor(0);

    this.groundLayer = map.createDynamicLayer('groundLayer', tiles, 0, 0);

    // Set starting and ending position using object names in tiles
    //this.startPoint = map.findObject("ObjectLayer", obj => obj.name === "startPoint");
    this.endPoint = map.findObject("ObjectLayer", obj => obj.name === "endPoint");

    

    // Place an image manually on the endPoint
    //this.add.image(this.endPoint.x, this.endPoint.y, 'coin').setOrigin(0, 0);

    // console.log('startPoint ', this.startPoint.x, this.startPoint.y);
    console.log('endPoint ', this.endPoint.x, this.endPoint.y);

    // create the player sprite    
    this.player = this.physics.add.sprite(200, 200, this.myPlayer);
    this.player.setBounce(0.1); // our this.player will bounce from items
    
    // small fix to our this.player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width*.5, this.player.height*.7);
    this.player.setCollideWorldBounds(true); // don't go out of the map  

    // Set this.player to starting position
    //this.player.setPosition(this.startPoint.x, this.startPoint.y);  
    this.player.setPosition(50, 50);  

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
    this.snacks3 = this.physics.add.group({
        key:'snack3',
        repeat:5,
        setXY: { x:400, y:0, stepX:700 }
        });

        this.physics.add.collider(this.groundLayer, this.snacks3);
        this.physics.add.overlap(this.player, this.snacks3, this.collectsnack3, null, this );

        window.snacks3 = this.snacks3;


    this.snacks4 = this.physics.add.group({
        key:'snack4',
        repeat:6,
        setXY: { x:600, y:0, stepX:500}
        });
    
        this.physics.add.collider(this.groundLayer, this.snacks4);
        this.physics.add.overlap(this.player, this.snacks4, this.collectsnack4, null, this );
        

    this.snacks3Drop = this.physics.add.group({
         key:'snack3drop',
        //  repeat:5,
         setXY: { x: 2100, y: -50 }
         });

         this.physics.add.collider(this.groundLayer, this.snacks3Drop);

    this.snacks4Drop = this.physics.add.group({
        key:'snack4drop',
        //  repeat:5,
        setXY: { x: 2100, y: -100 }
        });

        this.physics.add.collider(this.groundLayer, this.snacks4Drop);

    // this. = this.physics.add.group({
    //     key:'invisi',
    //     setXY: { x:1900, y:220 }
    //     });
        
    //     this.physics.add.collider(this.groundLayer, this.invisible);
    //     this.physics.add.overlap(this.player, this.invisible, this.hitInvisi, null, this );

    //     console.log('invisible guy', this.invisible)

        this.invisibleguy = this.physics.add.group({
            key:'invisible',
            //repeat:5,
            setXY: { x:1900, y:0 }
            });
        
            this.physics.add.collider(this.groundLayer, this.invisibleguy);
            this.physics.add.overlap(this.player, this.invisibleguy, this.hitInvisi, null, this );

    // Add random stars
    // this.stars = this.physics.add.group({
    //     key: 'star',
    //     repeat: 10,
    //     setXY: { x: 0, y: 0, stepX: Phaser.Math.Between(200, 200) }
    // });

    this.physics.add.overlap(this.player, this.weed, this.hitWeed, null, this );
    this.physics.add.overlap(this.player, this.rock, this.hitRock, null, this );

    this.add.text(20,20, 'Hiking Day', { font: '21px Courier', fill: '#221C48' }).setScrollFactor(0);
    this.add.text(160,20, '05:02 PM', { font: '21px Courier', fill: '#221C48' }).setScrollFactor(0);

    this.add.image(2000, 220,'lvl1_totem1').setOrigin(0,0);

    // this text will show the score
    this.snackText = this.add.text(20, 50, '0'+'/5', {
        fontSize: '30px',
        fill: '#221C48'
    });
    // fix the text to the camera
    this.snackText.setScrollFactor(0);
    this.snackText.visible = true;

    this.anims.create({
        key: this.myPlayer,
        frames: [{key: this.myPlayer, frame: this.myPlayer+'_01'}],
        frameRate: 10,
    });

    // Create the walking animation with prefix of player
    this.anims.create({
        key: this.myPlayer+'walk',
        frames: this.anims.generateFrameNames(this.myPlayer, {prefix: this.myPlayer+'_', start: 2, end: 9, zeroPad: 2}),
        frameRate: 7,
        repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey('SPACE');

  // set bounds so the camera won't go outside the game world
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  // make the camera follow the this.player
  this.cameras.main.startFollow(this.player);

  // set background color, so the sky is not black    
  this.cameras.main.setBackgroundColor('#ccccff');

}

collectsnack3(player, snacks3) {
    snacks3.disableBody(true, true);
    this.snackCount += 1; // add 10 points to the score
    console.log(this.snackCount);
    this.snackText.setText(this.snackCount+'/5');
    this.collectSnd.play();  // set the text to show the current score
    return false;
}

collectsnack4(player, snacks4) {
    snacks4.disableBody(true, true);
    this.snackCount += 1; // add 10 points to the score
    console.log(this.snackCount);
    this.snackText.setText(this.snackCount+'/5');
    this.collectSnd.play();  // set the text to show the current score
    return false;
}

hitWeed(player,weed) {
    //bombs.disableBody(true, true);
    console.log('Hit crab');
    this.cameras.main.shake(20);
    this.lvl1_dropSnd.play();
    this.player.x -= this.player.width;
    this.snackCount -= 1;
    this.snackText.setText(this.snackCount+'/5');

    // this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.dropSnack1, callbackScope: this, loop: true });
    // this.timedEvent2 = this.time.addEvent({ delay: 1000, callback: this.dropSnack2, callbackScope: this, loop: true });

    if (this.snackCount < 0) {
        this.snackCount = 0;
        this.lvl1_bgmusicSnd.stop();
        this.lvl1_bgmusicSnd.loop = false;
        this.scene.start("gameoverScene",  {currentLevel : 1});
    }
}

hitRock(player,rock) {
    //bombs.disableBody(true, true);
    console.log('Hit crab');
    this.cameras.main.shake(20);
    this.lvl1_dropSnd.play();
    this.player.x -= this.player.width;
    this.snackCount -= 1;
    this.snackText.setText(this.snackCount+'/5');

    if (this.snackCount < 0) {
        this.snackCount = 0;
        this.lvl1_bgmusicSnd.stop();
        this.lvl1_bgmusicSnd.loop = false;
        this.scene.start("gameoverScene",  {currentLevel : 1});
    }
}

hitInvisi(player,invisibleguy) {
    //this.player.x = this.player.width;
    // this.snackText.setText(this.snackCount+'/5');
    //bombs.disableBody(true, true);
    console.log('Hit invisi');
    invisibleguy.disableBody(true, true);

    

    if ( this.snackCount = 5 ) {
        this.timedEvent = this.time.addEvent({ delay: 500, callback: this.dropSnack1, callbackScope: this, loop: true });
        this.timedEvent2 = this.time.addEvent({ delay: 500, callback: this.dropSnack2, callbackScope: this, loop: true });
    }
}

dropSnack1() {
    // Add random bombs
    console.log('Dropping snacks');
    this.snacks3Drop.createMultiple({
        key: 'snack3drop',
        repeat: 2,
        setXY: { x: 2100, y: -370, stepY:130 }
    })
}

dropSnack2() {
    // Add random bombs
    console.log('Dropping snacks');
    this.snacks4Drop.createMultiple({
        key: 'snack4drop',
        repeat: 2,
        setXY: { x: 2100, y: -330, stepY:130  }
    })
}

removeSnacks(groundLayer,snacks3Drop) {
    console.log('Hit ground');
    snacks3Drop.disableBody(true, true);

    return false;
}

update() {

    if (this.cursors.left.isDown)
    {
        this.player.body.setVelocityX(-120);
        this.player.anims.play(this.myPlayer+'walk', true); // walk left
        this.player.flipX = true; // flip the sprite to the left
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.setVelocityX(120);
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
        this.player.body.setVelocityY(-270);      
        this.jumpSnd.play();  
    }

    //bg
    this.lvl1_bg_b.tilePositionX=this.cameras.main.scrollX*.2;
    this.lvl1_bg_b.tilePositionX=this.cameras.main.scrollX*.1;

    this.lvl1_bg_f.tilePositionX=this.cameras.main.scrollX*.4;
    this.lvl1_bg_f.tilePositionX=this.cameras.main.scrollX*.3;

    //console.log('Current this.player pos ', this.player.x, this.player.y);
    
    // Check for more then 5 stars
    // if ( this.starCount > 3 ) {
    //     console.log('Collected 1 star, jump to level 2');
    //     this.scene.stop("level1");
    //     this.scene.start("level2");
    // }


    // end point
    let x = this.endPoint.x - this.player.x;
    let y = this.endPoint.y - this.player.y;

    //console.log('player.x', this.player.x)
    
    //Check for reaching endPoint object
    if ( this.player.x >= this.endPoint.x && this.player.y >= this.endPoint.y ) {
        console.log('Reached endPoint, loading next level');
        if ( this.snackCount >= 5 ) {
            this.add.image(2000, 220,'lvl1_totem2').setOrigin(0,0);

            this.time.delayedCall(2500,function(){
                this.lvl1_bgmusicSnd.loop = false;
                this.lvl1_bgmusicSnd.stop(); 
                this.scene.stop("level1");
                this.scene.start("level2", {myPlayer : this.myPlayer});
            },[], this);

         } else {

            this.add.image(2000, 220,'lvl1_totem3').setOrigin(0,0);
            this.time.delayedCall(2500,function(){
            this.lvl1_bgmusicSnd.loop = false;
            this.lvl1_bgmusicSnd.stop(); 
            this.snackCount = 0;
            this.lvl1_bgmusicSnd.loop = false;
                this.lvl1_bgmusicSnd.stop();
            this.scene.start("gameoverScene",  {currentLevel : 1});
        },[], this);
                
         }
        
    }
        
}


}