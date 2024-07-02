import Piece from './piece';

const whiteURL = "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg";
const blackURL = "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg";

export default class Queen extends Piece {
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