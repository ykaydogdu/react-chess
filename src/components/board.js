import React from "react";

import "../index.css";
import Square from "./square.js";

export default class Board extends React.Component {

    renderSquare(i) { 
        return (
            <Square
                shade={((Math.floor(i / 8) + i % 8) % 2 === 0) ? "light-square" : "dark-square"}
                style={this.props.squares[i] ? this.props.squares[i].style : null}
                keyVal={i}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        const board = [];
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                row.push(this.renderSquare(i * 8 + j));
            }
            board.push(<div key={i} className="board-row">{row}</div>);
        }

        return <>{board}</>;
    }
}
        