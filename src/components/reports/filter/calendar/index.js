import React, { Component } from 'react';
import Picker from 'react-month-picker'
import MonthBox from './monthbox';
require('react-month-picker-input/dist/react-month-picker-input.css');

class CreateCalendar extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            mrange: {from: {year: 2010, month: 1}, to: { year: (new Date()).getFullYear(), month: (new Date()).getMonth()+1 }},
            selectedRange: {from: {year: 2010, month: 1}, to: { year: (new Date()).getFullYear(), month: (new Date()).getMonth()+1 }}
        }

        this._handleClickRangeBox = this._handleClickRangeBox.bind(this)
    }


    _handleClickRangeBox(e) {
        this.refs.pickRange.show();
        console.log('_handleClickRangeBox');
    }

    render() {
        const self = this;

        const handleRangeChange = (year, month, listIndex) => {
            if (listIndex === 0) {
                console.log('change from');
                selectedRange['from']['year'] = year;
                selectedRange['from']['month'] = month;
            } else if (listIndex === 1) {
                console.log('change to');
                selectedRange['to']['year'] = year;
                selectedRange['to']['month'] = month;
            }


            // Send the new range to parent component filter
            const thisValue = [selectedRange];
            self.props.filter(thisValue, self.props.keyName);

            // Set the new state
            self.setState({ selectedRange: selectedRange })
        }

        const handleRangeDissmis = (value) => {
            //self.setState({ mrange: value })
        }

        const pickerLang = {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            from: 'From', to: 'To',
        }

        let makeText = m => {
            if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
            return '?'
        }

        const mrange = this.state.mrange;
        const selectedRange = this.state.selectedRange;



        return (
            <Picker
                ref="pickRange"
                years= {
                    {
                        min: { year: mrange['from']['year'], month: mrange['from']['month'] },
                        max: { year: mrange['to']['year'], month: mrange['to']['month'] }
                    }
                }
                range={this.state.selectedRange}
                lang={pickerLang}
                theme="light"
                onChange={handleRangeChange}
                onDismiss={handleRangeDissmis}
            >
                <MonthBox value={makeText(selectedRange.from) + ' to ' + makeText(selectedRange.to)} onClick={this._handleClickRangeBox} />
            </Picker>
        )
    }
}

export default CreateCalendar;
