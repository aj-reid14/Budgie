import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import NewBudgetModal from "../components/NewBudgetModal";
import PieChart from "../components/PieChart";
import { Container } from "../components/Grid";
import "./Budget.css";

let containerStyle = {
    "background-color": "red",
    "z-index": -15
}

class Budget extends Component {

    state = {
        budgetData: null
    }

    getBudgetData = (budgetData) => {
        this.setState({
            budgetData
        })
    }

    render() {

        const {budgetData} = this.state;

        return (

            <Container>
                
                <Sidebar />
                <NewBudgetModal getBudgetData={this.getBudgetData}/>
                <PieChart budgetData={budgetData}/>

            </Container>

        );
    }

}

export default Budget;