import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import NewBudgetModal from "../components/NewBudgetModal";
import PieChart from "../components/PieChart";
import { Container, Row } from "../components/Grid";
import API from "../utils/API";
import "./Budget.css";
import Transactions from "../components/Transaction";
import newTransactionModal from "../components/Transaction";

let containerStyle = {
    "background-color": "red",
    "z-index": -15
}

class Budget extends Component {

    state = {
        currentBudget: "",
        newCategoryName: "",
        newCategoryAmount: 0,
        tableContent: [],
        pieData: [],
        budgetVerified: false,
        budgetCreated: false,
        userBudgets: [],
        userTransactions: [],
        budget: {
            budgetName: "",
            budgetTotal: 0,
            categories: []
        }
    }

    componentDidMount() {
        this.checkForUser();
    }

    checkForUser = () => {
        let user = sessionStorage.getItem("username");
        if (!user) {
            window.location.pathname = "";
        } else {
            API.getUser(user)
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
    }

    addCategoryData = () => {

        let newCategoryData = this.state.budget.categories;

        newCategoryData.push(
            {
                categoryName: this.state.newCategoryName,
                categoryAmount: this.state.newCategoryAmount
            });

        this.updateCategoryTable(newCategoryData);

    }


    

    removeCategory = name => {
        let newCategoryData = this.state.budget.categories;

        newCategoryData = newCategoryData.filter(category => category.categoryName != name);

        this.updateCategoryTable(newCategoryData);

    }

    updateCategoryTable = (categoryData) => {

        let content = [];

        categoryData.forEach(category => {
            content.push(
                (
                    <tr>
                        <td>
                            <button type="button" className="category-delete" onClick={() => this.removeCategory(category.categoryName)}>
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
            tableContent: content,
            newCategoryName: "",
            newCategoryAmount: 0,
            budgetVerified: this.verifyBudgetInfo(),
            budget: {
                budgetName: this.state.budget.budgetName,
                budgetTotal: this.state.budget.budgetTotal,
                categories: categoryData
            }
        });

    }

    handleInputChange = event => {
        const { name, value } = event.target;

        if (name === "budgetName") {
            this.setState({
                budget: {
                    budgetName: value,
                    budgetTotal: this.state.budget.budgetTotal,
                    categories: this.state.budget.categories
                },
                budgetVerified: this.verifyBudgetInfo()
            });
        } else if (name === "budgetTotal") {
            this.setState({
                budget: {
                    budgetName: this.state.budget.budgetName,
                    budgetTotal: value,
                    categories: this.state.budget.categories
                },
                budgetVerified: this.verifyBudgetInfo()
            });
        } else {
            this.setState({
                [name]: value
            })
        }
    }

    deleteBudget = () => {

        let user = sessionStorage.getItem("username");
    
        API.deleteBudget(user, this.state.currentBudget)
            .then(res => {
                this.checkForUser();
            })
            .catch(err => console.log(err));
        this.updatePieChart(this.state.budget.name);

    }

    

    createBudget = () => {

        let user = sessionStorage.getItem("username");
        let updatedBudgets = this.state.userBudgets;
        updatedBudgets.push(this.state.budget);

        API.addBudget(user, this.state.budget)
            .then(res => {
                this.setState({
                    userBudgets: updatedBudgets
                })
            })
            .catch(err => console.log(err));
        this.updatePieChart(this.state.budget.name);
    }

    addTransaction = (budgetName) => {
        let user = sessionStorage.getItem("username");

        if (!user) {
            window.location.pathname = "";
        } else {
            API.addTransaction(user, this.state.currentBudget)
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        }
    }

    updatePieChart = (budgetName) => {

        this.state.userBudgets.forEach(budget => {
            if (budgetName === budget.budgetName) {
                let dataPoints = [];
                let budgetTotal = parseInt(budget.budgetTotal);
                budget.categories.forEach(category => {
                    let amount = parseInt(category.categoryAmount);
                    dataPoints.push(
                        { label: category.categoryName, y: (Math.round((amount / budgetTotal) * 100)), indexLabel: `$${category.categoryAmount}` }
                    )
                })

                this.setState({
                    currentBudget: budgetName,
                    budgetCreated: true,
                    pieData: dataPoints,
                    tableContent: [],
                    budget: {
                        budgetName: "",
                        budgetTotal: 0,
                        categories: []
                    }
                });
            }
        });
    }

    verifyBudgetInfo = () => {

        if ((this.state.budget.categories.length != 0) && (this.state.budget.budgetTotal > 0) && this.state.budget.budgetName != "") {
            return true;
        } else {
            return false;
        }
    }

    render() {

        let pieChart = "";

        if (this.state.budgetCreated) {
            pieChart = (<PieChart budgetName={this.state.currentBudget} pieData={this.state.pieData} />)
        }

        let budgetIcons = [];
        this.state.userBudgets.forEach(budget => {
            let newBudgetButton = (
                <div className="user-bdgt" onClick={() => { this.updatePieChart(budget.budgetName) }}>
                    <div budget-name={budget.budgetName}></div>
                </div>
            );
            budgetIcons.push(newBudgetButton);
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
                                            name="budgetName"
                                            onChange={this.handleInputChange}
                                            value={this.state.budget.budgetName}
                                            type="text"
                                            placeholder="Ex: Lifestyle"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="budget-total" className="col-form-label">Total ($)</label>
                                        <input
                                            id="budget-total"
                                            name="budgetTotal"
                                            onChange={this.handleInputChange}
                                            value={this.state.budget.budgetTotal}
                                            type="number" min="1"
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
                                            type="number" min="1"
                                            className="form-control"
                                        />
                                    </div>
                                    <button
                                        id="btn-add-category"
                                        type="button"
                                        onClick={this.addCategoryData}
                                        disabled={((this.state.newCategoryAmount <= 0) || !this.state.newCategoryName)}
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
                <button
                                        id="btn-delete-budget"
                                        type="button"                            
                                        onClick={this.deleteBudget}
                                        className="btn btn-success">
                                            Delete this budget</button>

                {pieChart}

                <button type="button" className="form-group col-md-4" data-toggle="modal" data-target="#newTransactionModal"
                    id="btn-new-transaction"
                    type="button"
                    data-dismiss="modal"
                    className="btn btn-success">Add latest transaction</button>




                <newTransactionModal><div>
                <div id="newTransactionModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <form>
                    <Container>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">New Transaction</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Category
  </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" href="#">Somehow have catagories of current budget here</a>
                                            <a class="dropdown-item" href="#">and here</a>
                                            <a class="dropdown-item" href="#">and here too</a>
                                        </div>


                                        <div className="form-group col-md-12">
                                        <label htmlFor="transction-name" className="col-form-label">Transaction Name</label>
                                        <input
                                            id="transaction-name"
                                            name="newTransactionName"
                                            onChange={this.handleInputChange}
                                            value={this.state.newTransactionName}
                                            type="text"
                                            placeholder="Ex: restaurant bill"
                                            className="form-control"
                                        />
                                    </div>


                                    <div className="form-group col-md-12">
                                        <label htmlFor="transaction-amount" className="col-form-label">Amount Spent ($)</label>
                                        <input
                                            id="transaction-amount"
                                            name="newTransactionAmount"
                                            onChange={this.handleInputChange}
                                            value={this.state.newTransactionAmount}
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                    <button className="form-group col-md-4"
                                        id="btn-save-transaction"
                                        type="button"
                                        data-dismiss="modal"
                                        onClick={this.addTransaction}
                                        className="btn btn-success">Save Transaction</button>
                                    </div>





                            {this.props.children}
                        </div>
                    </div>
                    </Container>
                    </form>
                </div>
                
            </div>

                </newTransactionModal>



            </Container>

        );
    }

}

export default Budget;