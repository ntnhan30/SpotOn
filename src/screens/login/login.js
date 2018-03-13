import React, { Component } from 'react';
import Logo from'../../Assets/imgs/logo.svg';

class Login extends Component {
    login = () => {
        this.props.auth.login();
    }

    render = () => {
        return (
            <div className="login-screen">
                <div>
                    <img  src={Logo} alt="SpotOn"/>
                    <h1>TV Testing like never seen before.</h1>
                    <p>Log in to see the magic of TV testing, with even more KPIs then before.
                    Easily select different ads and compare them based on our amazing data.</p>
                    <button onClick={this.login}>LOG IN</button>
                </div>
                <div>
                </div>
            </div>
        );
    }
}

export default Login;

