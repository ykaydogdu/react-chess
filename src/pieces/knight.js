import Piece from './piece';
import { isSameRow } from '../helpers';

const whiteURL = "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg";
const blackURL = "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg";

export default class Knight extends Piece {
    constructor(player) {
        super(player, (player === 1 ? whiteURL : blackURL));
    }

    isMovePossible(src, dest, squares) {
        if (squares[dest] && squares[dest].player === this.player)
            return false;
        return !isSameRow(src, dest) && (
            (dest === src - 17) ||
            (dest === src - 15) ||
            (dest === src - 10) ||
            (dest === src - 6) ||
            (dest === src + 6) ||
            (dest === src + 10) ||
            (dest === src + 15) ||
            (dest === src + 17)
        );
    }

    /**
     * Always returns empty array because Knight jumps to its destination.
     * @return {[]} 
     */
    getSrcToDestPath(src, dest) {
        return [];
    }
}