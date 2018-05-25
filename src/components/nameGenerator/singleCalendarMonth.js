import React, { Component } from 'react'
import Picker from 'react-month-picker'
import { MonthBox } from '../../components'
require('react-month-picker-input/dist/react-month-picker-input.css')

class SingleCalendarMonth extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			value: {
				year: 2015,
				month: 11
			}
		}

		this._handleClickMonthBox = this._handleClickMonthBox.bind(this)
		this._handleAMonthChange = this._handleAMonthChange.bind(this)
	}

	_handleClickMonthBox(e) {
		this.refs.pickAMonth.show()
	}

	_handleAMonthChange = (year, month) => {
		this.setState({
			value: {
				year,
				month
			}
		})

		year = +year.toString().slice(-2) //convert to string
		this.props.passData({ year, month })
	}

	render() {
		const { value } = this.state
		let pickerLang = {
			months: [
				'Jan',
				'Feb',
				'Mar',
				'Spr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec'
			]
		}

		let makeText = m => {
			if (m && m.year && m.month)
				return pickerLang.months[m.month - 1] + '. ' + m.year
			return '?'
		}

		return (
			<Picker
				ref="pickAMonth"
				years={[2008, 2010, 2011, 2012, 2014, 2015, 2016, 2017, 2018]}
				value={value}
				lang={pickerLang.months}
				theme="light"
				onChange={this._handleAMonthChange}>
				<MonthBox
					value={makeText(value)}
					onClick={this._handleClickMonthBox}
				/>
			</Picker>
		)
	}
}

export default SingleCalendarMonth
