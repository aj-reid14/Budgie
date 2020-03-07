import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import NewBudgetModal from "../components/NewBudgetModal";
import PieChart from "../components/PieChart/PieChart.js";
import { Container } from "../components/Grid";
import "./Budget.css";

let containerStyle = {
    "background-color": "red",
    "z-index": -15
}

class Budget extends Component {

    render() {


        return (

            <Container>
                
                <Sidebar />
                <NewBudgetModal />
                <PieChart />

            </Container>

        );
    }

}

export default Budget;