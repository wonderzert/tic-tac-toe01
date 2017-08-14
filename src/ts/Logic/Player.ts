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
        action_ready: boolean; // is Player ready to say where he will put his figure
        action: PlayerAction; // data about where Player will put his figure

        constructor(figure: string = "x", ai: boolean = false) {
            this.figure = figure;
            this.ai = ai;

            this.action_ready = false;
        }

        /**
        * Return PlayerAction that human or ai choosen. 
        * Check Player.action_ready before run
        * or it will throw Exception
        */
        get_action(): PlayerAction {
            if (!this.action_ready) {
                throw new Error("Action wasn't ready to get");
            } else {
                return this.action;
            }
        }

        /**
        * Ask Player to do action
        */
        ask_action(map: GameField): void {
            // ensure action is not ready before 
            // Player think about it
            this.action_ready = false;

            if (this.ai) {
                this.ai_action(map);
            }
        }

        /**
        * AI will automatically think
        * and set action and action_ready 
        * fields of Player
        */
        ai_action(map: GameField): void {
        }

        /**
        * Send user input from GUI to this object
        * function will set action and action_ready
        * fields of Player
        */
        send_human_action(playerAction: PlayerAction): boolean {
            if (this.ai) {
                return false;
            }

            if (this.action_ready) {
                return false;
            }

            this.action = playerAction;
            this.action_ready = true;
            return true;
        }
    }
}