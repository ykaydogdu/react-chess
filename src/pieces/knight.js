import Piece from './piece';

const whiteURL = "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg";
const blackURL = "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg";

export default class Knight extends Piece {
    constructor(player) {
        super(player, (player === 1 ? whiteURL : blackURL));
    }

    getPossibleMoves(src, pieces) {
        let possibleMoves = [], direction = [-17, -15, -10, -6, 6, 10, 15, 17];
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
        const srcRow = Math.floor(src / 8);
        const destRow = Math.floor(dest / 8);

        const srcCol = src % 8;
        const destCol = dest % 8;

        const rowDiff = Math.abs(srcRow - destRow);
        const colDiff = Math.abs(srcCol - destCol);

        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
    }

    /**
     * Always returns empty array because Knight jumps to its destination.
     * @return {[]} 
     */
    getSrcToDestPath(src, dest) {
        return [];
    }
}