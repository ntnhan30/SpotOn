import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

// Components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/homePage';
import Products from './components/pages/products';

// Import the minified css
import './Assets/css/default.min.css';

class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">
                <Header />

                <Route exact path='/' component={Homepage} />

                <Route exact path='/products' component={Products} />

                <Footer />
            </div>
        </Router>
    );
  }
}

export default App;
