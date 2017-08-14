
/// <reference path="Player.ts" />


/**
* Namespace Logic contains classes 
* representing non-gui part of game
*/
namespace Logic {

    /**
    * GameField is 3x3 array of cells,
    * operations to work with cells,
    * player quenue handling (and players themselves)
    */
    export class GameField {
        /**
        * field where x and o's placed
        */
        data: string[][];
        players: Player[];
        currentPlayerIndex: number;

        // to lock field after win
        locked: boolean;

        /**
        * number of turns. 9 turns => field is full and game should be ended
        */
        turnCount: number;

        constructor() {
            this.data = [["", "", ""],
                         ["", "", ""],
                         ["", "", ""]];

            this.players = [new Player("x", false), new Player("o", false)];
            this.turnCount = 0;
            this.currentPlayerIndex = 0;
            this.locked = false;
        }

        switchPlayer() {
            if (this.currentPlayerIndex == 1) {
                this.currentPlayerIndex = 0;
            } else {
                this.currentPlayerIndex = 1;
            }
        }

        /**
        * Returns array of winning Phaser.Point s.
        */
        checkWin(): Phaser.Point[] {
            let answer = [];

            // first row
            if ((this.data[0][0] == this.data[0][1]) && (this.data[0][1] == this.data[0][2]) && (this.data[0][2] != ""))
                answer = [new Phaser.Point(0,0), new Phaser.Point(0,1), new Phaser.Point(0,2)];

            // second row
            if ((this.data[1][0] == this.data[1][1]) && (this.data[1][1] == this.data[1][2]) && (this.data[1][2] != ""))
                answer = [new Phaser.Point(1,0), new Phaser.Point(1,1), new Phaser.Point(1,2)];

            // third row
            if ((this.data[2][0] == this.data[2][1]) && (this.data[2][1] == this.data[2][2]) && (this.data[2][2] != ""))
                answer = [new Phaser.Point(2,0), new Phaser.Point(2,1), new Phaser.Point(2,2)];

            // first column
            if ((this.data[0][0] == this.data[1][0]) && (this.data[1][0] == this.data[2][0]) && (this.data[2][0] != ""))
                answer = [new Phaser.Point(0,0), new Phaser.Point(1,0), new Phaser.Point(2,0)];

            // second column
            if ((this.data[0][1] == this.data[1][1]) && (this.data[1][1] == this.data[2][1]) && (this.data[2][1] != ""))
                answer = [new Phaser.Point(0,1), new Phaser.Point(1,1), new Phaser.Point(2,1)];

            // third column
            if ((this.data[0][2] == this.data[1][2]) && (this.data[1][2] == this.data[2][2]) && (this.data[2][2] != ""))
                answer = [new Phaser.Point(0,2), new Phaser.Point(1,2), new Phaser.Point(2,2)];

            // first diagonal
            if ((this.data[0][0] == this.data[1][1]) && (this.data[1][1] == this.data[2][2]) && (this.data[2][2] != ""))
                answer = [new Phaser.Point(0,0), new Phaser.Point(1,1), new Phaser.Point(2,2)];

            // second diagonal
            if ((this.data[2][0] == this.data[1][1]) && (this.data[1][1] == this.data[0][2]) && (this.data[0][2] != ""))
                answer = [new Phaser.Point(2,0), new Phaser.Point(1,1), new Phaser.Point(0,2)];

            if (answer.length > 0) {
                this.locked = true;
            }

            return answer;
        }

        isActionPossible(action: PlayerAction): boolean {
            // check x range
            if ((action.x < 0) || (action.x > 2)) {
                return false;
            }

            // check y range
            if ((action.y < 0) || (action.y > 2)) {
                return false;
            }

            // check if position is not free for figure to put
            if (!(this.data[action.x][action.y] == "")) {
                return false;
            }

            return true;
        }

        /**
        * will change map accordingly to action
        * and switch active player for next turn
        * Will return false if action is impossible
        */
        doAction(): boolean {
            // ensure same action wont trigger doAction again
            this.getCurrentPlayer().isActionReady = false;

            // do nothing if gameField is locked
            if (this.locked) {
                return false;
            }
            
            let action = this.getCurrentPlayer().action;
            if (this.isActionPossible(action)) {
                this.data[action.x][action.y] = this.getCurrentPlayer().figure;
                this.switchPlayer();
                this.turnCount++;
                return true;
            } else {
                return false;
            }
        }

        /**
        * Use this function when you want to send
        * input from GUI (like user clicked on cell)
        * @param x {number} x-index of cell
        * @param y {number} y-index of cell
        * indexes will be reversed automatically so 
        * x will be associated with horizontal order
        * and y - with vertical order. 
        * @return {boolean} false if current player is AI or 
        * action is impossible
        * and true if everything OK and map changed.
        */
        sendHumanAction(x: number, y: number): boolean {
            return this.getCurrentPlayer().sendHumanAction(
                new PlayerAction(y, x)
            );
        }

        // shortcut to current player's isActionReady field
        isActionReady(): boolean {
            return this.getCurrentPlayer().isActionReady;
        }

        // shortcut to current action
        getCurrentPlayerAction(): PlayerAction {
            return this.getCurrentPlayer().action;
        }

        // shortcut to current player
        getCurrentPlayer(): Player {
            return this.players[this.currentPlayerIndex];
        }
    }
}