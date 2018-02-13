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

        const displaySingleKPI = (kpi) => {
            const self = this;
            trKey++;

            let valuesCell = [];
            _.mapValues(self.props.allResults, function (single) {
                let v = (single['kpis']==null || (isNaN(single['kpis'][kpi])) ? 0 : single['kpis'][kpi]);
                valuesCell.push(Math.round(v));
            })
            return (
                <tr key={trKey}>
                    <td>
                        {kpi}
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
                    {displaySingleKPI('total')}

                    {displaySingleKPI('brandRelevance')}
                    {displaySingleKPI('brandRecall')}
                    {displaySingleKPI('relevance')}
                    {displaySingleKPI('brandFit')}

                    {displaySingleKPI('viewerEngagement')}
                    {displaySingleKPI('adAppeal')}
                    {displaySingleKPI('shareability')}
                    {displaySingleKPI('callToAction')}

                    {displaySingleKPI('adMessage')}
                    {displaySingleKPI('toneOfVoice')}
                    {displaySingleKPI('emotion')}
                    {displaySingleKPI('uniqueness')}
                    {displaySingleKPI('messaging')}
                </tbody>
            </table>
        );
    }
}

export default WeightTopBox;


