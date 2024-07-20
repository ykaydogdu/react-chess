import Piece from './piece';
import { isSameRow, isSameColumn, isSameDiagonal, isPathClean } from '../helpers';

const whiteURL = "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg";
const blackURL = "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg";

export default class Queen extends Piece {
    constructor(player) {
        super(player, (player === 1 ? whiteURL : blackURL));
    }

    isMovePossible(src, dest, squares) {
        if (squares[dest] && squares[dest].player === this.player)
            return false;
        return isPathClean(this.getSrcToDestPath(src, dest), squares) && (isSameRow(src, dest) || isSameColumn(src, dest) || isSameDiagonal(src, dest));
    }

    /**
     * Returns array of square indexes that form the path from src to dest  
     * @param {number} src
     * @param {number} dest
     * @return {[array]} 
     */
    getSrcToDestPath(src, dest) {
        let path = [], pathStart, pathEnd, incrementBy;
        pathStart = Math.min(src, dest);
        pathEnd = Math.max(src, dest);
        if (Math.abs(src - dest) % 9 === 0) {
            // move along the diagonal
            incrementBy = 9;
            pathStart += 9;
        } else if (Math.abs(src - dest) % 7 === 0) {
            // move along the diagonal
            incrementBy = 7;
            pathStart += 7;
        } else if (Math.abs(src - dest) % 8 === 0) {
            // move along the column
            incrementBy = 8;
            pathStart += 8;
        } else if (Math.floor(src / 8) === Math.floor(dest / 8)) {
            // move along the row
            incrementBy = 1;
            pathStart += 1;
        }

        for (let i = pathStart; i < pathEnd; i += incrementBy) {
            path.push(i);
        }
        return path;
    }
}