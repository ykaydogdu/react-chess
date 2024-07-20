import Piece from './piece';
import { isPathClean, isSameDiagonal } from '../helpers';

const whiteURL = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg";
const blackURL = "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg";

export default class Bishop extends Piece {
    constructor(player) {
        super(player, (player === 1 ? whiteURL : blackURL));
    }

    isMovePossible(src, dest, squares) {
        if (squares[dest] && squares[dest].player === this.player)
            return false;
        return isPathClean(this.getSrcToDestPath(src, dest), squares) && isSameDiagonal(src, dest);
    }

    /**
     * Get path between src and dest (exclusive)
     * @param {number} src
     * @param {number} dest
     * @return {[array]}
     */
    getSrcToDestPath(src, dest) {
        let path = [], pathStart, pathEnd, incrementBy;
        if (src > dest) {
            pathStart = dest;
            pathEnd = src;
        } else {
            pathStart = src;
            pathEnd = dest;
        }
        if (Math.abs(src - dest) % 9 === 0) {
            incrementBy = 9;
            pathStart += 9;
        }
        else {
            incrementBy = 7;
            pathStart += 7;
        }

        for (let i = pathStart; i < pathEnd; i += incrementBy) {
            path.push(i);
        }
        return path;
    }
}