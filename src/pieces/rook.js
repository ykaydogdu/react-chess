import Piece from './piece';
import { isSameRow, isSameColumn, isPathClean } from '../helpers';

const whiteURL = "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg";
const blackURL = "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg";

export default class Rook extends Piece {
    constructor(player) {
        super(player, (player === 1 ? whiteURL : blackURL));
    }

    isMovePossible(src, dest, squares) {
        if (squares[dest] && squares[dest].player === this.player)
            return false;
        return isPathClean(this.getSrcToDestPath(src, dest), squares) && (isSameRow(src, dest) || isSameColumn(src, dest));
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