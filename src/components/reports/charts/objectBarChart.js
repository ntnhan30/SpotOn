import React, { Component } from 'react';
import { ColorChart, FunctionsResults } from '../../functions';
import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    BarChart,
    ReferenceLine,
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
        results['adName'] = this.props.kpis;
        results = [results];

        let thisKeys = [];
        let thisNames = [];
        for (let i in this.props.thisResults){
            thisKeys.push(i);
            thisNames.push(this.props.thisResults[i])
        }

        console.log(thisKeys);
        console.log(thisNames);
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
                    <YAxis />
                    <Tooltip active={false} cursor={false} />
                    <Legend />
                    { data }
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default ObjectBarChart;

