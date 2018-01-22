import React, { Component } from 'react';

class MonthBox extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            value: this.props.value || 'N/A',
        }

        this._handleClick = this._handleClick.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            value: nextProps.value || 'N/A',
        })
    }

    _handleClick(e) {
        this.props.onClick && this.props.onClick(e);
        console.log('clicked');
    }

    render() {

        return (
            <div className="box" onClick={this._handleClick}>
                <label>{this.state.value}</label>
            </div>
        )
    }

}

export default MonthBox;
