import React, { Component } from 'react';
import { LoadingSpinner } from '../../components';

class Callback extends Component {

    handleAuthentication = (props) => {
        const {location} = props;
        const {auth} = props;
        if (/access_token|id_token|error/.test(location.hash)) {
            auth.handleAuthentication();
        }
    }

    render() {
        this.handleAuthentication(this.props);
        return (
            <LoadingSpinner />
        );
    }
}

export default Callback;
