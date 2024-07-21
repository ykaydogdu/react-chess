import React from "react";

import "../index.css";

export default class Square extends React.Component {
    render() {
        return (
            <button className={"square " + this.props.shade}
                    style={this.props.style}
                    onClick={this.props.onClick}
            >
                {this.props.overlay || this.props.piece ? <div className="square-content">
                    {this.props.overlay ? <div className={"overlay " + this.props.overlay}></div> : null}
                    {this.props.piece ? <div className={"piece"} style={this.props.piece}></div> : null}
                </div> : null}
            </button>
        );
    }
}