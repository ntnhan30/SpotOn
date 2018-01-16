import React, { Component } from 'react';

class Filter extends Component {

    render() {

        // Get the different attributes of every Ad
        const adStates = [...new Set(this.props.ads.map(item => item.adState))].map((adState, i) => {
            return (
                <li key={i}>
                    {adState}
                </li>
            );
        });

        const brands = [...new Set(this.props.ads.map(item => item.brand))].map((brand, i) => {
            return (
                <li key={i}>
                    {brand}
                </li>
            );
        });

        const formats = [...new Set(this.props.ads.map(item => item.format))].map((format, i) => {
            return (
                <li key={i}>
                    {format}
                </li>
            );
        });

        const industries = [...new Set(this.props.ads.map(item => item.industry))].map((industry, i) => {
            return (
                <li key={i}>
                    {industry}
                </li>
            );
        });

        const productionStates = [...new Set(this.props.ads.map(item => item.productionState))].map((productionState, i) => {
            return (
                <li key={i}>
                    {productionState}
                </li>
            );
        });

        const series = [...new Set(this.props.ads.map(item => item.series))].map((series, i) => {
            return (
                <li key={i}>
                    {series}
                </li>
            );
        });

        const types = [...new Set(this.props.ads.map(item => item.type))].map((type, i) => {
            return (
                <li key={i}>
                    {type}
                </li>
            );
        });


        // Display the attributes
        return (
            <div>
                <h3>
                    This is the filter
                </h3>
                <ul>
                    <li><b>Data Range</b>
                        <ul>

                        </ul>
                    </li>
                    <li><b>Brand</b>
                        <ul>
                            {brands}
                        </ul>
                    </li>
                    <li><b>Type Campagin - or name??</b>
                        <ul>
                            {types}
                        </ul>
                    </li>
                    <li><b>Series</b>
                        <ul>
                            {series}
                        </ul>
                    </li>
                    <li><b>Format (length)</b>
                        <ul>
                            {formats}
                        </ul>
                    </li>
                    <li><b>Industry</b>
                        <ul>
                            {industries}
                        </ul>
                    </li>
                    <li><b>Production State</b>
                        <ul>
                            {productionStates}
                        </ul>
                    </li>
                    <li><b>Ad State</b>
                        <ul>
                            {adStates}
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Filter;
