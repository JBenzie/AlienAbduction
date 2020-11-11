import TitleScene from './titleScene.js';
import GameScene from './gameScene.js';

// Our game scene
var gameScene = new GameScene();
var titleScene = new TitleScene();

//* Game scene */
var config = {
  type: Phaser.AUTO,
  width: window.innerWidth * window.devicePixelRatio,
  height: window.innerHeight * window.devicePixelRatio,
  physics:{
    default: "arcade",
        arcade: {
    		  //gravity: { y: -50 },
    	    debug: false
        }
    },
};
var game = new Phaser.Game(config);

// load scenes
game.scene.add('titleScene', titleScene);
game.scene.add('gameScene', gameScene);

// start title
game.scene.start('titleScene');