import React, { Component, Fragment } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import { Header } from './components';
import {
    Import,
    Notifications,
    Users,
    SingleAd,
    Login,
    Callback,
    HomeScreen
} from './screens';

import Auth from './components/auth/auth.js';

// Import the minified css
import './Assets/css/default.min.css';

const auth = new Auth();

class App extends Component {
    handleAuthentication = ({location}) => {
        if (/access_token|id_token|error/.test(location.hash)) {
          auth.handleAuthentication();
        }
    }

    render() {
        return (
            <div>
                <Router>
                    <Fragment>
                        <Header auth={auth} />
                        <Switch>
                            <Route exact path='/login' render={(props) => <Login auth={auth} {...props} />} />
                            <Route exact path='/import' render={(props) => <Import auth={auth} {...props} />} />
                            <Route exact path='/notifications' render={(props) => <Notifications auth={auth} {...props} />} />
                            <Route exact path='/users' render={(props) => <Users auth={auth} {...props} />} />
                            <Route exact path='/ad/:id' render={(props) => <SingleAd auth={auth} {...props} />} />
                            <Route exact path='/callback' render={(props) => {
                                this.handleAuthentication(props);
                                return <Callback {...props} />
                            }}/>
                            <Route path='/' render={(props) => <HomeScreen auth={auth} {...props} />} />
                        </Switch>
                    </Fragment>
                </Router>
            </div>
        );
    }
}

export default App;
