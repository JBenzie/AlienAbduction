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
        this.playerSpeed = 700;
        this.highScore = parseInt(localStorage.getItem('highscore')) || 0;
        
    }

    preload() {
        
        // load any images or sounds
        
        function getRND() {
            return Phaser.Math.Between(1, 30); // used for selecting random player avatar
        }
        
        this.load.image('sky', 'pub/assets/images/bg/parallax/7sky.png');
		this.load.image('rocks', 'pub/assets/images/bg/parallax/6rocks.png');
		this.load.image('clouds', 'pub/assets/images/bg/parallax/5clouds.png');
		this.load.image('hills2', 'pub/assets/images/bg/parallax/4hills.png');
		this.load.image('hills1', 'pub/assets/images/bg/parallax/3hills.png');
		this.load.image('trees', 'pub/assets/images/bg/parallax/2trees.png');
		this.load.image('ground', 'pub/assets/images/bg/parallax/1ground.png');
        
        this.load.image("player", "pub/assets/images/players/" + getRND() + ".png");
        this.load.image("alien", "pub/assets/images/enemies/ufo2.png");
        this.load.image("star", "pub/assets/images/misc/star.png");
        this.load.bitmapFont('soupofjustice', 'pub/assets/font/soupofjustice.png', 'pub/assets/font/soupofjustice.fnt');

    }
    create() {
        // define any objects
        console.log("Ready!");
        
        //this.socket = io();
        
        // contants
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
        
        this.stars = this.physics.add.group({ key: 'star', frameQuantity: 200 });
        
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

        // add player
        this.player = this.physics.add.image(this.game.config.width / 2, height - 50, "player").setScale(0.3);
        this.player.body.setAllowGravity(false);
        this.player.setCollideWorldBounds(true);
        
        this.player.setBounce(0.7);
        this.input.on('pointermove', function(pointer) {
            this.physics.resume();

            // move alien toward player
            this.physics.moveToObject(this.alien, this.player, this.alienSpeed);

            this.tweens.add({
            targets: this.player,
                x: pointer.worldX,
                y: pointer.worldY,
                duration: this.playerSpeed,
                ease: 'Sine.easeOut',
            }, this);
            
            this.physics.overlap(this.player, this.stars, collectStar, null, this);
            
        }, this);
        
        // camera
        this.cameras.main.setBounds(0, 0, this.game.config.width * 2, this.game.config.height);
        this.physics.world.setBounds(0, 0, 1920 * 2, 1080);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        
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
        
        function newStars ()
        {
            this.stars = this.add.group();

            for (var i = 0; i < 20; i++) {
                var dropPos = Math.floor(Math.random() * this.game.config.width);
                this.star = this.physics.add.image(dropPos, 0, 'star');
                this.star.setCollideWorldBounds(true);
                this.starGroup.add(this.star);
            }
        }

    }
    update() {
        //constantly running loop
        
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.alien.getBounds())) {
            this.lives --;
            this.livesText.setText("Lives: " + this.lives);
            this.scoreText.setText('Score: ' + this.score);
            this.physics.pause();
            this.end();
        }
        
        var scrol_x = this.player.x - this.game.config.width/2;    
        var scrol_y = this.player.y - this.game.config.height/2;    

            this.cameras.main.scrollX = scrol_x;    ///  scrollX - Х top left point of camera
            this.cameras.main.scrollY = scrol_y;
        
        
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