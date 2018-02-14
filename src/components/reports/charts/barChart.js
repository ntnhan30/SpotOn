import React, { Component } from 'react';
import { ColorChart } from '../../functions';
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    ResponsiveContainer
} from 'recharts';

const colorChart = new ColorChart();

class BarCharts extends Component {
    static defaultProps = {
        colorChart
    }

    render() {
        let thisResults = [];
        for (let i in this.props.thisResults){
            thisResults.push(this.props.thisResults[i])
        }

        let dataForChart = this.props.kpis;
        // eslint-disable-next-line
        dataForChart.map((single) => {
            // eslint-disable-next-line
            thisResults.map((i) => {
                single[i['ad']['shortname']] =  parseInt(i['kpis'][single['nameInDB']],10);
            });
        });

        const data = thisResults.map((obj, i) => {
            return <Bar key={i} dataKey={obj['ad']['shortname']} fill={this.props.colorChart.getColor(i)} />
        });

        return (
            <div>
                <ResponsiveContainer width="95%" height={700} minHeight={400} >
                    <BarChart width={730} height={450} data={dataForChart}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]}  />
                        <Tooltip />
                        <Legend />
                        { data }
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default BarCharts;
