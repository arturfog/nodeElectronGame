var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'content',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('bg', 'assets/BG.png');
    this.load.spritesheet('attack', 'assets/attack.png', { frameWidth: 587, frameHeight: 707, endFrame: 8});
    this.load.spritesheet('knight', 'assets/knight.png', { frameWidth: 587, frameHeight: 707, endFrame: 8});
    this.load.spritesheet('walk', 'assets/walk.png', { frameWidth: 587, frameHeight: 707, endFrame: 8});
    this.load.spritesheet('jump', 'assets/jump.png', { frameWidth: 587, frameHeight: 707, endFrame: 8});
    this.load.image('ground', 'assets/ground1.png');
    this.load.image('crate', 'assets/crate.png');
    this.load.image('mush1', 'assets/mush1.png');
}

let platforms;
let player;
let cursors;
let stars;
let score = 0;
let scoreText;

function create ()
{
    this.add.image(400, 300, 'bg');

    platforms = this.physics.add.staticGroup();

    platforms.create(300, 568, 'ground');
    platforms.create(400, 568, 'ground');
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(300, 280, 'knight');

    player.setScale(0.3);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNumbers('attack', { start: 0, end: 9 }),
        frameRate: 18,
        repeat: -1
    });

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('knight', { start: 0, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('walk', { start: 0, end: 9 }),
        frameRate: 18,
        repeat: -1
    });

    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 9 }),
        frameRate: 18,
        repeat: -1
    });

    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
        key: 'mush1',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.physics.add.collider(stars, platforms);

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    player.anims.play('idle', true);
}

function update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('walk', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('walk', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('idle', true);
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }

    if(cursors.up.isDown && !player.body.touching.down) {
        player.anims.play('jump', true);
    }
}