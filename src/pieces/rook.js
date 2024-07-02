import Piece from './piece';

const whiteURL = "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg";
const blackURL = "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg";

export default class Rook extends Piece {
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