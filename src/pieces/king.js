import { isSameColumn, isSameDiagonal, isSameRow } from '../helpers';
import Piece from './piece';

const whiteURL = "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg"
const blackURL = "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"

export default class King extends Piece {
    constructor(player) {
        super(player, (player === 1 ? whiteURL : blackURL));
    }

    getPossibleMoves(src, pieces) {
        let possibleMoves = [], direction = [-9, -8, -7, 1, 9, 8, 7, -1];
        for (let i = 0; i < direction.length; i++) {
            let dest = src + direction[i];
            if (this.isMovePossible(src, dest, pieces)) {
                possibleMoves.push(dest);
            }
        }
        return possibleMoves;
    }

    isMovePossible(src, dest, pieces) {
        if (pieces[dest] && pieces[dest].player === this.player) 
            return false;
        return (
            (src - 9 === dest && isSameDiagonal(src, dest)) ||
            (src - 8 === dest && isSameColumn(src, dest)) ||
            (src - 7 === dest && isSameDiagonal(src, dest)) ||
            (src + 1 === dest && isSameRow(src, dest)) ||
            (src + 9 === dest && isSameDiagonal(src, dest)) ||
            (src + 8 === dest && isSameColumn(src, dest)) ||
            (src + 7 === dest && isSameDiagonal(src, dest)) ||
            (src - 1 === dest && isSameRow(src, dest))
        );
    }

    /**
     * Always returns empty array because King can only move 1 step.
     * @return {[]} 
     */
    getSrcToDestPath(src, dest) {
        return [];
    }
}