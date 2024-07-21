import Piece from './piece';
import { isSameRow, isSameColumn, isPathClean } from '../helpers';

const whiteURL = "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg";
const blackURL = "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg";

export default class Rook extends Piece {
    constructor(player) {
        super(player, (player === 1 ? whiteURL : blackURL));
    }

    getPossibleMoves(src, pieces) {
        let possibleMoves = [], direction = [-8, -1, 1, 8];
        for (let i = 0; i < direction.length; i++) {
            let dest = src + direction[i];
            while (dest < 64 && dest >= 0) {
                if (this.isMovePossible(src, dest, pieces)) {
                    possibleMoves.push(dest);
                    if (pieces[dest] && pieces[dest].player !== this.player)
                        break;
                    dest += direction[i];
                } else break;
            }
        }
        return possibleMoves;
    }

    isMovePossible(src, dest, pieces) {
        if (pieces[dest] && pieces[dest].player === this.player)
            return false;
        return isPathClean(this.getSrcToDestPath(src, dest), pieces) && (isSameRow(src, dest) || isSameColumn(src, dest));
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
        if (Math.abs(src - dest) % 8 === 0) {
            // same column
            incrementBy = 8;
            pathStart += 8;
        } else if (Math.floor(src / 8) === Math.floor(dest / 8)) {
            // same row
            incrementBy = 1;
            pathStart += 1;
        }

        for (let i = pathStart; i < pathEnd; i += incrementBy) {
            path.push(i);
        }
        return path;
    }
}