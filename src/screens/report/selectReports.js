import React, { Component } from 'react';
import { Api } from '../../constants/api';

import { AdList, Filter } from '../../components';
//import { AdList, Filter, SearchBar } from '../../components';

const api = new Api();

class SelectReports extends Component {

    constructor() {
        super();
        this.state = {
            ads: []
        };
    }

    static defaultProps = {
        api
    }

    async componentDidMount() {
        // Retrieve the ads from the server
        const ads = await this.props.api.fetchAds();
        this.setState({ ads });
    }


    render() {
        // this is all the ads retrieved
        console.log(this.state.ads);

        return (
            <div className="container-fluid">
                <h1>Report</h1>

                <div className="row">
                    <div className="col-3">

                        <Filter ads={this.state.ads} />
                    </div>

                    <div className="col-9">
                        <AdList ads={this.state.ads} />
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
