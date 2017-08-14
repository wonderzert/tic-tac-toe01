/// <reference path="../../../vendor/ts/phaser.d.ts" />
/// <reference path="../Utils/log.ts" />
/// <reference path="../Logic/GameField.ts" />
/// <reference path="../config.ts" />



/**
* Namespace containing game states
*/
namespace States {
    /**
    * State created to play the game
    */
    export class GameState extends Phaser.State {
        /**
        * field
        */
        gameField: Logic.GameField;
        board: Phaser.Sprite;

        /**
        * Called first when state starts
        * Used to preload assets and etc.
        * GameState will do nothing here
        */
        preload() {
            Utils.log("GameState started");
        }

        /**
        * Called once preload is done
        * Used to create instances of all needed objects and
        * place them somewhere on screen
        * GameState will create and draw field here
        */
        create() {
            this.gameField = new Logic.GameField();
            this.board = this.game.add.sprite(0, 0, "img/board.png");
        }

        /**
        * Called repeatedly once create function is done
        */
        update() {
        }
    }
}