/// <reference path="../../vendor/ts/phaser.d.ts" />


class MainState extends Phaser.State {
    preload() {
        console.log("state MainState preloading");
    }

    create() {
    }

    update() {
    }
}


let game = new Phaser.Game(400, 400, Phaser.AUTO, '');
game.state.add('MainState', MainState);
game.state.start('MainState');