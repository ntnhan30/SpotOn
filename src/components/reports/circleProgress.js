import React, { Component } from 'react';
import { ColorChart } from '../functions';

const colorChart = new ColorChart();

class CircleProgress extends Component {
    static defaultProps = {
        colorChart
    }

    render() {
        const classes = this.props.value + ' ' + this.props.size;
        const color = this.props.colorChart.getProgressColor(this.props.value);

        return (
            <div>
                <div className={ "c100 green p" + classes }>
                    <span>
                        { this.props.name }
                        <span>{ this.props.value }</span>
                    </span>
                    <div className="slice">
                        <div className="bar" style={{borderColor: color + '!important'}}></div>
                        <div className="fill" style={{borderColor: color + '!important'}}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CircleProgress;
