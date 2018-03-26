import React, { Component } from 'react';
import { ColorChart } from '../functions';

const colorChart = new ColorChart();

class CircleProgress extends Component {
    static defaultProps = {
        colorChart
    }

    render() {
        const classes = this.props.value + ' ' + this.props.size;
        let color = this.props.colorChart.getProgressColor(this.props.value);
        color = color + ' !important';
        console.log(color);

        return (
            <div>
                <div className={ "c100 green p" + classes }>
                    <span>
                        { this.props.name }
                        <span>{ this.props.value }</span>
                    </span>
                    <div className="slice">
                        <div className="bar" style={{borderColor: color}}></div>
                        <div className="fill" style={{borderColor: color}}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CircleProgress;
