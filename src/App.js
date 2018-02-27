import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
    //Link
} from 'react-router-dom';

// Components
import Header from './components/headerComponent/header';
//import Footer from './components/footerComponent/footer';

// import screens
import {
    SelectReports,
    Import,
    Notifications,
    Users,
    SingleAd
} from './screens';

// Import the minified css
import './Assets/css/default.min.css';

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                    <Header />
                    <Switch>
                        <Route exact path='/import' component={Import} />
                        <Route exact path='/notifications' component={Notifications} />
                        <Route exact path='/users' component={Users} />
                        <Route exact path='/ad/:id' component={SingleAd} />
                        <Route path='/' component={SelectReports} />
                    </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
