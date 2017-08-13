// import config
/// <reference path="config.ts" />


// import phaser
/// <reference path="../../vendor/ts/phaser.d.ts" />

// import states from Game.States namespace
/// <reference path="States/InitialConfigState.ts" />



class MainState extends Phaser.State {
    preload() {
        console.log("state MainState preloading");
    }

    create() {
    }

    update() {
    }
}


let game = new Phaser.Game(Game.config.width, Game.config.height, Phaser.AUTO, '');
game.state.add('MainState', MainState);
game.state.start('MainState');