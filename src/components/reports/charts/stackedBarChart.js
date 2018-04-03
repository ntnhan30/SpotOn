import React, { Component } from 'react';
import { ColorChart } from '../../constants';
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

class StackedBarCharts extends Component {
    static defaultProps = {
        colorChart
    }

    render() {
        let thisResults = [];
        for (let i in this.props.thisResults){
            thisResults.push(this.props.thisResults[i])
        }

        let dataForChart = [];
        // eslint-disable-next-line
        thisResults.map((singleResult) => {
            const set = {
                name: singleResult['ad']['shortname']
            }
            // eslint-disable-next-line
            this.props.kpis.map((kpi) => {
                set[kpi.name] = parseInt( (singleResult['kpis'][kpi.nameInDB] * kpi.weight),10);
            });
            dataForChart.push(set);
        });

        const data = this.props.kpis.map((kpi, i) => {
            return (
                <Bar key={i} dataKey={kpi.name} stackId='a' fill={this.props.colorChart.getColor(i)} />
            )
        });

        return (
            <div>
                <ResponsiveContainer width="95%" height="100%" minHeight={300} >
                    <BarChart width={730} data={dataForChart} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="name"/>
                        <YAxis domain={[0, 100]} />
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        { data }
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default StackedBarCharts;
