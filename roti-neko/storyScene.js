class storyScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'storyScene' });
    }

    preload() {
        this.load.image('story','assets/story1.png');

        this.load.audio('story_bgmusic','assets/audio/story.mp3');
    }

    create () {

        this.add.image(0, 0, 'story').setOrigin(0, 0);

        this.add.text(0, 580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        // this.story_bgmusicSnd = this.sound.add('story_bgmusic');
        // this.story_bgmusicSnd.play(); 

        console.log("This is storyScene");

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto story2Scene");
        this.scene.stop("storyScene");
        this.scene.start("story2Scene");
        }, this );

    }

}
