class TitleScene extends Phaser.Scene {

	constructor() {
		super({key:'titleScene'});
	}

	preload() {
		var width = this.game.config.width;
		var height = this.game.config.height;
		
		var loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 50,
			text: 'Loading...',
			style: {
				font: '20px monospace',
				fill: '#ffffff'
			}
		});
		loadingText.setOrigin(0.5, 0.5);
		var percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0.5);
	  
		this.load.on('progress', function (value) {
		  percentText.setText(parseInt(value * 100) + '%');
		});
	  
		this.load.on('fileprogress', function (file) {
	  
		});
	  
		this.load.on('complete', function () {
		  console.log('complete');
		  loadingText.destroy();
		  percentText.destroy();
		});

		this.load.image('sky', 'pub/assets/images/bg/parallax/7sky.png');
		this.load.image('rocks', 'pub/assets/images/bg/parallax/6rocks.png');
		this.load.image('clouds', 'pub/assets/images/bg/parallax/5clouds.png');
		this.load.image('hills2', 'pub/assets/images/bg/parallax/4hills.png');
		this.load.image('hills1', 'pub/assets/images/bg/parallax/3hills.png');
		this.load.image('trees', 'pub/assets/images/bg/parallax/2trees.png');
		this.load.image('ground', 'pub/assets/images/bg/parallax/1ground.png');
		
        this.load.image("alien", "pub/assets/images/enemies/ufo2.png");

		this.load.bitmapFont('soupofjustice', 'pub/assets/fonts/soupofjustice.png', 'pub/assets/fonts/soupofjustice.fnt');

		this.load.audio('theme', 'pub/assets/audio/Good-Morning-Doctor-Weird.mp3');
		this.load.audio('click', 'pub/assets/audio/zapThreeToneUp.mp3');
		
	}

	create() {
		
		// background music
		var music = this.sound.add('theme', { volume: 0.25 });
		music.loop = true;
        music.play();

	    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        const width = this.scale.width;
        const height = this.scale.height;
	    
		//this.bg = this.add.sprite(-100, 0, "titleBg").setDisplayOrigin(0.5);
		
		this.add.image(width * 0.5, height * 0.5, 'sky').setScrollFactor(0);
		this.add.image(0, height, 'rocks').setOrigin(0, 1).setScrollFactor(0.25);
		this.add.image(0, height, 'clouds').setOrigin(0, 1).setScrollFactor(0.35);
		this.add.image(0, height, 'hills2').setOrigin(0, 1).setScrollFactor(0.50);
		this.add.image(0, height, 'hills1').setOrigin(0, 1).setScrollFactor(0.65);
		this.add.image(0, height, 'trees').setOrigin(0, 1).setScrollFactor(0.75);
		this.add.image(0, height, 'ground').setOrigin(0, 1).setScrollFactor(0.90);
		
		// add enemies
        this.alien = this.physics.add.image(width / 2, 80, "alien").setScale(0.3);
        this.alien.setBounce(0.7);
        this.alien.setCollideWorldBounds(true);
        this.alien.body.setAllowGravity(false);
		
		this.titleText = this.add.bitmapText(screenCenterX, 150, 'soupofjustice', 'Alien Abduction!', 72).setOrigin(0.5);
		this.altText = this.add.bitmapText(screenCenterX, 250, 'soupofjustice', 'click to start', 56).setOrigin(0.5).setInteractive({ useHandCursor: true  });
        
        this.input.on('pointermove', function (pointer) {

            // move alien toward pointer
            this.physics.moveToObject(this.alien, pointer, 75);
        }, this);

		this.input.on('pointerover', function (event, gameObjects) {

	        gameObjects[0].setTint(0xff0000)
	
	    });
	    
	    this.input.on('pointerout', function (event, gameObjects) {

	        gameObjects[0].clearTint();
	    });
		
		this.input.once('pointerdown', () => {
			this.sound.play('click');
            this.scene.start('gameScene');

        });
	}

}

export default TitleScene;