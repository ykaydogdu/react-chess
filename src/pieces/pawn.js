import Piece from './piece';

const whiteURL = "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg";
const blackURL = "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg";

export default class Pawn extends Piece {
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