import { Component } from 'react';

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

