/// <reference path="../../../vendor/ts/phaser.d.ts" />
/// <reference path="../Utils/log.ts" />
/// <reference path="../config.ts" />



/**
* Namespace containing game states
*/
namespace States {
    /**
    * State created to load game assets and show progress bar
    */
    export class PreloaderState extends Phaser.State {
        // empty progress bar image
        progressbar0: Phaser.Sprite;

        // full progress bar image
        progressbar1: Phaser.Sprite;


        /**
        * Called first when state starts
        * Used to preload assets and etc.
        * PreloaderState will draw progressbar and
        * preload all assets needed by game
        */
        preload() {
            Utils.log("PreloaderState started");

            // empty progress bar image
            this.progressbar0 = this.game.add.sprite(0, Game.config.height, "img/progressbar0.png");
            this.progressbar0.anchor.set(0, 1);

            // full progress bar image
            this.progressbar1 = this.game.add.sprite(0, Game.config.height, "img/progressbar1.png");
            this.progressbar1.anchor.set(0, 1);

            // use phaser's internal progressbar mechanics
            this.game.load.setPreloadSprite(this.progressbar1);


            // load assets
            this.game.load.image("img/board.png", "img/board.png");
            this.game.load.image("img/cell/white.png", "img/cell/white.png");
            this.game.load.image("img/cell/x.png", "img/cell/x.png");
            this.game.load.image("img/cell/o.png", "img/cell/o.png");
        }

        /**
        * Called once preload is done
        * Used to create instances of all needed objects and
        * place them somewhere on screen
        * PreloaderState will clear everything and
        * launch GameState
        */
        create() {
            // clear everything
            this.progressbar0.destroy();
            this.progressbar1.destroy();

            // launch GameState
            this.game.state.start("GameState", true, false);
        }

        /**
        * Called repeatedly once create function is done
        */
        update() {
        }
    }
}