import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import NewBudgetModal from "../components/NewBudgetModal";
import PieChart from "../components/PieChart/PieChart.js";
import { Container, Row } from "../components/Grid";
import "./Budget.css";

let containerStyle = {
    "background-color": "red",
    "z-index": -15
}

class Budget extends Component {

    state = {
        newBudgetName: "",
        newBudgetTotal: 0,
        newCategoryName: "",
        newCategoryAmount: 0,
        rawCategoryData: [],
        tableContent: []
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

    render() {


        return (

            <Container>
                
                <Sidebar />
                <NewBudgetModal>
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
                                                class="btn btn-success">Save</button>
                                        </Row>

                                    </Container>
                                </form>
                            </div>
                </NewBudgetModal>
                <PieChart />

            </Container>

        );
    }

}

export default Budget;