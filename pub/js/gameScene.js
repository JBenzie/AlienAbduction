class GameScene extends Phaser.Scene {
    constructor() {
        super('gameScene');
    }

    
    init() {
        // initialize game variables
        this.score = 0;
        this.lives = 3;
        this.speed = 1.5;
        this.score_text;
        this.lives_text;
        this.alienSpeed = 150;
        this.playerSpeed = 1000;
        this.highScore = parseInt(localStorage.getItem('highscore')) || 0;
    }

    preload() {
        
        // load any images or sounds

        this.load.image("player1", "pub/assets/images/players/1.png");
        this.load.image("player2", "pub/assets/images/players/2.png");
        this.load.image("player3", "pub/assets/images/players/3.png");
        this.load.image("player4", "pub/assets/images/players/4.png");
        this.load.image("player5", "pub/assets/images/players/5.png");
        this.load.image("player6", "pub/assets/images/players/6.png");
        this.load.image("player7", "pub/assets/images/players/7.png");
        this.load.image("player8", "pub/assets/images/players/8.png");
        this.load.image("player9", "pub/assets/images/players/9.png");
        this.load.image("player10", "pub/assets/images/players/10.png");
        this.load.image("player11", "pub/assets/images/players/11.png");
        this.load.image("player12", "pub/assets/images/players/12.png");
        this.load.image("player13", "pub/assets/images/players/13.png");
        this.load.image("player14", "pub/assets/images/players/14.png");
        this.load.image("player15", "pub/assets/images/players/15.png");
        this.load.image("player16", "pub/assets/images/players/16.png");
        this.load.image("player17", "pub/assets/images/players/17.png");
        this.load.image("player18", "pub/assets/images/players/18.png");
        this.load.image("player19", "pub/assets/images/players/19.png");
        this.load.image("player20", "pub/assets/images/players/20.png");
        this.load.image("player21", "pub/assets/images/players/21.png");
        this.load.image("player22", "pub/assets/images/players/22.png");
        this.load.image("player23", "pub/assets/images/players/23.png");
        this.load.image("player24", "pub/assets/images/players/24.png");
        this.load.image("player25", "pub/assets/images/players/25.png");
        this.load.image("player26", "pub/assets/images/players/26.png");
        this.load.image("player27", "pub/assets/images/players/27.png");
        this.load.image("player28", "pub/assets/images/players/28.png");
        this.load.image("player29", "pub/assets/images/players/29.png");
        this.load.image("player30", "pub/assets/images/players/30.png");

        this.load.image("otherPlayer1", "pub/assets/images/players/1.png");
        this.load.image("otherPlayer2", "pub/assets/images/players/2.png");
        this.load.image("otherPlayer3", "pub/assets/images/players/3.png");
        this.load.image("otherPlayer4", "pub/assets/images/players/4.png");
        this.load.image("otherPlayer5", "pub/assets/images/players/5.png");
        this.load.image("otherPlayer6", "pub/assets/images/players/6.png");
        this.load.image("otherPlayer7", "pub/assets/images/players/7.png");
        this.load.image("otherPlayer8", "pub/assets/images/players/8.png");
        this.load.image("otherPlayer9", "pub/assets/images/players/9.png");
        this.load.image("otherPlayer10", "pub/assets/images/players/10.png");
        this.load.image("otherPlayer11", "pub/assets/images/players/11.png");
        this.load.image("otherPlayer12", "pub/assets/images/players/12.png");
        this.load.image("otherPlayer13", "pub/assets/images/players/13.png");
        this.load.image("otherPlayer14", "pub/assets/images/players/14.png");
        this.load.image("otherPlayer15", "pub/assets/images/players/15.png");
        this.load.image("otherPlayer16", "pub/assets/images/players/16.png");
        this.load.image("otherPlayer17", "pub/assets/images/players/17.png");
        this.load.image("otherPlayer18", "pub/assets/images/players/18.png");
        this.load.image("otherPlayer19", "pub/assets/images/players/19.png");
        this.load.image("otherPlayer20", "pub/assets/images/players/20.png");
        this.load.image("otherPlayer21", "pub/assets/images/players/21.png");
        this.load.image("otherPlayer22", "pub/assets/images/players/22.png");
        this.load.image("otherPlayer23", "pub/assets/images/players/23.png");
        this.load.image("otherPlayer24", "pub/assets/images/players/24.png");
        this.load.image("otherPlayer25", "pub/assets/images/players/25.png");
        this.load.image("otherPlayer26", "pub/assets/images/players/26.png");
        this.load.image("otherPlayer27", "pub/assets/images/players/27.png");
        this.load.image("otherPlayer28", "pub/assets/images/players/28.png");
        this.load.image("otherPlayer29", "pub/assets/images/players/29.png");
        this.load.image("otherPlayer30", "pub/assets/images/players/30.png");
        
        this.load.image('sky', 'pub/assets/images/bg/parallax/7sky.png');
		this.load.image('rocks', 'pub/assets/images/bg/parallax/6rocks.png');
		this.load.image('clouds', 'pub/assets/images/bg/parallax/5clouds.png');
		this.load.image('hills2', 'pub/assets/images/bg/parallax/4hills.png');
		this.load.image('hills1', 'pub/assets/images/bg/parallax/3hills.png');
		this.load.image('trees', 'pub/assets/images/bg/parallax/2trees.png');
		this.load.image('ground', 'pub/assets/images/bg/parallax/1ground.png');
        
        
        this.load.image("alien", "pub/assets/images/enemies/ufo2.png");
        this.load.image("star", "pub/assets/images/misc/star.png");
        this.load.bitmapFont('soupofjustice', 'pub/assets/font/soupofjustice.png', 'pub/assets/font/soupofjustice.fnt');

    }
    create() {
        // define any objects
        console.log("I'm ready..I'm ready!");

        // constants
        const width = this.scale.width;
        const height = this.scale.height;
        
	    // add parallax bg
		this.add.image(width * 0.5, height * 0.5, 'sky').setScrollFactor(0);
		this.add.image(0, height, 'rocks').setOrigin(0, 1).setScrollFactor(0.25);
		this.add.image(1920, height, 'rocks').setOrigin(0, 1).setScrollFactor(0.25);
		this.add.image(0, height, 'clouds').setOrigin(0, 1).setScrollFactor(0.35);
		this.add.image(1920, height, 'clouds').setOrigin(0, 1).setScrollFactor(0.35);
		this.add.image(0, height, 'hills2').setOrigin(0, 1).setScrollFactor(0.50);
		this.add.image(1920, height, 'hills2').setOrigin(0, 1).setScrollFactor(0.50);
		this.add.image(0, height, 'hills1').setOrigin(0, 1).setScrollFactor(0.65);
		this.add.image(1920, height, 'hills1').setOrigin(0, 1).setScrollFactor(0.65);
		this.add.image(0, height, 'trees').setOrigin(0, 1).setScrollFactor(0.75);
		this.add.image(1920, height, 'trees').setOrigin(0, 1).setScrollFactor(0.75);
		this.add.image(0, height, 'ground').setOrigin(0, 1).setScrollFactor(0.90);
		this.add.image(1920, height, 'ground').setOrigin(0, 1).setScrollFactor(0.90);

        
        // add collectibles to screen
        //this.addStars = this.time.delayedCall(100, newStars, [], this);
        
        this.stars = this.physics.add.staticGroup({ key: 'star', frameQuantity: 200 });
        this.starRect = new Phaser.Geom.Rectangle(50, 50, (1920 * 2) - 100, 900);
        
        Phaser.Actions.RandomRectangle(this.stars.getChildren(), this.starRect);

        // add score text & game text to screen
        this.highScoreText = this.add.bitmapText(10, 15, 'soupofjustice', 'High Score: ' + this.highScore, 24).setScrollFactor(0);
        this.scoreText = this.add.bitmapText(10, 45, 'soupofjustice', 'Score: ' + this.score, 24).setScrollFactor(0);
        this.livesText = this.add.bitmapText(10, 75, 'soupofjustice', 'Lives: ' + this.lives, 24).setScrollFactor(0);

        // add enemies
        this.alien = this.physics.add.image(this.game.config.width / 2, 70, "alien").setScale(0.3);
        this.alien.setBounce(0.7);
        this.alien.setCollideWorldBounds(true);
        this.alien.body.setAllowGravity(false);

        // initialize socket.io
        var self = this;
        this.socket = io();
        this.otherPlayers = this.physics.add.group();
        this.socket.on('currentPlayers', function (players) {

            Object.keys(players).forEach(function (id) {
                if (players[id].playerId === self.socket.id) {
                    addPlayer(self, players[id]);
                } else {
                    addOtherPlayers(self, players[id]);
                }
            });

        });
        this.socket.on('newPlayer', function (playerInfo) {
            addOtherPlayers(self, playerInfo);
        });
        this.socket.on('disconnect', function (playerId) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
              if (playerId === otherPlayer.playerId) {
                otherPlayer.destroy();
              }
            });
          });
        
        // camera
        this.cameras.main.setBounds(0, 0, this.game.config.width * 2, this.game.config.height);
        this.physics.world.setBounds(0, 0, 1920 * 2, 1080);
        //this.cameras.main.startFollow(self.player, true, 0.05, 0.05);

        this.cursors = this.input.keyboard.createCursorKeys();
        
        function collectStar (player, star)
        {

            star.destroy();
            this.score ++;
            
            // increase player size until scale = 0.7
            if (this.player.scaleX <= 0.7 || this.player.scaleY <= 0.7) {
                this.player.scaleX += .01;
                this.player.scaleY += .01;
            } else {
                this.player.scaleX = this.player.scaleX;
                this.player.scaleY = this.player.scaleY;
            }
            
            this.scoreText.setText('Score: ' + this.score);
            
            if (this.stars.countActive(true) === 0) {
                
                this.stars = this.physics.add.group({ key: 'star', frameQuantity: 100 });
        
                this.starRect = new Phaser.Geom.Rectangle(50, 50, (1920 * 2) - 100, 900);
                
                Phaser.Actions.RandomRectangle(this.stars.getChildren(), this.starRect);
                
                //this.addStars = this.time.delayedCall(100, newStars, [], this);
            }
     
        }

        function addPlayer(self, playerInfo) {
            self.player = self.physics.add.image(playerInfo.x, playerInfo.y, "player7").setScale(0.3);
            self.player.setCollideWorldBounds(true);
            self.player.setBounce(0.7);
            self.player.setDrag(100);
            self.player.setAngularDrag(100);
            self.player.setMaxVelocity(200);
            //self.physics.overlap(self.player, self.stars, collectStar, null, this);
        }

        function getImage(type) {
            var rnd = Phaser.Math.Between(1, 31);
            var result;
            if (type == "player") {
                result = "player" + rnd;
            } else {
                result = "otherPlayer" + rnd;
            }
            return result;
        }

        function addOtherPlayers(self, playerInfo) {
            const otherPlayer = self.add.image(playerInfo.x, playerInfo.y, "otherPlayer10").setScale(0.3);
            otherPlayer.playerId = playerInfo.playerId;
            self.otherPlayers.add(otherPlayer);
          }
        
    //    function newStars ()
    //    {
    //        this.stars = this.add.group();

    //        for (var i = 0; i < 20; i++) {
    //            var dropPos = Math.floor(Math.random() * this.game.config.width);
    //            this.star = this.physics.add.image(dropPos, 0, 'star');
    //            this.star.setCollideWorldBounds(true);
    //            this.starGroup.add(this.star);
    //        }
    //    }

    }
    update() {
        //constantly running loop
        
    //    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.alien.getBounds())) {
    //        this.lives --;
    //        this.livesText.setText("Lives: " + this.lives);
    //        this.scoreText.setText('Score: ' + this.score);
    //        this.physics.pause();
    //        this.end();
    //    }

        if (this.player) {

            if (this.cursors.left.isDown)
            {
                this.player.setVelocityX(-100);
            }
            else if (this.cursors.right.isDown)
            {
                this.player.setVelocityX(100);
            }
            else
            {
                this.player.setVelocityX(0);
            }

            if (this.cursors.up.isDown)
            {
                this.player.setVelocityY(-150);
            }
            else if (this.cursors.down.isDown)
            {
                this.player.setVelocityY(100);
            }
            else
            {
                this.player.setVelocityY(-50);
            }

            //this.alien.x = this.player.x;
        }
        
    //    var scrol_x = self.player.x - self.game.config.width/2;    
    //    var scrol_y = self.player.y - self.game.config.height/2;    

    //        this.cameras.main.scrollX = scrol_x;    ///  scrollX - Х top left point of camera
    //        this.cameras.main.scrollY = scrol_y;
        
        
    }
    
    end() {
        if (this.lives < 0) {
            if (this.score > this.highScore) {
            
                localStorage.setItem('highscore', this.score);
            }
            this.scene.start('gameOver');
        } else {
            this.create();
        }
    }
}

export default GameScene;