var game = new Phaser.Game(1280, 704, Phaser.AUTO, '', { preload: preload, create: create, update: update, });
var gameWidth = 1280;
var gameHeight = 704;

var player;
function preload() {

    /////////////tile map json ve resim //////////////////
    game.load.tilemap('parachutegame', 'assets/parasutmap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/mappic.png');
    game.load.image('platform', 'assets/bich.png', 306, 76);
    game.load.image('bir', 'assets/bir.png', 1, 50);
    

    //////sprite-hareketli resimler /////////////
    game.load.spritesheet('ucak', 'assets/ucak.png', 120, 64);
    game.load.spritesheet('adam', 'assets/adam.png', 178, 316);
   

    /////////////// AUDIO-SES ////////////////////////////
    game.load.audio('backgroundmusic', 'Sound/bg.wav')
    game.load.audio('airplane', 'Sound/airplanes.wav')
    game.load.audio('jumpsound', 'Sound/jump.wav')
    game.load.audio('landing', 'Sound/landing.wav')  

}


//audio
var jumpsound;
var airplane;
var bgmusic;
var landing;

var tween;


//////////////////////////


var map;
var cursors;
var layer;
var CollideLayer;




var ra;
var wind;
var ucak;
var platforms;
var platform;
var adam;
var adamX;
var adamY;


function create() {


    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();

   


    map = game.add.tilemap('parachutegame');

        
    map.addTilesetImage('jomolokko', 'tiles');


    layer = map.createLayer('background');

    CollideLayer = map.createLayer('foreground');

    

    map.setCollisionBetween(0, 5000, true, CollideLayer);

    layer.resizeWorld();



    platform= game.add.group();
    platform.enableBody = true;
    platform.physicsBodyType = Phaser.Physics.ARCADE;

    var platforms = platform.create(600, 565, 'platform'); //600 565
    game.physics.arcade.enable(platforms);
    platforms.immovable = true;
    platforms.body.moves = false;
    
    //////////piksel

    //piksel = game.add.group();
    //piksel.enableBody = true;
    //piksel.physicsBodyType = Phaser.Physics.ARCADE;

    //var piksels = piksel.create(600, 299, 'bir');
    //game.physics.arcade.enable(piksels);
    //piksels.immovable = true;
    //piksels.body.moves = false;

    //var piksels2 = piksel.create(905, 299, 'bir');
    //game.physics.arcade.enable(piksels2);
    //piksels2.immovable = true;
    //piksels2.body.moves = false;

    //adamX=600;
    //adamY=10;

    adam = game.add.sprite(600, 10 , 'adam');
    adam.visible = false;

    


    ucak = game.add.sprite(1400,10, 'ucak');
    ucak.anchor.setTo(3,3);
    ra = Math.floor((Math.random() * 200) + 100);

   

    wind = game.add.text(738, 16, 'wind=' + ra.toString(), { fontSize: '32px', fill: '#000' });
    wind.fixedToCamera = true;

    

    game.physics.arcade.enable(ucak);

    ucak.body.bounce.y = 0.2;
    ucak.body.gravity.y = 0;
    ucak.body.gravity.x=0;
    ucak.body.collideWorldBounds = true;


    game.physics.enable(ucak, Phaser.Physics.ARCADE);


   

    ///////////// AUDIO /////////
    jumpsound = game.add.audio('jumpsound');
    airplane = game.add.audio('airplane');
    bgmusic = game.add.audio('backgroundmusic');
    landing = game.add.audio('landing');


    airplane.play();
    airplane.allowMultiple = true;
    airplane.loopFull(20.1);
    bgmusic.play();
    bgmusic.allowMultiple = true;
   

    airplane.volume =0.07;
    bgmusic.volume = 0.5;
    jumpsound.volume = 0.7;

  

    var ucaks = game.add.tween(ucak).to({ x: -10000 }, 55000, Phaser.Easing.Linear.None, true, 0, 50000, true);

}

var Text1;
var Text2;


function update() {

      game.physics.arcade.collide(adam, CollideLayer);

        game.physics.arcade.collide(adam, platform);

        //game.physics.arcade.collide(adam, piksel);

       // game.physics.arcade.collide(piksel, platform);
        game.physics.arcade.enable(adam);

        adam.body.collideWorldBounds = true;


        if (game.physics.arcade.collide(adam, platform)) {              //adam.body.onFloor() && adam.body.collide

            adam.immovable = true;
            adam.body.moves = false;


            Text1 = game.add.text(150, 220, ' BRAVO YARDIRDIN ', { font: '60px Arial', fill: '#483D8B' });
            Text1.visible = true;
            Text1.fixedToCamera = true;

            landing.play();
        }
        else if (adam.body.onFloor()) {
            adam.immovable = true;
            adam.body.moves = false;

            Text1 = game.add.text(150, 220, ' ÇİMLERE BASMA DEMEMİŞMİYDİK ', { font: '60px Arial', fill: '#483D8B' });
            Text1.visible = true;
            Text1.fixedToCamera = true;


            landing.play();
        }


    if (cursors.down.isDown) {
        jumpsound.play();
        //adam.enableBody = true;
        adamX = ucak.position.x;
        adam.position.x = adamX-350;
       // adamY = ucak.position.y;
       

        
        //adam.position.y = adamY;

        adam.visible = true;

        adam.body.gravity.y = 400;
        adam.body.gravity.x = ra;
        //adam.body.collideWorldBounds = true;

                      
   
    }
    

}



