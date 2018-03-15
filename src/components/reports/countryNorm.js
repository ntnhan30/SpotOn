import React, { Component } from 'react';
import { FunctionsResults } from '../functions';
import { LoadingSpinner } from '../../components';
var _ = require('lodash');

const functionsResults  = new FunctionsResults ();

class CountryNorm extends Component {
    constructor() {
        super();
        this.state = {
            showing: false,
            isLoaded: true,
            normOfCountries: {}
        };
    }

    static defaultProps = {
        functionsResults
    }

    async componentDidMount() {
        const selectedCountries = this.props.functionsResults.getCountriesOfSelectedAds(this.props.ads);

        let normOfCountries = {};
        selectedCountries.map(async (country, i) => {
            const countryNorm = await this.props.functionsResults.getCountryNorm([country]);
            normOfCountries[country] = countryNorm;
        })

        this.setState({
            normOfCountries
        })
    }

    handleClick = () => {
        this.setState( { showing : !this.state.showing } );
    }

    displayCountries = () => {
        let cells = [];
        let i = 0;

        for (let country in this.state.normOfCountries){
            cells.push(
                <th key={i++}>
                    {country}
                </th>
            );
        }

        return (
            <tr>
                { cells }
            </tr>
        );
    }

    displaySingleKPI = (kpi, nameOfClass) => {
        let cells = [];
        let valuesCell = [];
        // eslint-disable-next-line
        _.mapValues(this.state.normOfCountries, function (single) {
            let v = (single[kpi]==null || (isNaN(single[kpi])) ? 0 : single[kpi]);
            valuesCell.push(Math.round(v));
        })

        // eslint-disable-next-line
        valuesCell.map( function (single, i) {
            cells.push(
                <td key={i+1}>
                    {single}
                </td>
            );
        })

        return (
            <tr className={nameOfClass}>
                { cells }
            </tr>
        );
    }


    render() {
        if (!_.isEmpty(this.state.normOfCountries)){
            const tableHeader = (
                <thead>
                    {this.displayCountries()}
                </thead>
            )

            const tableBody = (
                <tbody>
                    {this.displaySingleKPI('total', 'level1')}

                    {this.displaySingleKPI('brandRelevance', 'level2')}
                    {this.displaySingleKPI('brandRecall', 'level3')}
                    {this.displaySingleKPI('relevance', 'level3')}
                    {this.displaySingleKPI('brandFit', 'level3')}

                    {this.displaySingleKPI('viewerEngagement', 'level2')}
                    {this.displaySingleKPI('adAppeal', 'level3')}
                    {this.displaySingleKPI('shareability', 'level3')}
                    {this.displaySingleKPI('callToAction', 'level3')}

                    {this.displaySingleKPI('adMessage', 'level2')}
                    {this.displaySingleKPI('toneOfVoice', 'level3')}
                    {this.displaySingleKPI('emotion', 'level3')}
                    {this.displaySingleKPI('uniqueness', 'level3')}
                    {this.displaySingleKPI('messaging', 'level3')}
                </tbody>
            )

            return(
                <div className={ (this.state.showing ? "active " :" " ) + 'pull-in-sidebar' }>
                    <table>
                        {tableHeader}
                        {tableBody}
                    </table>
                    <button type="button" className='toggle-sidebar' onClick={this.handleClick}>COUNTRY NORM</button>
                </div>
            )
        } else {
            return (
                <div className={ (this.state.showing ? "active " :" " ) + 'pull-in-sidebar' }>
                    <LoadingSpinner/>
                    <button type="button" className='toggle-sidebar' onClick={this.handleClick}>COUNTRY NORM</button>
                </div>
            )
        }
    }
}

export default CountryNorm;
