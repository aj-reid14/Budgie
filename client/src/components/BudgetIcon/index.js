import React, { Component } from "react";
import "./style.css";

class BudgetIcon extends Component {

    state = {
        color: ""
    }

    componentDidMount() {
        let colorVals = ['A', 'B', 'C', 'D', 'E', 'F',
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

        let randColor = "#";

        for (let i = 0; i < 6; i++) {
            randColor += colorVals[Math.floor(Math.random() * colorVals.length)];
        };

        this.setState({
            color: randColor
        });
    }

    render() {

        const iconStyle = {
            backgroundColor: this.state.color
        }

        return (
            <div
                style={iconStyle}
                className="user-bdgt"
                onMouseEnter={this.props.updateBudgetPreview}
                onMouseLeave={this.props.defaultBudgetPreview}
                onClick={this.props.updatePieChart}>
                <div budget-name={this.props.budgetName}></div>
            </div>
        )
    }
}

export default BudgetIcon;