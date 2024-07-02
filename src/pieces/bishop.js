import Piece from './piece';

const whiteURL = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg";
const blackURL = "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg";

export default class Bishop extends Piece {
    constructor(player) {
        super(player, (player === 1 ? whiteURL : blackURL));
    }

    isMovePossible(src, dest) {
    }

    /**
     * Always returns empty array because King can only move 1 step.
     * @return {[]} 
     */
    getSrcToDestPath(src, dest) {
        return [];
    }
}