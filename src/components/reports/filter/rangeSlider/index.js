


import React, { Component } from 'react';
import InputRange from 'react-input-range';
var _ = require('lodash');

class RangeSlider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: {
                min: 1,
                max: 2
            },
            minValue: 1,
            maxValue: 2,
            isLoaded: false
        };
    }


    getMinMax = (data, prop) => {
        return data.reduce((result, obj) => {
            if (parseInt(obj[prop], 10) < result.min) {
               result.min = parseInt(obj[prop],10);
            }
            if (parseInt(obj[prop], 10) > result.max) {
               result.max = parseInt(obj[prop],10);
            }
           return result;
        }, {min: Number.MAX_VALUE, max: Number.MIN_VALUE})
    }

    componentWillReceiveProps ( nextProps ) {
        if ( nextProps.ads.length > 0 && !(_.isEqual(this.props, nextProps)) && !this.state.loaded ){
            const { min, max } = this.getMinMax(nextProps.ads, 'lengthAd');
            this.setState({
                value: {
                    min: min,
                    max: max
                },
                minValue: min,
                maxValue: max,
                isLoaded: true
            })
        }
    }


    render() {
        const self = this;

        const handleRangeChange = ( v ) => {
            // Send the new range to parent component filter
            const thisValue = [v];
            self.props.filter(thisValue, self.props.keyName);

            // Set the new state
            this.setState({ value: v })
        }

        return (
            <InputRange
                maxValue={ this.state.maxValue }
                minValue={ this.state.minValue }
                value={ this.state.value }
                onChange={ value => handleRangeChange(value) }
            />
        );
    }
}
export default RangeSlider;





