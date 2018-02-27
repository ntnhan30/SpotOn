import React, { Component } from 'react';

class CircleProgress extends Component {
    render() {
        return (
            <div>
                <div className={"c100 big green p" + this.props.value}>
                    <span>{ this.props.value }</span>
                    <div className="slice">
                        <div className="bar"></div>
                        <div className="fill"></div>
                    </div>
                </div>
                <span>{ this.props.name }</span>
            </div>
        );
    }
}

export default CircleProgress;
