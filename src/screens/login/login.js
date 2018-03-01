import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class Login extends Component {
    login() {
        this.props.auth.login();
    }

    render() {
        this.login();

        return (
            null
        );
    }
}

export default Login;

