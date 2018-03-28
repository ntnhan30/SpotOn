import React, { Component } from 'react';
import { ColorChart } from '../functions';

const colorChart = new ColorChart();

class CircleProgress extends Component {
    static defaultProps = {
        colorChart
    }

    render() {
        const classes = this.props.value + ' ' + this.props.size;
        const countryNorm = '[' + Math.round(this.props.countryNorm) + ']';

        return (
            <div>
                <div className={ "c100 green p" + classes }>
                    <span>
                        { this.props.name }
                        <span>
                            { this.props.value }
                            <i>{ countryNorm }</i>
                        </span>
                    </span>
                    <div className="slice">
                        <div className="bar"></div>
                        <div className="fill"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CircleProgress;
