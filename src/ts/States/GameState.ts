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
        /**
        * Graphical representation of field
        */
        cells: Phaser.Sprite[][];
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

            this.cells = [];

            for (let x = 0; x < 3; x++) {
                this.cells[x] = [];
                for (let y = 0; y < 3; y++) {
                    this.cells[x][y] = null;
                }
            }


            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 3; y++) {

                    // width of cell and it's edges * x + 1
                    let coordX = 150 * x + 1;
                    let coordY = 150 * y + 1;


                    // create cell
                    let cell = this.game.add.sprite(coordX, coordY, "img/cell/white.png");
                    cell.inputEnabled = true;

                    // send data to logic part when cell clicked
                    cell.events.onInputDown.add(function(x, y, gameField) {
                        return function() {
                            gameField.send_human_action(x, y);
                        }
                    }(x, y, this.gameField), this);

                    // add cell to array so we can 
                    // access specific cell when
                    // logical part changes
                    // y and x swapped to 
                    // be vertical for y 
                    // and horizontal for x
                    this.cells[y][x] = cell;
                }
            }
        }

        /**
        * Called repeatedly once create function is done
        */
        update() {
            if (this.gameField.action_ready()) {
                this.doActionAndSyncGui();
            }
        }

        /**
        * sync gui with logic part
        */
        syncGui(player: Logic.Player, action: Logic.PlayerAction) {
            let figure = player.figure;

            let texture = {
                x: "img/cell/x.png",
                o: "img/cell/o.png"
            };

            // select texture depend on player's figure
            this.cells[action.x][action.y].loadTexture(texture[figure]);
        }

        doActionAndSyncGui() {
            let player = this.gameField.cur_player();
            let action = this.gameField.cur_action();

            let actionSuccess = this.gameField.do_action();
            if (actionSuccess) {
                this.syncGui(player, action);
            }
        }
    }
}