import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import NewBudgetModal from "../components/NewBudgetModal";
import PieChart from "../components/PieChart";
import { Container, Row } from "../components/Grid";
import API from "../utils/API";
import "./Budget.css";
import Transactions from "../components/Transactions";
import NewTransactionModal from "../components/NewTransactionModal";

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
        budgetUsed: 0,
        userBudgets: [],
        newTransaction: {
            name: "",
            amount: 0,
            category: ""
        },
        transactionCategories: "",
        userTransactions: [],
        transactionContent: [],
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

                        if (this.state.userBudgets.length != 0) {
                            this.updatePieChart(this.state.userBudgets[0].budgetName);
                        }
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

        this.updateCategoryTable(newCategoryData, { op: "+", amount: this.state.newCategoryAmount });

    }

    removeCategory = name => {
        let newCategoryData = this.state.budget.categories;
        let removeAmount = newCategoryData.filter(category => category.categoryName === name)[0].categoryAmount;

        newCategoryData = newCategoryData.filter(category => category.categoryName != name);

        this.updateCategoryTable(newCategoryData, { op: "-", amount: removeAmount });

    }

    updateCategoryTable = (categoryData, operation) => {

        let content = [];
        let amount = operation.amount;

        if (operation.op === "-") {
            amount *= -1;
        };

        let budgetRemaining = parseInt(this.state.budgetUsed) + parseInt(amount);

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
            budgetUsed: budgetRemaining,
            budget: {
                budgetName: this.state.budget.budgetName,
                budgetTotal: this.state.budget.budgetTotal,
                categories: categoryData
            }
        });

    }

    handleInputChange = event => {
        const { name, value } = event.target;

        switch (name) {
            case "budgetName":
                this.setState({
                    budget: {
                        budgetName: value,
                        budgetTotal: this.state.budget.budgetTotal,
                        categories: this.state.budget.categories
                    },
                    budgetVerified: this.verifyBudgetInfo()
                });
                break;
            case "budgetTotal":
                this.setState({
                    budget: {
                        budgetName: this.state.budget.budgetName,
                        budgetTotal: value,
                        categories: this.state.budget.categories
                    },
                    budgetVerified: this.verifyBudgetInfo()
                });
                break;

            case "transactionName":
                this.setState({
                    newTransaction: {
                        name: value,
                        amount: this.state.newTransaction.amount,
                        category: this.state.newTransaction.category
                    }
                });
                break;

            case "transactionAmount":
                this.setState({
                    newTransaction: {
                        name: this.state.newTransaction.name,
                        amount: value,
                        category: this.state.newTransaction.category
                    }
                });
                break;

            default:
                this.setState({
                    [name]: value
                });
                break;
        }
    }

    handleSelectChange = (event) => {
        const { name, value } = event.target;

        if (name === "categoryList") {
            this.setState({
                newTransaction: {
                    name: this.state.newTransaction.name,
                    amount: this.state.newTransaction.amount,
                    category: value
                }
            })
        } else {
            this.setState({
                [name]: value
            })
        }

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

    addTransaction = () => {
        let user = sessionStorage.getItem("username");

        if (!user) {
            window.location.pathname = "";
        } else {
            let newTransaction = {
                transactionName: this.state.newTransaction.name,
                transactionAmount: this.state.newTransaction.amount,
                category: this.state.newTransaction.category
            };

            API.addTransaction(user, this.state.currentBudget, newTransaction)
                .then(res => {
                    this.setState({
                        transactionContent: this.updateTransactions(this.state.currentBudget)
                    });
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
                        { label: category.categoryAmount, y: (Math.round((amount / budgetTotal) * 100)), indexLabel: `${category.categoryName} - ${category.categoryAmount}` }
                    )
                })

                let updatedTransactions = this.updateTransactions(budgetName);

                this.setState({
                    currentBudget: budgetName,
                    budgetCreated: true,
                    pieData: dataPoints,
                    tableContent: [],
                    transactionContent: updatedTransactions,
                    budget: {
                        budgetName: "",
                        budgetTotal: 0,
                        categories: []
                    }
                });
            }

            
        });
        this.updateTransactions();
    }

    updateCategories = () => {
        let budget = this.state.userBudgets.filter(userBudget => userBudget.budgetName === this.state.currentBudget)[0];
        let transactions = [];
        budget.categories.forEach(category => {
            transactions.push(<option value={category.categoryName}>{category.categoryName}</option>);
        });

        this.setState({
            userTransactions: transactions
        });
    }

    updateTransactions = (budgetName) => {
        let budget = this.state.userBudgets.filter(userBudget => userBudget.budgetName === budgetName)[0];
        let transactions = [];
        
        if (!budget) {

        } else {
            budget.transactions.forEach(transaction => {
                let newTransaction = <h3 className="transaction-item">{transaction.category} --- {transaction.transactionName} --- {transaction.transactionAmount}</h3>
                transactions.push(newTransaction);
            });
        }

        return transactions;
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
                                    <div className="form-group col-md-6">
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
                                    <div className="form-group col-md-3">
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
                                    <div className="form-group col-md-3">
                                        <label htmlFor="budget-remaining" className="col-form-label">Remaining</label>
                                        <input
                                            id="budget-remaining"
                                            name="budgetRemaining"
                                            disabled={true}
                                            value={this.state.budget.budgetTotal - this.state.budgetUsed}
                                            type="number"
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

                {pieChart}

                <button
                    id="btn-new-transaction"
                    className="btn btn-success col-md-12"
                    type="button"
                    onClick={this.updateCategories}
                    data-toggle="modal"
                    data-target="#new-transaction-modal"
                    data-dismiss="modal"
                >Add latest transaction</button>

                <Transactions>
                    {this.state.transactionContent}
                </Transactions>

                <NewTransactionModal>
                    <div className="modal-body">
                        <form>
                            <Container>

                                <div className="row">
                                    <label htmlFor="category-list" className="col-form-label">Category</label>
                                    <div className="form-group col-md-12">
                                        <select
                                            id="category-list"
                                            name="categoryList"
                                            onChange={this.handleSelectChange}>
                                            {this.state.userTransactions}
                                        </select>
                                    </div>
                                </div>


                                <div className="row modal-content-group">

                                    <div className="form-group col-md-8">
                                        <label htmlFor="transction-name" className="col-form-label">Transaction Name</label>
                                        <input
                                            id="transaction-name"
                                            name="transactionName"
                                            onChange={this.handleInputChange}
                                            value={this.state.newTransaction.name}
                                            type="text"
                                            placeholder="Ex: restaurant bill"
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label htmlFor="transaction-amount" className="col-form-label">Amount Spent ($)</label>
                                        <input
                                            id="transaction-amount"
                                            name="transactionAmount"
                                            onChange={this.handleInputChange}
                                            value={this.state.newTransaction.amount}
                                            type="number"
                                            className="form-control"
                                        />
                                    </div>
                                </div>


                                <button
                                    id="btn-save-transaction"
                                    type="button"
                                    data-dismiss="modal"
                                    onClick={this.addTransaction}
                                    disabled={!this.state.newTransaction.name || !this.state.newTransaction.category || this.state.newTransaction.amount <= 0}
                                    className="btn btn-success col-md-12">Save Transaction</button>
                            </Container>
                        </form>
                    </div>

                </NewTransactionModal>

            </Container>

        );
    }

}

export default Budget;