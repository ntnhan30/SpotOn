import React, { Component, Fragment } from 'react'
import { DropdownList } from 'react-widgets'
import { NamingCodes, SingleCalendarMonth } from '../../components'
import { CopyToClipboard } from 'react-copy-to-clipboard'

var _ = require('lodash')

class NameGenerator extends Component {
	constructor(...args) {
		super(...args)

		this.namingCodes = new NamingCodes()
		this.state = {
			values: {}
		}
	}

	decodedName() {
		let { values } = this.state
		const { industries, countries, brands, channels } = this.namingCodes

		let name = ''

		let industryCode = _.findKey(industries, o => {
			return o === values.industry
		})
		let countryCode = _.findKey(countries, o => {
			return o === values.country
		})
		let brandCode = _.findKey(brands, o => {
			return o === values.brand
		})
		let channelCode = _.findKey(channels, o => {
			return o === values.channel
		})

		let dateCode = !_.isEmpty(values.date)
			? values.date.year + '' + values.date.month
			: ''

		name =
			industryCode +
			'_' +
			brandCode +
			'_' +
			countryCode +
			'_' +
			channelCode +
			'_' +
			values.length +
			'_' +
			dateCode +
			'_' +
			values.adname +
			'_' +
			values.version

		return name.toUpperCase()
	}

	render() {
		const self = this
		let { values } = this.state

		const { industries, countries, brands, channels } = this.namingCodes

		const dropdown = (v, dataDropdown) => (
			<DropdownList
				filter
				data={_.values(dataDropdown)}
				placeholder={'Select ' + v}
				allowCreate="onFilter"
				onSelect={i => {
					values[v] = i
					self.setState({ values })
				}}
				textField="name"
			/>
		)

		const inputText = (v, placeholder) => (
			<input
				type="text"
				placeholder={placeholder}
				value={this.state.values.v}
				onChange={e => {
					const textFromInput = e.target.value
					values[v] = textFromInput
					self.setState({ values })
				}}
			/>
		)

		const getValuesFromCalendar = dateObj => {
			let { values } = self.state
			values.date = dateObj
			self.setState({ values })
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col-sm">
						<h1>Name Generator</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-sm">
						<div style={{ width: '100%' }}>
							{dropdown('industry', industries)}
							{dropdown('country', countries)}
							{dropdown('brand', brands)}
							{dropdown('channel', channels)}
							<SingleCalendarMonth
								passData={getValuesFromCalendar}
							/>
							{inputText('length', 'Enter Length')}
							{inputText('adname', 'Enter Adname')}
							{inputText('version', 'Enter version')}
						</div>

						{this.decodedName()}
						<CopyToClipboard
							//onCopy={this.onCopy}
							options={{ message: 'Whoa!' }}
							text={this.decodedName()}>
							<button onClick={this.onClick}>
								Copy to clipboard with onClick prop
							</button>
						</CopyToClipboard>
					</div>
				</div>
			</div>
		)
	}
}

export default NameGenerator
