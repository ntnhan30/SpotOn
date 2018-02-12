import React, { Component } from 'react';
import { Api } from '../../constants';
import { TabulateAnswers, WeightTopBox } from '../../components';
import {
    Route,
    Switch
} from 'react-router-dom';

const api = new Api();
const tabulateAnswers = new TabulateAnswers();

class WtbReport extends Component {
    constructor() {
        super();
        this.state = {
            thisResults: [],
            isLoaded: false
        };
    }

    static defaultProps = {
        api,
        tabulateAnswers
    }

    componentDidMount = async () => {
        // Get the adname of this Ad
        let allResults = [];

        let ads = this.props.match.params.id;
        ads = ads.split("&");

        for ( let single in ads ) {
            if (ads[single]){
                const thisAd = await this.props.api.fetchSingleAd(ads[single]);
                allResults[ads[single]] = thisAd;
                allResults[ads[single]]['report'] = this.props.tabulateAnswers.init(thisAd.results);
                this.props.handleSelection(thisAd.ad, true)
            }
        };
        // Save them into the state
        this.setState({
            thisResults: allResults,
            isLoaded: true
        });
    }

    componentWillReceiveProps = async (nextProps) => {
        const currentID = this.props.match.params.id
        const nextID = nextProps.match.params.id

        if (currentID !== nextID) {
            // Get the adname of this Ad
            let allResults = [];

            let ads = nextID.split("&");

            for ( let single in ads ) {
                if (ads[single]){
                    const thisAd = await this.props.api.fetchSingleAd(ads[single]);
                    allResults[ads[single]] = thisAd;
                    allResults[ads[single]]['report'] = this.props.tabulateAnswers.init(thisAd.results);
                    this.props.handleSelection(thisAd.ad, true)
                }
            };
            // Save them into the state
            this.setState({
                thisResults: allResults,
                isLoaded: true
            });
        }
    }

    render() {
        if (this.state.isLoaded){
            return (
                <WeightTopBox allResults={this.state.thisResults} />
            );
        } else {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        }
    }
}

export default WtbReport;
