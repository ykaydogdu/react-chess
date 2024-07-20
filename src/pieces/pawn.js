import Piece from './piece';

const whiteURL = "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg";
const blackURL = "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg";

export default class Pawn extends Piece {
    constructor(player) {
        super(player, (player === 1 ? whiteURL : blackURL));
        this.startingPosition = (player === 1 ? [48,49,50,51,52,53,54,55] : [8,9,10,11,12,13,14,15]);
    }

    isMovePossible(src, dest, squares) {
        let increment = (this.player === 1 ? -8 : 8);
        if (squares[dest]) {
            if (squares[dest].player === this.player) {
                return false;
            }

            // Capture
            if (dest === src + increment + 1 || dest === src + increment - 1) {
                return true;
            }
        } else {
            // Starting move
            if (this.startingPosition.indexOf(src) !== -1 && dest === src + 2 * increment && !squares[dest]) {
                return true;
            }
            // Move
            if (dest === src + increment && !squares[dest]) {
                return true;
            }   
        }
        return false;
    }

    /**
     * Returns array of one if 2 square starting move else returns empty array
     * @return {[array]} 
     */
    getSrcToDestPath(src, dest) {
        if (this.startingPosition.indexOf(src) === -1) {
            return [];
        }
        if (dest === src - 16) {
            return [src - 8];
        } else if (dest === src + 16) {
            return [src + 8];
        }
        return [];
    }
}