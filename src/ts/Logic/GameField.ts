
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

        /**
        * number of turns. 9 turns => field is full and game should be ended
        */
        turnCount: number;

        constructor() {
            this.data = [["", "", ""],
                         ["", "", ""],
                         ["", "", ""]];

            this.players = [new Player("x", false), new Player("o", true)];
            this.turnCount = 0;
            this.currentPlayerIndex = 0;
        }

        switch_player() {
            if (this.currentPlayerIndex == 1) {
                this.currentPlayerIndex = 0;
            } else {
                this.currentPlayerIndex = 1;
            }
        }

        /**
        * Returns "" if nobody won,
        * "x" if first player,
        * "o" if second one. 
        */
        check_win(): string {
            let answer = "";

            // first row
            if ((this.data[0][0] == this.data[0][1]) && (this.data[0][1] == this.data[0][2]))
                answer = this.data[0][0];

            // second row
            if ((this.data[1][0] == this.data[1][1]) && (this.data[1][1] == this.data[1][2]))
                answer = this.data[1][0];

            // third row
            if ((this.data[2][0] == this.data[2][1]) && (this.data[2][1] == this.data[2][2]))
                answer = this.data[2][0];

            // first column
            if ((this.data[0][0] == this.data[1][0]) && (this.data[1][0] == this.data[2][0]))
                answer = this.data[0][0];

            // second column
            if ((this.data[0][1] == this.data[1][1]) && (this.data[1][1] == this.data[2][1]))
                answer = this.data[0][1];

            // third column
            if ((this.data[0][2] == this.data[1][2]) && (this.data[1][2] == this.data[2][2]))
                answer = this.data[0][2];

            // first diagonal
            if ((this.data[0][0] == this.data[1][1]) && (this.data[1][1] == this.data[2][2]))
                answer = this.data[0][0];

            // second diagonal
            if ((this.data[2][0] == this.data[1][1]) && (this.data[1][1] == this.data[0][2]))
                answer = this.data[2][0];

            return answer;
        }

        is_action_possible(action: PlayerAction): boolean {
            // check x range
            if ((action.x < 0) || (action.x > 2)) {
                return false;
            }

            // check y range
            if ((action.y < 0) || (action.y > 2)) {
                return false;
            }

            // check if position is not free for figure to put
            if (!this.data[action.x][action.y]) {
                return false;
            }

            return true;
        }

        /**
        * will change map accordingly to action
        * and switch active player for next turn
        * Will return false if action is impossible
        */
        do_action(action: PlayerAction): boolean {
            if (this.is_action_possible(action)) {
                this.data[action.x][action.y] = this.players[this.currentPlayerIndex].figure;
                this.switch_player();
                return true;
            } else {
                return false;
            }
        }
    }
}