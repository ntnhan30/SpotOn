import React, { Component } from 'react';
//import CreateDropdownList from './dropdown';
import CreateMultiselect from './multiselect';
import CreateCalendar from './calendar';

import 'react-widgets/dist/css/react-widgets.css';

class Filter extends Component {

    constructor(...args) {
        super(...args)

        this.state = {
            //adState: this.props.ads,
            itemDropdown: this.props.dataDropdown
        }
    }


    filterAds = ( valueToFilter, key ) => {
        // Calls function in parent Component (selectReports.js)
        this.props.filterAdlist( valueToFilter, key );
    }

    render() {
        // Get the different attributes of every Ad
        const brands = [...new Set(this.props.ads.map( item => item.brand ))];
        const countries = [...new Set(this.props.ads.map( item => item.country ))];
        const lengths = [...new Set(this.props.ads.map( item => item.lengthAd ))];
        const industries = [...new Set(this.props.ads.map( item => item.industry ))];
        const channels = [...new Set(this.props.ads.map( item => item.channel ))];
        const productionStates = [...new Set(this.props.ads.map( item => item.productionState ))];
        const states = [...new Set(this.props.ads.map( item => item.state ))];


        // Display the sidebar
        return (
            <div>
                <h3>
                    Sidebar Filter
                </h3>

                <h4>Data Range</h4>
                    <CreateCalendar filter={this.filterAds} keyName={'campaigndate'} />

                <h4>Brand</h4>
                    <CreateMultiselect dataDropdown={brands} filter={this.filterAds} keyName={'brand'} />

                <h4>Industry</h4>
                    <CreateMultiselect dataDropdown={industries} filter={this.filterAds} keyName={'industry'} />

                <h4>Channel</h4>
                    <CreateMultiselect dataDropdown={channels} filter={this.filterAds} keyName={'channel'} />

                <h4>Country</h4>
                    <CreateMultiselect dataDropdown={countries} filter={this.filterAds} keyName={'country'} />

                <h4>Length</h4>
                    <CreateMultiselect dataDropdown={lengths} filter={this.filterAds} keyName={'lengthAd'} />

                <h4>Production State</h4>
                    <CreateMultiselect dataDropdown={productionStates} filter={this.filterAds} keyName={'productionState'} />

                <h4>Ad State</h4>
                    <CreateMultiselect dataDropdown={states} filter={this.filterAds} keyName={'state'} />
            </div>
        );
    }
}

export default Filter;
