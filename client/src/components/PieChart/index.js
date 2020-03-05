import React, { Component } from "react";
import { Col, Row, Container } from "../Grid";
import "./style.css";


class PieChart extends Component {

    state = {
        budgetData: this.props.budgetData
    }

    render() {
        return (
            <Container>
                <h1>(create budget)</h1>
                <div id="piechart-area"></div>
            </Container>
        );
    }
}

export default PieChart;