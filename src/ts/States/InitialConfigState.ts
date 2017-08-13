/// <reference path="../../../vendor/ts/phaser.d.ts" />
/// <reference path="../Utils/log.ts" />


/**
* Namespace containing game states
*/
namespace States {
    /**
    * State created to configure game scale and phaser basic properties
    */
    export class InitialConfigState extends Phaser.State {
        /**
        * Called first when state starts
        * Used to preload assets and etc.
        */
        preload() {
            Utils.log("InitialConfigState started");
        }

        /**
        * Called once preload is done
        * Used to create instances of all needed objects and
        * place them somewhere on screen.
        * InitialConfigState uses it to setup Phaser.Game object
        * and start PreparePreloaderState
        */
        create() {
            // show whole scene
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            // center horizontally and vertically
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;


            // after needed setup, start
            // preparing preloader
            this.game.state.start("PreparePreloaderState");
        }

        /**
        * Called repeatedly once create function is done
        */
        update() {
        }
    }
}