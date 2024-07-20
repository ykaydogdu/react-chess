import React from "react";

import "../index.css";
import Board from "./board.js";
import initialiseChessBoard from "../helpers/board-initialiser.js";

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: initialiseChessBoard(),
            player: 1,
            pieceClicked: false,
            selectedPiece: -1,           
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice(); // copy the squares array
        if (this.state.pieceClicked) { // if a piece has been clicked before
            // check if the move is possible
            const src = this.state.selectedPiece;
            const dest = i;
            const piece = squares[src];

            if (piece.isMovePossible(src, dest, squares)) {
                squares[src].style = { ...squares[src].style, backgroundColor: null }; // remove the green background color of the source square
                const testSquares = squares.slice();
                testSquares[dest] = testSquares[src]; // move the piece to the destination square
                testSquares[src] = null; // remove the piece from the source square
                // now check if the move puts the player's own king in check
                if (!this.isCheck(testSquares, this.state.player)) {
                    squares[dest] = squares[src]; // move the piece to the destination square
                    squares[src] = null; // remove the piece from the source square
                    this.setState({
                        player: this.state.player === 1 ? 2 : 1,
                        pieceClicked: false,
                    });
                } else {
                    alert("Illegal Move! You can't put yourself in check.");
                }
                this.setState({
                    squares: squares,
                    pieceClicked: false,
                });
            } else {
                squares[this.state.selectedPiece].style = { ...squares[this.state.selectedPiece].style, backgroundColor: null }; // remove the green background color of the source square
                const piece = squares[i];
                if (piece && piece.player === this.state.player) { // if the new piece clicked belongs to the current player
                    squares[i].style = { ...squares[i].style, backgroundColor: "RGB(111,143,114)" }; // change the background color of the square to green
                    this.setState({
                        squares: squares,
                        selectedPiece: i,
                    });
                } else {
                    this.setState({
                        squares: squares,
                        pieceClicked: false,
                    });
                }
            }
        } else {
            const piece = squares[i];
            if (piece && piece.player === this.state.player) { // if the piece clicked belongs to the current player
                squares[i].style = { ...squares[i].style, backgroundColor: "RGB(111,143,114)" }; // change the background color of the square to green
                this.setState({
                    squares: squares,
                    pieceClicked: true,
                    selectedPiece: i,
                });
            }
        }
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
                <div className="game-board">
                    <Board
                        squares={this.state.squares}
                        onClick={(i) => this.handleClick(i)}
                        key={'board'}
                    />
                </div>
            </div>
        );
    }
}