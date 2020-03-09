import React, { Component } from "react";
import { Input } from "../Form";
import "./style.css";
import { Container, Row } from "../Grid";

class NewBudgetModal extends Component {

    state = {
        newBudgetName: "",
        newBudgetTotal: 0,
        newCategoryName: "",
        newCategoryAmount: 0,
        rawCategoryData: [],
        tableContent: []
    }

    onSave = (event) => {
        if (typeof this.props.budgetData !== "undefined") {
            this.props.budgetData(event.target.value);            
        }
    }

    createNewBudget = () => {

    }

    render() {
        return (
            <div>
                <div id="new-budget-modal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Create New Budget</h5>
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

export default NewBudgetModal;