import React, { Component } from 'react';
import { Api } from '../../constants';

import { AdList, FilterSidebar, FilterAds, SelectedAds } from '../../components';

const api = new Api();
const filterAds = new FilterAds();

class SelectReports extends Component {

    constructor() {
        super();
        this.state = {
            originalAds: [], // this is the unmutable list of original ads
            ads: [], // this is the list of filtered ads
            filterAtts: [], // this is the list of attributes and values to filter the ads
            selectedAds: []
        };
    }

    static defaultProps = {
        api,
        filterAds
    }

    async componentDidMount() {
        // Retrieve the ads from the server
        const ads = await this.props.api.fetchAds();
        this.setState({
            ads: ads,
            originalAds: ads
        });
        console.log(ads);
    }


    filterThisAds = async ( valueToFilter, key ) => {
        let result = await this.props.filterAds.init( this.state.originalAds, this.state.ads, this.state.filterAtts, valueToFilter, key );

        // save the state with the filters that applied
        this.setState({
            filterAtts: result[0],
            ads: result[1]
        });
    }

    addToSelected = (ad) => {
        let currentlySelectedAds = this.state.selectedAds;
        currentlySelectedAds.push(ad);
        this.setState({
            selectedAds: currentlySelectedAds
        });
    }

    removeFromSelected = (ad) => {
        this.setState({
            selectedAds: this.state.selectedAds.filter(i => i.adname !== ad.adname)
        });
    }

    render() {
        // this is all the ads retrieved
        return (
            <div className="container-fluid">
                <h1>Report</h1>

                <div className="row">
                    <div className="col-2">
                        <FilterSidebar ads={this.state.originalAds} filteredAds={this.state.ads} filterAdlist={this.filterThisAds} />
                    </div>

                    <div className="col-2">

                        <SelectedAds ads={this.state.selectedAds} removeFromSelected={this.removeFromSelected} />
                    </div>

                    <div className="col-8">
                        <AdList ads={this.state.ads} addToSelected={this.addToSelected} removeFromSelected={this.removeFromSelected} />
                    </div>
                </div>

                <h4>
                    Here are the functionalities:
                </h4>
                <ul>
                    <li><b>Select Max 10</b></li>
                    <li><b>Color coded by country norm</b></li>
                    <li><b>Weighted Top Box Report</b>
                        <ul>
                            <li><i>Breakout - by age, gender, etc</i></li>
                            <li>Change percentil weight (Only admin)</li>
                        </ul>
                    </li>
                    <li>Single Campaign View
                        <ul>
                            <li>Import and Embed Video from Gdrive</li>
                            <li>Upload Summaries - Wysiwyg</li>
                        </ul>
                    </li>
                    <li>Percentil Report</li>
                    <li><i>Wordcloud</i></li>
                </ul>


                <h1>Filters</h1>

                <h4>
                    Here are the functionalities:
                </h4>
                <ul>
                    <li><b>Data Range</b></li>
                    <li><b>Country</b></li>
                    <li><b>Brand</b></li>
                    <li><b>Type Campagin - or name??</b></li>
                    <li><b>Series</b></li>
                    <li><b>Format (length)</b></li>
                    <li><b>Industry</b></li>
                    <li><b>Production State</b></li>
                    <li><b>Ad State</b></li>
                </ul>



                <h1>Charts</h1>

                <h4>
                    Here are the functionalities:
                </h4>
                <ul>
                    <li><b>Bubble Chart</b></li>
                    <li><b>Create predefined common charts</b></li>
                    <li><i>Allow Create custom charts</i></li>
                    <li><b>Custom colours for brands and competitors</b></li>
                    <li>Labels with extra info, and link to single view</li>
                </ul>


                <h1>Export</h1>

                <h4>
                    Here are the functionalities:
                </h4>
                <ul>
                    <li><b>Export Reports in CSV format</b></li>
                    <li>Export Charts as Image</li>
                    <li><i>Share by email - populate HTML email (Report, chart, single view)</i></li>
                </ul>

            </div>
        );
    }
}

export default SelectReports;
