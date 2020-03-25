import React, { Component } from "react";
import "./style.css";

class Sidebar extends Component {

    render() {

        return (
            <div id="sidebar">
                <div id="budget-preview">
                    <h5>{this.props.budgetPreview}</h5>
                </div>

                {this.props.children}
                <div id="create-budget" data-toggle="modal" data-target="#new-budget-modal"></div>
            </div>
        )
    }
}

export default Sidebar;