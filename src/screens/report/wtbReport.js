import React, { Component } from 'react';
import { Api } from '../../constants';
import { WeightTopBox } from '../../components';

const api = new Api();

class WtbReport extends Component {
    constructor() {
        super();
        this.state = {
            thisResults: [],
            isLoaded: false
        };
    }

    static defaultProps = {
        api
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

    componentWillReceiveProps = async (nextProps) => {
        const currentID = this.props.match.params.id
        const nextID = nextProps.match.params.id

        if (currentID !== nextID) {
            this.getAdsFromURL();
        }
    }

    render() {
        if (this.state.isLoaded){
            return (
                <WeightTopBox allResults={this.state.thisResults} />
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

export default WtbReport;
