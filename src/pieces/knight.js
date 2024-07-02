import Piece from './piece';

const whiteURL = "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg";
const blackURL = "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg";

export default class Knight extends Piece {
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