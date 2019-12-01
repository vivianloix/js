
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 470,
    backgroundColor: '#000055',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: true
        }
    },
    //scene: [mainScene, main2Scene, storyScene, story2Scene, level1]
    scene: [mainScene, introScene, characterScene, storyScene, story2Scene, story3Scene, story4Scene, story5Scene, story6Scene, story7Scene, level1, level2, level3, gameoverScene, endScene]


};

let game = new Phaser.Game(config);



