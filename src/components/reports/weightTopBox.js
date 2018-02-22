import React, { Component } from 'react';
var _ = require('lodash');

class WeightTopBox extends Component {

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
            _.mapValues(self.props.allResults, function (single) {
                let v = (single['kpis']==null || (isNaN(single['kpis'][kpi])) ? 0 : single['kpis'][kpi]);
                valuesCell.push(Math.round(v));
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
                            </td>
                        );
                    })}
                </tr>
            );
        }

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

export default WeightTopBox;


