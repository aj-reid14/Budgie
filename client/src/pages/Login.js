import React, { Component } from "react";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import API from "../utils/API"
import { compareSync } from "bcryptjs";
import "./Login.css";
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

    handleFormLogin = event => {
        event.preventDefault();
        if (this.state.username && this.state.password) {
            // Determine if login or signup was clicked
            // Add user information to database
        }
        API.login(this.state)
            .then(res => {
                // console.log(res.data)
                sessionStorage.setItem("username", res.data.username);
                window.location.pathname = `/home/${res.data.username}`;
            }
            )
            .catch(() => {
                console.log("error found")
                alert("Incorrect username or password")
            })


    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.username && this.state.password) {
            // Determine if login or signup was clicked
            // Add user information to database
        }
        API.register(this.state)
            .then(res => {
                // console.log(res.data)
                sessionStorage.setItem("username", res.data.username);
                window.location.pathname = `/home/${res.data.username}`;
            }
            )
            .catch(() => {
                console.log("error found")
            })
    };

    render() {
        return (
            <div id="login-area">
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
                                    onClick={this.handleFormLogin}
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
            </div>
        )
    }
}

export default Login;