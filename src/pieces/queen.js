import Piece from './piece';
import { isSameRow, isSameColumn, isSameDiagonal, isPathClean } from '../helpers';

const whiteURL = "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg";
const blackURL = "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg";

export default class Queen extends Piece {
    constructor(player) {
        super(player, (player === 1 ? whiteURL : blackURL));
    }

    getPossibleMoves(src, pieces) {
        let possibleMoves = [], direction = [-9, -8, -7, -1, 1, 7, 8, 9];
        for (let i = 0; i < direction.length; i++) {
            let dest = src + direction[i];
            while (dest < 64 && dest >= 0) {
                if (this.isMovePossible(src, dest, pieces)) {
                    possibleMoves.push(dest);
                    if (pieces[dest] && pieces[dest].player !== this.player)
                        break;
                    if (dest % 8 === 0 || dest % 8 === 7)
                        break;
                } else break;
                dest += direction[i];
            }
        }
        return possibleMoves;
    }

    isMovePossible(src, dest, pieces) {
        if (pieces[dest] && pieces[dest].player === this.player)
            return false;
        return isPathClean(this.getSrcToDestPath(src, dest), pieces) && (isSameRow(src, dest) || isSameColumn(src, dest) || isSameDiagonal(src, dest));
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