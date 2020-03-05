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

    addCategoryData = () => {

        let newCategoryData = this.state.rawCategoryData;
        let content = [];

        newCategoryData.push(
            {
                name: this.state.newCategoryName,
                amount: this.state.newCategoryAmount
            });

        newCategoryData.forEach(category => {
            content.push(
                (
                    <tr>
                        <td>
                            <button type="button" className="category-delete">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            {category.name}
                        </td>
                        <td>${category.amount}</td>
                    </tr>
                )
            )
        });

        this.setState({
            rawCategoryData: newCategoryData,
            tableContent: content,
            newCategoryName: "",
            newCategoryAmount: 0
        });

    }

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
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

                            <div className="modal-body">
                                <form>
                                    <Container>
                                        <div className="row modal-content-group">
                                            <div className="form-group col-md-8">
                                                <label htmlFor="budget-name" className="col-form-label">Budget Name</label>
                                                <input
                                                    id="budget-name"
                                                    name="newBudgetName"
                                                    onChange={this.handleInputChange}
                                                    value={this.state.newBudgetName}
                                                    type="text"
                                                    placeholder="Ex: Lifestyle"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="budget-total" className="col-form-label">Total ($)</label>
                                                <input
                                                    id="budget-total"
                                                    name="newBudgetTotal"
                                                    onChange={this.handleInputChange}
                                                    value={this.state.newBudgetTotal}
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="row modal-content-group">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="category-name" className="col-form-label">Category Name</label>
                                                <input
                                                    id="category-name"
                                                    name="newCategoryName"
                                                    onChange={this.handleInputChange}
                                                    value={this.state.newCategoryName}
                                                    type="text"
                                                    placeholder="Ex: Food"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="category-amount" className="col-form-label">Amount ($)</label>
                                                <input
                                                    id="category-amount"
                                                    name="newCategoryAmount"
                                                    onChange={this.handleInputChange}
                                                    value={this.state.newCategoryAmount}
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                            <button
                                                id="btn-add-category"
                                                type="button"
                                                onClick={this.addCategoryData}
                                                class="btn btn-primary">Add</button>
                                        </div>
                                        <Row>
                                            <table id="category-table" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                    {this.state.tableContent}
                                                </tbody>
                                            </table>
                                        </Row>

                                        <Row>
                                            <button
                                                id="btn-save-budget"
                                                type="button"
                                                data-dismiss="modal"
                                                onClick={this.onSave}
                                                class="btn btn-success">Save</button>
                                        </Row>

                                    </Container>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewBudgetModal;