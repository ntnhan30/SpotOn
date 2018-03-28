import React, { Component } from 'react';
import {
    ColorChart,
    FunctionsResults
} from '../../functions';
import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    BarChart,
    ResponsiveContainer,
    LabelList
} from 'recharts';
var _ = require('lodash');

const colorChart = new ColorChart();
const functionsResults  = new FunctionsResults ();

class ObjectBarChart extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    static defaultProps = {
        colorChart,
        functionsResults
    }


    render() {
        let results = this.props.thisResults;

        const sumOfAll = _.sum(_.values(_.omit(this.props.thisResults, ['adName'])));

        let resultsPercentage = {};
        _.mapKeys(results, (v, key) => {
            v =  Math.round((v / sumOfAll) * 100)
            //v =  (v / sumOfAll) * 100
            resultsPercentage[key] = v;
        });

        //results['adName'] = this.props.kpis;
        results = [resultsPercentage];

        let thisKeys = [];


        for (let i in this.props.thisResults){
            thisKeys.push(i);
        }

        const data = thisKeys.map((obj, i) => {
            return (
                <Bar key={i} dataKey={obj} fill={this.props.colorChart.getColor(i)}>
                    <LabelList dataKey={thisKeys[i]} position="top" />
                </Bar>
            );
        });

        return (
            <ResponsiveContainer width="95%" height="100%" minHeight={300} >
                <BarChart width={730} data={results}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="adName" />
                    <YAxis label={{ value: 'Percentage', angle: -90, position: 'center' }} allowDecimals={true} />
                    <Tooltip active={false} cursor={false} />
                    <Legend />
                    { data }
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default ObjectBarChart;
