import React, { Component } from "react";
import "./style.css";

class Transactions extends Component {

    render() {

        return (
            <div id="transactions">
                {this.props.children}
            </div>
        )
    }
}

export default Transactions;