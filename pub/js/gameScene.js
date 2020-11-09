class GameScene extends Phaser.Scene {
    constructor() {
        super('gameScene');
    }

    
    init() {
        // initialize game variables
        
    }

    preload() {
        
        // load any images or sounds

        this.load.audio('collect', 'pub/assets/audio/zapThreeToneUp.mp3');
        this.load.audio('abduct', 'pub/assets/audio/pepSound2.mp3');

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
        
        
        this.load.image('alien', 'pub/assets/images/enemies/ufo2.png');
        this.load.image("star", "pub/assets/images/misc/star.png");
        this.load.bitmapFont('soupofjustice', 'pub/assets/font/soupofjustice.png', 'pub/assets/font/soupofjustice.fnt');

    }
    create() {
        // define any objects
        console.log("I'm ready..I'm ready!");

        // constants
        const width = this.scale.width;
        const height = this.scale.height;
        
        // initialize socket.io
        var self = this;
        this.socket = io();
        this.otherPlayers = this.physics.add.group();
        this.stars = this.physics.add.group();

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

        // add score text & game text to screen
        this.highScoreText = this.add.bitmapText(25, 15, 'soupofjustice', '', 24).setScrollFactor(0);
        this.scoreText = this.add.bitmapText(25, 45, 'soupofjustice', '', 24).setScrollFactor(0);
        //this.livesText = this.add.bitmapText(10, 75, 'soupofjustice', 'Lives: ' + this.lives, 24).setScrollFactor(0);

        this.socket.on('scoreUpdate', function (players) {
            Object.keys(players).forEach(function (id) {
                if (players[id].playerId === self.socket.id) {
                    self.scoreText.setText('Score: ' + players[id].score);
                    self.physics.resume();
                }
            })
        });

        this.socket.on('leaderboardUpdate', function (leaderboard) {
            if (leaderboard.highScore == 0) {
                self.highScoreText.setText(`High Score: ---`);
            } else {
                self.highScoreText.setText(`High Score: ${leaderboard.highScore} (${leaderboard.playerName})`);
            }
        });

        this.socket.on('starLocation', function (starLocation) {
            if (self.star) self.star.destroy();
            self.star = self.physics.add.image(starLocation.x, starLocation.y, 'star');
            console.log(`star.x: ${self.star.x}, star.y: ${self.star.y}.`)
            self.physics.add.overlap(self.player, self.star, function () {
                self.physics.pause();
                this.sound.play('collect');
                this.socket.emit('starCollected');
            }, null, self);
        });

        this.socket.on('starGroup', function (stars) {
            Object.keys(stars).forEach(function (id) {
                self.stars.create(stars[id].x, stars[id].y, 'star');
                console.log(`Star added! x: ${stars[id].x}, y: ${stars[id].y}.`);
            });
            console.log(`Star count: ${self.stars.countActive(true)}`);
            self.physics.add.overlap(self.player, self.stars, collectStar, null, self);
        });

        function collectStar (player, star) {
            console.log(`Star collected! star x: ${star.x}, y: ${star.y}.`);
            //star.disableBody(true, true);
            this.sound.play('collect');
            this.socket.emit('starCollected', { starCollected: star });
            star.destroy();
        }

        this.socket.on('ufoPosition', function (ufo) {
            self.alien = self.physics.add.image(ufo.x, 75, "alien").setScale(0.4);
            self.alien.setCollideWorldBounds(true);
            self.alien.setBounce(1);
            self.alien.setVelocityX(ufo.vel);
            self.physics.add.overlap(self.player, self.alien, function () {
                //this.sound.play('captured');
                var player = self.player;
                self.physics.pause();
                this.socket.emit('playerAbducted', { player });
            }, null, self);            
        });

        this.socket.on('playerRespawn', function (player) {
            console.log(`Player respawned: ${player.name}.`)
            self.player.x = player.x;
            self.player.y = player.y;
            self.physics.resume();
        });

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

        this.socket.on('playerMoved', function (playerInfo) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    otherPlayer.setPosition(playerInfo.x, playerInfo.y);
                }
            });
        });

        this.socket.on('ufoMoved', function (ufoInfo) {
            console.log("ufoMoved triggered");
            self.alien.body.x = ufoInfo.x;
            //self.alien.setVelocityX(ufoInfo.vel);
            self.alien.body.velocity.x = ufoInfo.vel;
        });

        // camera
        this.cameras.main.setBounds(0, 0, this.game.config.width * 2, this.game.config.height);
        this.physics.world.setBounds(0, 0, 1920 * 2, this.game.config.height);

        this.cursors = this.input.keyboard.createCursorKeys();

        function addPlayer(self, playerInfo) {
            self.player = self.physics.add.image(playerInfo.x, playerInfo.y, getImage("player", playerInfo.rnd)).setScale(0.3);
            self.player.setCollideWorldBounds(true);
            self.player.setBounce(0.7);
            self.player.setDrag(100);
            self.player.setAngularDrag(100);
            self.player.setMaxVelocity(200);
            self.cameras.main.startFollow(self.player, true, 0.05, 0.05);
        }

        function getImage(type, num) {
            var result;
            if (type == "player") {
                result = "player" + num;
                console.log(result);
            } else {
                result = "otherPlayer" + num;
            }
            return result;
        }

        function addOtherPlayers(self, playerInfo) {
            const otherPlayer = self.add.image(playerInfo.x, playerInfo.y, getImage("other", playerInfo.rnd)).setScale(0.3);
            otherPlayer.playerId = playerInfo.playerId;
            self.otherPlayers.add(otherPlayer);
          }

        function addStars(self, stars) {
            for (var s in stars) {
                var star = this.physics.add.image(s.x, s.y, 'star');
                this.stars.add(star);
            }
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
                this.player.setVelocityX(-150);
            }
            else if (this.cursors.right.isDown)
            {
                this.player.setVelocityX(150);
            }
            else
            {
                this.player.setVelocityX(0);
            }

            if (this.cursors.up.isDown)
            {
                this.player.setVelocityY(-200);
            }
            else if (this.cursors.down.isDown)
            {
                this.player.setVelocityY(150);
            }
            else
            {
                this.player.setVelocityY(0);
            }

            if (this.alien) {

                // keep ufo in view
                if (this.alien.body.x > this.physics.world.width - 100) {
                    this.alien.setVelocityX(-75);
                } else if (this.alien.body.x == 0) {
                    this.alien.setVelocityX(75);
                }
                
                // emit ufo movement

                var alienX = this.alien.body.x;
                var alienV = this.alien.body.velocity.x;

                // send updated ufo position
                if (this.alien.oldPosition && (alienX !== this.alien.oldPosition.x)) {
                    this.socket.emit('ufoMovement', { x: this.alien.body.x, vel: this.alien.body.velocity.x });
                }

                this.alien.oldPosition = {
                    x: this.alien.body.x,
                    vel: this.alien.body.velocity.x,
                };
                
                // move player towards ufo if player is directly under ufo
                if (this.player.x >= this.alien.body.x && this.player.x <= (this.alien.body.x + (this.alien.body.width))) {
                    this.player.setVelocityY(-300);
                    this.player.setTint(0xff0000);
                    this.sound.play('abduct');
                } else {
                    this.player.clearTint();
                }

                //console.log(`ufo velocity: ${this.alien.body.velocity.x}.`);
            }

            // emit player movement
            var x = this.player.x;
            var y = this.player.y;
            
            if (this.player.oldPosition && (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y)) {
                this.socket.emit('playerMovement', { x: this.player.x, y: this.player.y });
            }
            
            // save old position data
            this.player.oldPosition = {
                x: this.player.x,
                y: this.player.y,
            };

        }        
        
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