/// <reference path="../../../vendor/ts/phaser.d.ts" />
/// <reference path="../Utils/log.ts" />


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
        */
        preload() {
            Utils.log("PreloaderState started");
        }

        /**
        * Called once preload is done
        * Used to create instances of all needed objects and
        * place them somewhere on screen
        */
        create() {

        }

        /**
        * Called repeatedly once create function is done
        */
        update() {
        }
    }
}