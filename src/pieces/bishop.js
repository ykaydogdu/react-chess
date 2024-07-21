import Piece from './piece';
import { isPathClean, isSameDiagonal } from '../helpers';

const whiteURL = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg";
const blackURL = "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg";

export default class Bishop extends Piece {
    constructor(player) {
        super(player, (player === 1 ? whiteURL : blackURL));
    }

    getPossibleMoves(src, pieces) {
        let possibleMoves = [], direction = [-9, -7, 7, 9];
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
        return isPathClean(this.getSrcToDestPath(src, dest), pieces) && isSameDiagonal(src, dest);
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