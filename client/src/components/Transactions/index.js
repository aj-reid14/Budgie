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

                <h2>Transactions</h2>

                <table id="transaction-table" width="100%">
                    <tbody>
                        <tr>
                            <th className="tr-category">Category</th>
                            <th className="tr-name">Name</th>
                            <th className="tr-amount">Amount</th>
                        </tr>
                        {this.props.children}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Transactions;