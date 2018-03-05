import React, { Component } from 'react';
import { Api } from '../../constants';
import { LoadingSpinner, ColorTag } from '../../components';
import { FunctionsResults } from '../functions';
var _ = require('lodash');

const api = new Api();
const functionsResults  = new FunctionsResults ();

class PercentileReport extends Component {
    constructor() {
        super();
        this.state = {
            allResults: [],
            average: [],
        };
    }

    static defaultProps = {
        api,
        functionsResults
    }

    async componentDidMount() {
        // Get the percentile values and the percentile average of selected return => [allResults, average]
        let percentile = await this.props.functionsResults.getPercentileScore(this.props.allResults);

        this.setState({
            allResults: percentile.selectedAds,
            average: percentile.average
        });
    }

    render() {
        // Key for rows
        let trKey = 0;

        const displayHeaderTable = () => {
            const self = this;
            trKey++;

            let valuesCell = [];
            _.mapValues(self.state.allResults, function (single) {
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

        const showColorTag = (_.size(this.state.allResults)) >= 5 ? true : false;

        const displaySingleKPI = (kpi, nameOfClass, title) => {
            const self = this;
            trKey++;

            let valuesCell = [];
            _.mapValues(self.state.allResults, function (single) {
                //Get the percentile value
                let v = (single['percentile']==null || (isNaN(single['percentile'][kpi])) ? 0 : single['percentile'][kpi]);
                valuesCell.push(Math.round(v));
            })

            return (
                <tr key={trKey} className={nameOfClass}>
                    <td>
                        {title}
                    </td>
                    {valuesCell.map( function (single, i) {
                        const kpiValue = self.state.average[kpi];
                        return (
                            <td key={i}>
                                {single}th
                                { showColorTag && (
                                    <ColorTag difference={ single - kpiValue }/>
                                )}
                            </td>
                        );
                    })}
                </tr>
            );
        }


        if (_.isEmpty(this.state.average) || (this.state.average.length > 0)){
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

export default PercentileReport;


