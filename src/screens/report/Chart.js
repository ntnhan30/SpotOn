import React, { Component } from 'react';
import { Api } from '../../constants';
import { RadarCharts, BarCharts, StackedBarCharts, GetKPIs } from '../../components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const api = new Api();
const getKPIs = new GetKPIs();

class Chart extends Component {
    constructor() {
        super();
        this.state = {
            thisResults: [],
            isLoaded: false
        };
    }

    static defaultProps = {
        api,
        getKPIs
    }

    getAdsFromURL = async () => {
        // Get the adname of this Ad
        let allResults = [];

        let ads = this.props.match.params.id;
        ads = ads.split("&");

        for ( let single in ads ) {
            if (ads[single]){
                const thisAd = await this.props.api.fetchSingleAd(ads[single]);
                allResults[ads[single]] = thisAd;
                this.props.handleSelection(thisAd.ad, true)
            }
        };
        // Save them into the state
        this.setState({
            thisResults: allResults,
            isLoaded: true
        });
    }

    componentDidMount = async () => {
        this.getAdsFromURL();
    }

    render() {
        if (this.state.isLoaded){
            let total = [ 'Total' ];
            let mainKPIs = [ 'Brand Relevance', 'Viewer Engagement', 'Ad Message' ];
            let singleKpis = [ 'Brand Recall', 'Relevance', 'Brand Fit', 'Ad Appeal', 'Shareability', 'Call to action', 'Tone of voice', 'Emotion', 'Uniqueness', 'Messaging' ];
            let brandRelevance = [ 'Brand Recall', 'Relevance', 'Brand Fit' ];
            let viewerEngagement = [ 'Ad Appeal', 'Shareability', 'Call to action' ];
            let adMessage = [ 'Tone of voice', 'Emotion', 'Uniqueness', 'Messaging' ];

            return(
                <Tabs>
                    <TabList>
                        <Tab>Total</Tab>
                        <Tab>Main KPIs</Tab>
                        <Tab>Radar Chart</Tab>
                        <Tab>Brand Relevance</Tab>
                        <Tab>Viewer Engagement</Tab>
                        <Tab>Ad Message</Tab>
                    </TabList>

                    <TabPanel>
                        <BarCharts thisResults={this.state.thisResults} kpis={this.props.getKPIs.init(total)}/>
                    </TabPanel>
                    <TabPanel>
                        <BarCharts thisResults={this.state.thisResults} kpis={this.props.getKPIs.init(mainKPIs)}/>
                    </TabPanel>
                    <TabPanel>
                        <RadarCharts thisResults={this.state.thisResults} kpis={this.props.getKPIs.init(singleKpis)}/>
                    </TabPanel>
                    <TabPanel>
                        <StackedBarCharts thisResults={this.state.thisResults} kpis={this.props.getKPIs.init(brandRelevance)}/>
                    </TabPanel>
                    <TabPanel>
                        <StackedBarCharts thisResults={this.state.thisResults} kpis={this.props.getKPIs.init(viewerEngagement)}/>
                    </TabPanel>
                    <TabPanel>
                        <StackedBarCharts thisResults={this.state.thisResults} kpis={this.props.getKPIs.init(adMessage)}/>
                    </TabPanel>
                </Tabs>
            )
        } else {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
    }
}

export default Chart;
