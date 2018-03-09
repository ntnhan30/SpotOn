import React, { Component } from 'react';
import { LoadingSpinner } from '../../components';
import { FunctionsResults } from '../functions';
var _ = require('lodash');

const functionsResults  = new FunctionsResults ();

class CountryNorm extends Component {
    constructor() {
        super();
        this.state = {
            showing: false,
        };
    }

    static defaultProps = {
        functionsResults
    }

    handleClick = () => {
        this.setState( { showing : !this.state.showing } );
    }

    render() {
        return (
            <div className={ (this.state.showing ? "active " :" " ) + 'pull-in-sidebar' }>
                SIDEBAR THINGY
                <button type="button" className='toggle-sidebar' onClick={this.handleClick}>COUNTRY NORM</button>
            </div>
        );
    }
}

export default CountryNorm;
