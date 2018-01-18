import React, { Component } from 'react';
import { Api } from '../../constants/api';

import { AdList, Filter } from '../../components';
//import { AdList, Filter, SearchBar } from '../../components';

const api = new Api();

class SelectReports extends Component {

    constructor() {
        super();
        this.state = {
            originalAds: [], // this is the unmutable list of original ads
            ads: [], // this is the list of filtered ads
            filterAtts: [] // this is the list of attributes and values to filter the ads
        };
    }

    static defaultProps = {
        api
    }

    async componentDidMount() {
        // Retrieve the ads from the server
        const ads = await this.props.api.fetchAds();
        this.setState({
            ads: ads,
            originalAds: ads
        });
    }


    filterAds = ( valueToFilter, key ) => {
        // valueToFilter - is an array of the selected values
        // key is a string with the name of the attr

        // copy the state
        let tempFilt = this.state.filterAtts;
        // add the new value
        tempFilt[key] = valueToFilter;

        const arrayUnique = (array) => {
            var a = array.concat();
            for(var i=0; i<a.length; ++i) {
                for(var j=i+1; j<a.length; ++j) {
                    if(a[i] === a[j])
                        a.splice(j--, 1);
                }
            }
            return a;
        }

        const intersect = (a, b) => {
            var setA = new Set(a);
            var setB = new Set(b);

            if (b.length >= a.length){
                if (a.length > 0){
                    console.log('el A si tiene elementos ' + a);
                    var intersection = new Set([...setA].filter(x => setB.has(x)));
                } else {
                    console.log('el A NO tiene elementos ' + a);
                    var intersection = setB;
                }
            } else {
                if (b.length > 0){
                    console.log('el B si tiene elementos ' + b);
                    var intersection = setB;
                } else {
                    var intersection = this.state.originalAds;
                }
            }
            return Array.from(intersection);
        }

        const filterList = (ad, filterKey, single) => {
            switch (filterKey) {
                case 'brand':
                    return ad.brand === single;
                case 'type':
                    return ad.type === single;
                case 'series':
                    return ad.series === single;
                case 'format':
                    return ad.format === single;
                case 'industry':
                    return ad.industry === single;
                case 'productionState':
                    return ad.productionState === single;
                case 'adState':
                    return ad.adState === single;
                default:
                    break;
            }
        }

        //const self = this;
        let filteredAds = [];

        for (var filterKey in tempFilt) {
            // Loop through the filters

            let keyFilteredAds = [];

            for(let att in tempFilt[filterKey]) {
                // Loop through the filters of each attr
                let ff = this.state.originalAds.filter(function(i) {
                    return filterList(i, filterKey, tempFilt[filterKey][att] );
                });
                keyFilteredAds = arrayUnique(keyFilteredAds.concat(ff));
            }
            console.log('by key ' + filterKey + ' => ' + tempFilt[filterKey]);
            console.log(keyFilteredAds);

            if (filteredAds && filteredAds.length > 0) {
                filteredAds = intersect(keyFilteredAds, filteredAds);
                console.log('intersected between');
                console.log(keyFilteredAds);
                console.log(filteredAds);
            } else {
                filteredAds = keyFilteredAds;
                console.log('create new');
                console.log(filteredAds);
                if (!(filteredAds.length > 0)){
                    console.log('from scratch');
                    filteredAds = this.state.originalAds;
                }

            }

        }

        // save the state with the filters that applied
        this.setState({
            filterAtts: tempFilt,
            ads: filteredAds
        });
    }



    render() {
        // this is all the ads retrieved
        return (
            <div className="container-fluid">
                <h1>Report</h1>

                <div className="row">
                    <div className="col-3">
                        <Filter ads={this.state.originalAds} filteredAds={this.state.ads} filterAdlist={this.filterAds} />
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
