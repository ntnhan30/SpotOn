import React, { Component } from 'react';
import { ColorChart } from '../../functions';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const colorChart = new ColorChart();

class BubbleChart extends Component {
    static defaultProps = {
        colorChart
    }

    render() {
        let thisResults = [];
        for (let i in this.props.thisResults){
            thisResults.push(this.props.thisResults[i])
        }

        const data = thisResults.map((obj,i) => {
            const dataForStats = [{
                brandRelevance: parseInt(obj['kpis']['brandRelevance'],10),
                viewerEngagement: parseInt(obj['kpis']['viewerEngagement'],10),
                adMessage: parseInt(obj['kpis']['adMessage'],10)
            }];
            return <Scatter key={i} data={dataForStats} name={obj['ad']['shortname']} fill={this.props.colorChart.getColor(i)} shape="circle"/>
        });
        return (
            <div>
                <ResponsiveContainer width="95%" height={700} minHeight={400} >
                    <ScatterChart margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                        <XAxis type="number" dataKey={'brandRelevance'} name='Brand Relevance' domain={[0, 100]}/>
                        <YAxis type="number" dataKey={'adMessage'} name='Ad Message' domain={[0, 100]}  />
                        <ZAxis dataKey={'viewerEngagement'} range={[2000, 5000]} name='Viewer Engagement'/>
                        <CartesianGrid />
                        <Tooltip cursor={{strokeDasharray: '9 9'}}/>
                        <Legend/>
                        { data }
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default BubbleChart;
