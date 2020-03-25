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
                >Add New Transaction</button>

                <button
                    id="btn-view-transactions"
                    className="btn btn-success col-md-12"
                    type="button"
                    data-toggle="collapse"
                    data-target="#transaction-collapse"
                    aria-expanded="true"
                    aria-controls="transaction-collapse">
                    View Transactions</button>

                <div class="accordion" id="transaction-accordion">

                    <div id="transaction-collapse" class="collapse show" aria-labelledby="headingOne" data-parent="#transaction-accordion">
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
                </div>



            </div>
        )
    }
}

export default Transactions;