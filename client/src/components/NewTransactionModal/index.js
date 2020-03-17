import React, { Component } from "react";
import "./style.css";

class NewTransactionModal extends Component {

    state = {
        newTransactionName: "",
        newTransactionAmount: 0,
        //The response would populate the dropdown arrow to choose from
        Category: "",
        
    }

    render() {
        return (
            <div>
                <div id="new-transaction-modal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">New Transaction</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            {this.props.children}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewTransactionModal;