import React, { Component } from "react";
import "./style.css";

class Transactions extends Component {

    render() {

        return (
            <div id="transactions">
                {this.props.children}
                <div id="create-transaction" data-toggle="modal" data-target="#new-transaction-modal"></div>
            </div>
        )
    }
}

export default Transactions;