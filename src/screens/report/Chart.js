import React, { Component } from 'react';
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

class Chart extends Component {
    render() {
        const data01 = [{x: 54, y: 68, z: 93}];
        const data02 = [{x: 41, y: 54, z: 38}];

        return (
            <div>
                <h1>Here are the Charts</h1>
                <ResponsiveContainer width="95%" height={700} minHeight={400} >
                    <ScatterChart margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                        <XAxis type="number" dataKey={'x'} name='Brand relevance'/>
                        <YAxis type="number" dataKey={'y'} name='Viewer engagement'/>
                        <ZAxis dataKey={'z'} range={[200, 5000]} name='Ad message'/>
                        <CartesianGrid />
                        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                        <Legend/>
                        <Scatter name='A school' data={data01} fill='#8884d8' shape="circle"/>
                        <Scatter name='B school' data={data02} fill='#82ca9d' shape="circle"/>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default Chart;
