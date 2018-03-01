import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
    SelectReports
} from '../../screens';

class HomeScreen extends Component {
    render() {
        const isAuthenticated = this.props.auth.isAuthenticated();
        return (
            <Fragment>
                {
                !isAuthenticated && (
                    <div>
                        Not logged in
                        <Link to={{ pathname:'/login' }}>
                            Login
                        </Link>
                    </div>
                )
                }
                {
                isAuthenticated && (
                    <SelectReports auth={this.props.auth} />
                    )
                }
            </Fragment>
        );
    }
}

export default HomeScreen;
