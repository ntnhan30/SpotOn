import React, { Component } from 'react';
import { Api } from '../../constants';

import { AdList, FilterSidebar, FilterAds, SelectedAds } from '../../components';
var _ = require('lodash');

const api = new Api();
const filterAds = new FilterAds();

class SelectReports extends Component {

    constructor() {
        super();
        this.state = {
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
            ads: _.map(ads, o => _.extend({ show: true }, o)) // Show all the ads
        });
    }


    filterThisAds = async ( valueToFilter, key ) => {
        let result = await this.props.filterAds.init( this.state.ads, this.state.filterAtts, valueToFilter, key );

        // save the state with the filters that applied
        this.setState({
            filterAtts: result[0],
            ads: result[1]
        });
    }

    handleSelection = (ad, isSelected) => {
        let currentlySelectedAds = this.state.ads;
        ad['selected'] = isSelected;
        _.map(currentlySelectedAds, function(obj) {
            return _.assign(obj, _.find([ad], {adname: obj.adname}));
        });

        this.setState({
            ads: currentlySelectedAds
        });
    }

    render() {
        // this is all the ads retrieved
        return (
            <div className="container-fluid">
                <h1>Report</h1>

                <div className="row">
                    <div className="col-2">
                        <FilterSidebar ads={this.state.ads} filteredAds={this.state.ads} filterAdlist={this.filterThisAds} />
                    </div>

                    <div className="col-2">
                        <SelectedAds ads={this.state.ads} removeFromSelected={this.handleSelection} />
                    </div>

                    <div className="col-8">
                        <AdList ads={this.state.ads} handleSelection={this.handleSelection} />
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
