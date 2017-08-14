/// <reference path="../../../vendor/ts/phaser.d.ts" />
/// <reference path="../Utils/log.ts" />


/**
* Namespace containing game states
*/
namespace States {
    /**
    * State created to load assets needed by PreloaderState so 
    * PreloaderState can use it's preload function to load
    * everything else while displaying assets that were loaded
    * in this PreparePreloaderState state
    */
    export class PreparePreloaderState extends Phaser.State {
        /**
        * Called first when state starts
        * Used to preload assets and etc.
        * PreparePreloaderState will preload 
        * all assets needed by PreloaderState
        */
        preload() {
            Utils.log("PreparePreloaderState started");
        }

        /**
        * Called once preload is done
        * Used to create instances of all needed objects and
        * place them somewhere on screen.
        * Here PreparePreloaderState will start PreloaderState
        */
        create() {
            // start preloader
            this.game.state.start("PreloaderState");
        }

        /**
        * Called repeatedly once create function is done
        */
        update() {
        }
    }
}