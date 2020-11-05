import TitleScene from './titleScene.js';
import GameScene from './gameScene.js';
import GameOver from './gameOver.js';

// Our game scene
var gameScene = new GameScene();
var titleScene = new TitleScene();
var gameOver = new GameOver();

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
game.scene.add('gameOver', gameOver);



// start title
game.scene.start('titleScene');