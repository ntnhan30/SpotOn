import React, { Component } from 'react';
import CreateDropdownList from './dropdown';
import CreateMultiselect from './multiselect';

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
        const types = [...new Set(this.props.ads.map( item => item.type ))];
        const series = [...new Set(this.props.ads.map( item => item.series ))];
        const industries = [...new Set(this.props.ads.map( item => item.industry ))];
        const productionStates = [...new Set(this.props.ads.map( item => item.productionState ))];
        const formats = [...new Set(this.props.ads.map( item => item.format ))];
        const adStates = [...new Set(this.props.ads.map( item => item.adState ))];


        // Display the sidebar
        return (
            <div>
                <h3>
                    Sidebar Filter
                </h3>

                <h4>Data Range</h4>
                <br/>

                <h4>Brand</h4>
                    <CreateMultiselect dataDropdown={brands} filter={this.filterAds} keyName={'brand'} />

                <h4>Type Campagin - or name??</h4>
                    <CreateMultiselect dataDropdown={types} filter={this.filterAds} keyName={'type'} />

                <h4>Series</h4>
                    <CreateMultiselect dataDropdown={series} filter={this.filterAds} keyName={'series'} />

                <h4>Format (length)</h4>
                    <CreateMultiselect dataDropdown={formats} filter={this.filterAds} keyName={'format'} />

                <h4>Industry</h4>
                    <CreateMultiselect dataDropdown={industries} filter={this.filterAds} keyName={'industry'} />

                <h4>Production State</h4>
                    <CreateMultiselect dataDropdown={productionStates} filter={this.filterAds} keyName={'productionState'} />

                <h4>Ad State</h4>
                    <CreateMultiselect dataDropdown={adStates} filter={this.filterAds} keyName={'adState'} />
            </div>
        );
    }
}

export default Filter;
