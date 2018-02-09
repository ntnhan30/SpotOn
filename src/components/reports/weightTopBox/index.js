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
                let v = (isNaN(single['report'][kpi]) ? 0 : single['report'][kpi]);
                valuesCell.push(Math.round(v));
                //valuesCell.push(v);
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
            <div className="container-fluid">
                <div className="col-md-8 offset-md-2">
                    <h1>Weight Top Box</h1>
                    <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                            {displayHeaderTable()}
                        </thead>
                        <tbody>
                            {displaySingleKPI('Total')}

                            {displaySingleKPI('Brand Relevance')}
                            {displaySingleKPI('Q1')}
                            {displaySingleKPI('Q5o2')}
                            {displaySingleKPI('Q8')}

                            {displaySingleKPI('Viewer Engagement')}
                            {displaySingleKPI('Q2')}
                            {displaySingleKPI('Q5o3')}
                            {displaySingleKPI('Q6')}

                            {displaySingleKPI('Ad Message')}
                            {displaySingleKPI('Q3')}
                            {displaySingleKPI('Q4')}
                            {displaySingleKPI('Q5o1')}
                            {displaySingleKPI('Q7')}
                        </tbody>
                    </table>
                </div>
            </div>
        );

    }
}

export default WeightTopBox;
