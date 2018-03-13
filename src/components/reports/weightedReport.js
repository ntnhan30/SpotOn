import React, { Component, Fragment } from 'react';
import { LoadingSpinner, ColorTag, ExportCSV, CountryNorm } from '../../components';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';
import { Auth } from '../../components/auth';
import { FunctionsResults } from '../functions';
var _ = require('lodash');

const auth  = new Auth ();
const functionsResults  = new FunctionsResults ();

class WeightedReport extends Component {
    constructor() {
        super();
        this.state = {
            average: {},
        };
    }

    static defaultProps = {
        auth,
        functionsResults
    }

    async componentDidMount() {
        //let average = this.props.functionsResults.getAverageKPIsOfSelected(this.props.allResults);
        let profile = this.props.auth.getUserInfo();
        let average = {};

        await Promise.all((profile.country).map(async country => {
            average[country] = await this.props.functionsResults.getCountryNorm([country]);
        }));

       this.setState({
           average
       });
   }


    render() {
        const displayHeaderTable = () => {
            const self = this;

            let cells = [];
            let valuesCell = [];
            _.mapValues(self.props.allResults, function (single) {
                valuesCell.push(single.ad.shortname);
            })

            cells.push(<Cell key={0}><ExportCSV toExport={self.props.allResults}/></Cell>);
            // eslint-disable-next-line
            valuesCell.map( function (single, i) {
                cells.push(<Cell key={i+1}>{single}</Cell>);
            })

            return (
                <Row>
                    { cells }
                </Row>
            );
        }


        const displaySingleKPI = (kpi, nameOfClass, title) => {
            const self = this;

            let cells = [];
            let valuesCell = [];
            let countries = [];
            // eslint-disable-next-line
            _.mapValues(self.props.allResults, function (single) {
                let v = (single['kpis']==null || (isNaN(single['kpis'][kpi])) ? 0 : single['kpis'][kpi]);
                valuesCell.push(Math.round(v));
                countries.push(single.ad.country);
            })

            cells.push(<Cell key={0}>{ title }</Cell>);
            // eslint-disable-next-line
            valuesCell.map( function (single, i) {
                cells.push(
                    <Cell key={i+1}>
                        {single}
                        <ColorTag difference={ single - self.state.average[countries[i]][kpi] }/>
                    </Cell>
                );
            })

            return (
                <Row className={nameOfClass}>
                    { cells }
                </Row>
            );
        }

        if (_.isEmpty(this.state.average)){
            return (
                <LoadingSpinner/>
            )
        } else {
            return (
                <Fragment>
                    <StickyTable stickyHeaderCount={1} stickyColumnCount={1}>
                        {displayHeaderTable()}

                        {displaySingleKPI('total', 'level1', 'SpotOn score')}

                        {displaySingleKPI('brandRelevance', 'level2', 'Brand Relevance')}
                        {displaySingleKPI('brandRecall', 'level3', 'Brand Recall')}
                        {displaySingleKPI('relevance', 'level3', 'Relevance')}
                        {displaySingleKPI('brandFit', 'level3', 'Brand Fit')}

                        {displaySingleKPI('viewerEngagement', 'level2', 'Viewer Engagement')}
                        {displaySingleKPI('adAppeal', 'level3', 'Ad Appeal')}
                        {displaySingleKPI('shareability', 'level3', 'Shareability')}
                        {displaySingleKPI('callToAction', 'level3', 'Call to Action')}

                        {displaySingleKPI('adMessage', 'level2', 'Ad Message')}
                        {displaySingleKPI('toneOfVoice', 'level3', 'Tone of Voice')}
                        {displaySingleKPI('emotion', 'level3', 'Emotion')}
                        {displaySingleKPI('uniqueness', 'level3', 'Uniqueness')}
                        {displaySingleKPI('messaging', 'level3', 'Messaging')}

                    </StickyTable>
                    <CountryNorm ads={this.props.allResults} />
                </Fragment>
            );
        }
    }
}

export default WeightedReport;


