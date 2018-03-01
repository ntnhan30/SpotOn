import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class Logout extends Component {
    logout() {
        this.props.auth.logout();
    }

    render() {
        this.logout();

        return (
            <Redirect
                to={{
                pathname: "/"
                }}
            />
        );
    }
}

export default Logout;
