/// <reference path="GameField.ts" />


/**
* Namespace Logic contains classes 
* representing non-gui part of game
*/
namespace Logic {

    /**
    * Represents action of player
    * (where player will put his figure)
    */
    export class PlayerAction {
        x: number; // x coordinate of GameField
        y: number; // y coordinate of GameField

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }

    /**
    * Represents data about one of
    * tic-tac-toe players
    */
    export class Player {
        figure: string; // "x" or "o"
        ai: boolean;
        isActionReady: boolean; // is Player ready to say where he will put his figure
        action: PlayerAction; // data about where Player will put his figure

        constructor(figure: string = "x", ai: boolean = false) {
            this.figure = figure;
            this.ai = ai;

            this.isActionReady = false;
        }

        /**
        * Return PlayerAction that human or ai choosen. 
        * Check Player.isActionReady before run
        * or it will throw Exception
        */
        getAction(): PlayerAction {
            if (!this.isActionReady) {
                throw new Error("Action wasn't ready to get");
            } else {
                return this.action;
            }
        }

        /**
        * AI will automatically think
        * and set action and isActionReady 
        * fields of Player
        */
        aiAction(map: GameField): void {
        }

        /**
        * Send user input from GUI to this object
        * function will set action and isActionReady
        * fields of Player
        */
        sendHumanAction(playerAction: PlayerAction): boolean {
            if (this.ai) {
                return false;
            }

            if (this.isActionReady) {
                return false;
            }

            this.action = playerAction;
            this.isActionReady = true;
            return true;
        }
    }
}