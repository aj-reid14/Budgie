import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import NewBudgetModal from "../components/NewBudgetModal";
import PieChart from "../components/PieChart";
import { Container, Row } from "../components/Grid";
import API from "../utils/API";
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
        tableContent: [],
        pieData: [],
        budgetVerified: false,
        budgetCreated: false,
        userBudgets: []
    }

    componentDidMount() {
        this.checkForUser();
    }

    checkForUser = () => {
        API.getUser("testUser")
        .then(res => {
            console.log(res);

            if (res.data) {
                let createdBudgets = []
                res.data.budgets.forEach(budget => {
                    createdBudgets.push(budget);
                });

                this.setState({
                    userBudgets: createdBudgets
                })
            }
        });
    }

    addCategoryData = () => {

        let newCategoryData = this.state.rawCategoryData;
        let content = [];

        newCategoryData.push(
            {
                categoryName: this.state.newCategoryName,
                categoryAmount: this.state.newCategoryAmount
            });

        newCategoryData.forEach(category => {
            content.push(
                (
                    <tr>
                        <td>
                            <button type="button" className="category-delete">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            {category.categoryName}
                        </td>
                        <td>${category.categoryAmount}</td>
                    </tr>
                )
            )
        });

        this.setState({
            rawCategoryData: newCategoryData,
            tableContent: content,
            newCategoryName: "",
            newCategoryAmount: 0,
            budgetVerified: this.verifyBudgetInfo()
        });

    }

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });

        if (name === ("newBudgetName" || "newBudgetTotal")) {
            this.setState({
                budgetVerified: this.verifyBudgetInfo()
            })
        }
    }

    createBudget = () => {

        let dataPoints = [];
        let budgetTotal = parseInt(this.state.newBudgetTotal);

        this.state.rawCategoryData.forEach(category => {

            let amount = parseInt(category.categoryAmount);
            
            dataPoints.push(
                {label: category.categoryName, y: (Math.round((amount / budgetTotal) * 100)), indexLabel: `$${category.categoryAmount}`}
            )
        })

        API.createUser("testUser", {
            username: "testUser",
            password: "pkpkpkpk",
            budgets: [{
                budgetName: this.state.newBudgetName,
                budgetTotal: this.state.newBudgetTotal,
                categories: this.state.rawCategoryData
            }]
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));

        this.setState({
            budgetCreated: true,
            pieData: dataPoints
        })
    }

    verifyBudgetInfo = () => {

        if ((this.state.rawCategoryData.length != 0) && (this.state.newBudgetTotal > 0) && this.state.newBudgetName != "") {
            return true;
        } else {
            return false;
        }
    }

    render() {

        let pieChart = "";

        if (this.state.budgetCreated) {
            pieChart = (<PieChart
                            budgetName={this.state.newBudgetName}
                            pieData={this.state.pieData}
                        />)
        }

        let budgetIcons = "";
        this.state.userBudgets.forEach(budget => {
            if (budgetIcons === "") {budgetIcons = <div className="user-bdgt"></div>;}
            else {budgetIcons += <div className="user-bdgt"></div>}
        });


        return (

            <Container>
                
                <Sidebar>
                    {budgetIcons}
                </Sidebar>

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
                                                className="btn btn-primary">Add</button>
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
                                                onClick={this.createBudget}
                                                disabled={!this.state.budgetVerified}
                                                className="btn btn-success">Save</button>
                                        </Row>

                                    </Container>
                                </form>
                            </div>
                </NewBudgetModal>

                {pieChart}

            </Container>

        );
    }

}

export default Budget;