import React, { Component } from "react";
import "./style.css";

class Sidebar extends Component {

    render() {

        return (
            <div id="sidebar">
                {this.props.children}
                <div className="user-bdgt"></div>
                <div id="create-budget" data-toggle="modal" data-target="#new-budget-modal"></div>
            </div>
        )
    }
}

export default Sidebar;