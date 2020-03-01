import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import "./Budget.css";

let containerStyle = {
    "background-color": "red",
    "z-index": -15
}

class Budget extends Component {

    state = {
        budgetName: "no budget created..."
    }

    render() {



        return (

            <Container>
                
                <Sidebar></Sidebar>

                <h1>{this.state.budgetName}</h1>
                <div id="piechart-area"></div>
                <h3> total income</h3>

            </Container>

        );
    }

}

export default Budget;