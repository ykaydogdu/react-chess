import Piece from './piece';

const whiteURL = "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg"
const blackURL = "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"

export default class King extends Piece {
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