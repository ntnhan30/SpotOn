import React, { Component } from 'react';
import { ColorChart, FunctionsResults } from '../../functions';
import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    ComposedChart,
    ReferenceLine,
    ResponsiveContainer
} from 'recharts';
var _ = require('lodash');

const colorChart = new ColorChart();
const functionsResults  = new FunctionsResults ();

class BarCharts extends Component {
    constructor() {
        super();
        this.state = {
            average: [],
            selectedCountries: 0
        };
    }

    static defaultProps = {
        colorChart,
        functionsResults
    }

    async componentDidMount() {
        const selectedCountries = this.props.functionsResults.getCountriesOfSelectedAds(this.props.thisResults);
        let average = await this.props.functionsResults.getCountryNorm([selectedCountries[0]]);

        this.setState({
            selectedCountries,
            average
        });
    }


    render() {
        let thisResults = [];
        for (let i in this.props.thisResults){
            thisResults.push(this.props.thisResults[i])
        }

        let dataForChart = this.props.kpis;

        const moreThanOneCountry = ( _.size(this.state.selectedCountries) > 1 ) ? true : false;

        const references = dataForChart.map((single, z) => {
            if (!moreThanOneCountry) {
                const self = this;
                // eslint-disable-next-line
                thisResults.map((i) => {
                    single[i.ad.shortname] =  parseInt(i.kpis[single.nameInDB],10);
                });

                let norm = self.state.average[single.nameInDB];
                return <ReferenceLine key={z} y={norm} label={{ value:(single.name + ' country norm'), position:'insideBottomLeft' }} stroke={this.props.colorChart.getNormColor(z)} strokeDasharray="10 10" />
            } else {
                return null
            }
        });

        const data = thisResults.map((obj, i) => {
            return <Bar key={i} dataKey={obj.ad.shortname} fill={this.props.colorChart.getColor(i)} />
        });


        return (
            <div>
                <ResponsiveContainer width="95%" height="100%" minHeight={300} >
                    <ComposedChart width={730} data={dataForChart}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]}  />
                        <Tooltip cursor={false} />
                        <Legend />
                        { data }
                        { references }
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default BarCharts;
