import React, { Component } from 'react'
import Picker from 'react-month-picker'
import MonthBox from './monthbox'
require('react-month-picker-input/dist/react-month-picker-input.css')
var _ = require('lodash')

class CreateCalendar extends Component {
	constructor(props, context) {
		super(props, context)

		this.state = {
			mrange: {
				from: {
					year: 2010,
					month: 1
				},
				to: {
					year: new Date().getFullYear(),
					month: new Date().getMonth() + 1
				}
			},
			selectedRange: {
				from: {
					year: 2010,
					month: 1
				},
				to: {
					year: new Date().getFullYear(),
					month: new Date().getMonth() + 1
				}
			}
		}

		this._handleClickRangeBox = this._handleClickRangeBox.bind(this)
	}

	_handleClickRangeBox(e) {
		this.refs.pickRange.show()
	}

	getMinDate = (data, prop) => {
		let result = {}
		result.year = parseInt(this.state.selectedRange.to.year, 10)
		result.month = parseInt(this.state.selectedRange.to.month, 10)
		return data.reduce((r, obj) => {
			if (obj[prop] !== null) {
				let date = obj[prop].split('/') // [year, month]
				date[0] = parseInt('20' + date[0], 10)
				date[1] = parseInt(date[1], 10)
				if (date[0] < result.year) {
					result.year = date[0]
					result.month = date[1]
				} else if (date[0] === result.year) {
					if (date[1] <= result.month) {
						result.month = date[1]
					}
				}
				return result
			} else {
				return result
			}
		}, {})
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.ads.length > 0 && !_.isEqual(this.props, nextProps)) {
			const { year, month } = this.getMinDate(
				nextProps.ads,
				'campaigndate'
			)

			this.setState({
				mrange: {
					from: {
						year: parseInt(year, 10),
						month: month
					},
					to: {
						year: new Date().getFullYear(),
						month: new Date().getMonth() + 1
					}
				},
				selectedRange: {
					from: {
						year: parseInt(year, 10),
						month: month
					},
					to: {
						year: new Date().getFullYear(),
						month: new Date().getMonth() + 1
					}
				}
			})
		}
	}

	render() {
		const self = this

		const handleRangeChange = (year, month, listIndex) => {
			if (listIndex === 0) {
				selectedRange.from.year = parseInt(year, 10)
				selectedRange.from.month = month
			} else if (listIndex === 1) {
				selectedRange.to.year = parseInt(year, 10)
				selectedRange.to.month = month
			}

			// Send the new range to parent component filter
			const thisValue = [selectedRange]
			self.props.filter(thisValue, self.props.keyName)

			// Set the new state
			self.setState({ selectedRange: selectedRange })
		}

		const handleRangeDissmis = value => {
			//self.setState({ mrange: value })
		}

		const pickerLang = {
			months: [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec'
			],
			from: 'From',
			to: 'To'
		}

		let makeText = m => {
			if (m && m.year && m.month)
				return pickerLang.months[m.month - 1] + '. ' + m.year
			return '?'
		}

		const mrange = this.state.mrange
		const selectedRange = this.state.selectedRange

		return (
			<Picker
				ref="pickRange"
				years={{
					min: { year: mrange.from.year, month: mrange.from.month },
					max: { year: mrange.to.year, month: mrange.to.month }
				}}
				range={this.state.selectedRange}
				lang={pickerLang}
				theme="light"
				onChange={handleRangeChange}
				onDismiss={handleRangeDissmis}
			>
				<MonthBox
					value={
						makeText(selectedRange.from) +
						' to ' +
						makeText(selectedRange.to)
					}
					onClick={this._handleClickRangeBox}
				/>
			</Picker>
		)
	}
}

export default CreateCalendar
