import React from "react";

import Board from "./board.js";
import initialiseChessBoard from "../helpers/board-initialiser.js";

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            pieces: initialiseChessBoard(),
            squares: Array(64).fill({style: null, overlay:null}),
            player: 1,
            pieceClicked: false,
            selectedPiece: -1,
            possibleMoves: []           
        };
    }

    handleFirstClick(i) {
        const pieces = this.state.pieces.slice(); // copy the pieces array
        const squares = this.state.squares.slice(); // copy the squares array

        // if there is already a piece clicked, remove the green background color and the possible moves
        if (this.state.pieceClicked) {
            squares[this.state.selectedPiece] = { ...squares[this.state.selectedPiece], style: {backgroundColor: null} };
            for (let i = 0; i < this.state.possibleMoves.length; i++) {
                squares[this.state.possibleMoves[i]] = { ...squares[this.state.possibleMoves[i]], overlay: null };
            }
        }

        const piece = pieces[i];
        if (piece && piece.player === this.state.player) { // if the piece clicked belongs to the current player
            squares[i] = { ...squares[i], style: {backgroundColor: "RGB(111,143,114)"} }; // change the background color of the square to green
            const possibleMoves = piece.getPossibleMoves(i, pieces); // get the possible moves of the piece and make them green
            for (let j = 0; j < possibleMoves.length; j++) {
                if (pieces[possibleMoves[j]]) { // if there is a piece in the possible move square
                    squares[possibleMoves[j]] = { ...squares[possibleMoves[j]], overlay:"possible-capture" };
                } else {
                    squares[possibleMoves[j]] = { ...squares[possibleMoves[j]], overlay:"possible-move" };
                }
            }
            this.setState({
                squares: squares,
                pieceClicked: true,
                possibleMoves: possibleMoves,
                selectedPiece: i,
            });
        } else {
            this.setState({
                squares: squares,
                pieceClicked: false,
                selectedPiece: -1,
            });
        }
    }

    handleSecondClick(i) {
        const pieces = this.state.pieces.slice(); // copy the pieces array
        const squares = this.state.squares.slice(); // copy the squares array
        // check if the move is impossible
        const src = this.state.selectedPiece;
        const dest = i;
        if (this.state.possibleMoves.indexOf(dest) === -1) { // move impossible
            this.handleFirstClick(i); // this is a new click
            return;
        }

        squares[src] = { ...squares[src], style: {backgroundColor: null} }; // remove the green background color of the source square
        for (let i = 0; i < this.state.possibleMoves.length; i++) {
            squares[this.state.possibleMoves[i]] = { ...squares[this.state.possibleMoves[i]], overlay: null }; // remove the overlay
        }

        let moveExecuted = false;
        const testPieces = pieces.slice();
        testPieces[dest] = testPieces[src]; // move the piece to the destination square
        testPieces[src] = null; // remove the piece from the source square
        // now check if the move puts the player's own king in check
        if (!this.isCheck(testPieces, this.state.player)) {
            pieces[dest] = pieces[src]; // move the piece to the destination square
            pieces[src] = null; // remove the piece from the source square
            moveExecuted = true;
            // check if the move puts the opponent's king in check
            if (this.isCheck(pieces, this.state.player === 1 ? 2 : 1)) {
                // insert red gradient into the background of the opponent's king
                for (let i = 0; i < pieces.length; i++) {
                    if (pieces[i] && pieces[i].player === (this.state.player === 1 ? 2 : 1) && pieces[i].constructor.name === "King") {
                        squares[i].overlay = "checked";
                        break;
                    }
                }
            }
        }

        this.setState({
            pieces: pieces,
            squares: squares,
            player: moveExecuted ? (this.state.player === 1 ? 2 : 1) : this.state.player,
            pieceClicked: false,
        });
    }

    handleClick(i) {
        this.state.pieceClicked ? this.handleSecondClick(i) : this.handleFirstClick(i);
    }

    isCheck(squares, player) {
        let kingPosition = null;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] && squares[i].player === player && squares[i].constructor.name === "King") {
                kingPosition = i;
                break;
            }
        }
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] && squares[i].player !== player) {
                if (squares[i].isMovePossible(i, kingPosition, squares)) {
                    return true;
                }
            }
        }
        return false;
    }

    render() {
        return (
            <div className="game">
                <div className="chess-board">
                    <Board
                        pieces={this.state.pieces}
                        squares={this.state.squares}
                        onClick={(i) => this.handleClick(i)}
                        key={'chess-board'}
                    />
                </div>
            </div>
        );
    }
}