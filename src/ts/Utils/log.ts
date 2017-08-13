/// <reference path="../config.ts" />


/** 
* Has various tools for debugging
*/
namespace Utils {
    /**
    * output data to console when Game.config.debug is true
    * Returns true if it really printed something
    * @param msg {string} what data should be printed
    * @returns {boolean} true if debug success 
    */
    export function log(msg: string): boolean {
        if (Game.config.debug) {
            let debug_msg: string = 
                "[" + Date().toString() + "]" +
                ": " + msg;

            console.log(debug_msg);
            return true;
        }
        return false;
    }
}