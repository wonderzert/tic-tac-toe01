// import config
/// <reference path="config.ts" />


// import phaser
/// <reference path="../../vendor/ts/phaser.d.ts" />

// import states from Game.States namespace
/// <reference path="States/InitialConfigState.ts" />
/// <reference path="States/PreparePreloaderState.ts" />
/// <reference path="States/PreloaderState.ts" />
/// <reference path="States/GameState.ts" />




// create game object
let game = new Phaser.Game(Game.config.width, Game.config.height, Phaser.AUTO, "");

// adding states
game.state.add("InitialConfigState", States.InitialConfigState);
game.state.add("PreparePreloaderState", States.PreparePreloaderState);
game.state.add("PreloaderState", States.PreloaderState);
game.state.add("GameState", States.GameState);

// start first state
game.state.start("InitialConfigState");