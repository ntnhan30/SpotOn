import React, { Component, Fragment } from 'react';
import { ColorChart } from '../../functions';
import {
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    ResponsiveContainer
} from 'recharts';

const colorChart = new ColorChart();

class HorizontalChart extends Component {
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
                <Bar key={i} dataKey={kpi.name} stackId='a' layout='vertical' fill={this.props.colorChart.getColor(i)} />
            )
        });
        return (
            <Fragment>
                <ResponsiveContainer width="95%" height={120} minHeight={300} >
                    <BarChart
                        width={730}
                        data={dataForChart}
                        layout="vertical"
                        margin={{top: 20, right: 30, left: 20, bottom: 5}}
                        >
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis type="category" dataKey="name" hide={true} />
                        <Legend />
                        <Tooltip />
                        { data }
                    </BarChart>
                </ResponsiveContainer>
            </Fragment>
        );
    }
}

export default HorizontalChart;
