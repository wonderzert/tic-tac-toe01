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


        /**
        * Called first when state starts
        * Used to preload assets and etc.
        * PreloaderState will draw progressbar and
        * preload all assets needed by game
        */
        preload() {
            Utils.log("PreloaderState started");

            // empty progress bar image
            let progressbar0 = this.game.add.sprite(0, Game.config.height, "img/progressbar0.png");
            progressbar0.anchor.set(0, 1);

            // full progress bar image
            let progressbar1 = this.game.add.sprite(0, Game.config.height, "img/progressbar1.png");
            progressbar1.anchor.set(0, 1);

            // use phaser's internal progressbar mechanics
            this.game.load.setPreloadSprite(progressbar1);


            // load assets
            this.game.load.image("img/board.png", "img/board.png");
        }

        /**
        * Called once preload is done
        * Used to create instances of all needed objects and
        * place them somewhere on screen
        */
        create() {
            this.game.state.start("GameState", true, false);
        }

        /**
        * Called repeatedly once create function is done
        */
        update() {
        }
    }
}