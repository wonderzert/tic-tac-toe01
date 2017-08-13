// import config
/// <reference path="config.ts" />


// import phaser
/// <reference path="../../vendor/ts/phaser.d.ts" />

// import states from Game.States namespace
/// <reference path="States/InitialConfigState.ts" />

// create game object
let game = new Phaser.Game(Game.config.width, Game.config.height, Phaser.AUTO, '');

// adding states
game.state.add('InitialConfigState', States.InitialConfigState);

// start first state
game.state.start('InitialConfigState');