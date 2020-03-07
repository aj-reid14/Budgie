import React, { Component } from "react";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import API from "../utils/API"
const jwt = require('jsonwebtoken');
const fs = require('fs');


class Login extends Component {

    state = {
        username: "",
        password: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.username && this.state.password) {
            // Determine if login or signup was clicked
            // Add user information to database
        }
        API.login(this.state)
        .then(res =>
        {
            console.log(res.data)
        }
        )
        .catch(() =>
        {
            console.log("error found")
        })
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-4"></Col>
                    <Col size="md-4">
                        <form>
                            <Input
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                name="username"
                                placeholder="Username"
                            />
                            <Input
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                name="password"
                                type="password"
                                placeholder="Password (min 8 characters)"
                            />
                            <FormBtn
                                disabled={!((this.state.username && this.state.password) && this.state.password.length >= 8)}
                                onClick={this.handleFormSubmit}
                            >
                                Login
                    </FormBtn>
                            <FormBtn
                                disabled={!((this.state.username && this.state.password) && this.state.password.length >= 8)}
                                onClick={this.handleFormSubmit}
                            >
                                Sign Up
                    </FormBtn>
                        </form>
                    </Col>
                    <Col size="md-4"></Col>
                </Row>
            </Container>
        )
    }
}

export default Login;