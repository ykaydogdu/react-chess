import Bishop from '../pieces/bishop';
import King from '../pieces/king';
import Knight from '../pieces/knight';
import Pawn from '../pieces/pawn';
import Queen from '../pieces/queen';
import Rook from '../pieces/rook';

export default function initialiseChessBoard() {
    const pieces = Array(64).fill(null);

    for (let i = 8; i < 16; i++) {
        pieces[i] = new Pawn(2);
        pieces[i + 40] = new Pawn(1);
    }

    pieces[0] = new Rook(2);
    pieces[1] = new Knight(2);
    pieces[2] = new Bishop(2);
    pieces[3] = new Queen(2);
    pieces[4] = new King(2);
    pieces[5] = new Bishop(2);
    pieces[6] = new Knight(2);
    pieces[7] = new Rook(2);

    pieces[56] = new Rook(1);
    pieces[57] = new Knight(1);
    pieces[58] = new Bishop(1);
    pieces[59] = new Queen(1);
    pieces[60] = new King(1);
    pieces[61] = new Bishop(1);
    pieces[62] = new Knight(1);
    pieces[63] = new Rook(1);

    return pieces;
}