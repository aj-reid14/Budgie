import React, { Component } from "react";
import "./style.css";

class Transactions extends Component {

    render() {

        return (
            <div id="transactions">

                <button
                    id="btn-new-transaction"
                    className="btn btn-success col-md-12"
                    type="button"
                    onClick={this.props.updateCategories}
                    data-toggle="modal"
                    data-target="#new-transaction-modal"
                    data-dismiss="modal"
                >Add latest transaction</button>

                {this.props.children}
            </div>
        )
    }
}

export default Transactions;