import React, { Component } from 'react';
import { LoadingSpinner, ColorTag } from '../../components';
import { Auth } from '../../components/auth';
import { FunctionsResults } from '../functions';
var _ = require('lodash');

const auth  = new Auth ();
const functionsResults  = new FunctionsResults ();

class WeightedReport extends Component {
    constructor() {
        super();
        this.state = {
            average: {},
        };
    }

    static defaultProps = {
        auth,
        functionsResults
    }

    async componentDidMount() {
        //let average = this.props.functionsResults.getAverageKPIsOfSelected(this.props.allResults);
        let profile = this.props.auth.getUserInfo();
        let average = {};

        await Promise.all((profile.country).map(async country => {
            average[country] = await this.props.functionsResults.getCountryNorm([country]);
        }));

       this.setState({
           average
       });
   }


    render() {
        let trKey = 0;

        const displayHeaderTable = () => {
            const self = this;
            trKey++;

            let valuesCell = [];
            _.mapValues(self.props.allResults, function (single) {
                valuesCell.push(single.ad.shortname);
            })
            return (
                <tr key={trKey}>
                    <th></th>
                    { valuesCell.map( function (single, i) {
                        return (
                            <th key={i}>
                                {single}
                            </th>
                        );
                    })}
                </tr>
            );
        }


        const displaySingleKPI = (kpi, nameOfClass, title) => {
            const self = this;
            trKey++;

            let valuesCell = [];
            let countries = [];
            _.mapValues(self.props.allResults, function (single) {
                let v = (single['kpis']==null || (isNaN(single['kpis'][kpi])) ? 0 : single['kpis'][kpi]);
                valuesCell.push(Math.round(v));
                countries.push(single.ad.country);
            })
            return (
                <tr key={trKey} className={nameOfClass}>
                    <td>
                        {title}
                    </td>
                    {valuesCell.map( function (single, i) {
                        return (
                            <td key={i}>
                                {single}
                                <ColorTag difference={ single - self.state.average[countries[i]][kpi] }/>
                            </td>
                        );
                    })}
                </tr>
            );
        }

        if (_.isEmpty(this.state.average)){
            return (
                <LoadingSpinner/>
            )
        } else {
            return (
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        {displayHeaderTable()}
                    </thead>
                    <tbody>
                        {displaySingleKPI('total', 'level1', 'SpotOn score')}

                        {displaySingleKPI('brandRelevance', 'level2', 'Brand Relevance')}
                        {displaySingleKPI('brandRecall', 'level3', 'Brand Recall')}
                        {displaySingleKPI('relevance', 'level3', 'Relevance')}
                        {displaySingleKPI('brandFit', 'level3', 'Brand Fit')}

                        {displaySingleKPI('viewerEngagement', 'level2', 'Viewer Engagement')}
                        {displaySingleKPI('adAppeal', 'level3', 'Ad Appeal')}
                        {displaySingleKPI('shareability', 'level3', 'Shareability')}
                        {displaySingleKPI('callToAction', 'level3', 'Call to Action')}

                        {displaySingleKPI('adMessage', 'level2', 'Ad Message')}
                        {displaySingleKPI('toneOfVoice', 'level3', 'Tone of Voice')}
                        {displaySingleKPI('emotion', 'level3', 'Emotion')}
                        {displaySingleKPI('uniqueness', 'level3', 'Uniqueness')}
                        {displaySingleKPI('messaging', 'level3', 'Messaging')}
                    </tbody>
                </table>
            );
        }
    }
}

export default WeightedReport;


