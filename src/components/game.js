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
            turn: "white"            
        };
    }

    handleClick(i) {
        
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.state.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
            </div>
        );
    }
}