import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { NamingCodes } from '../../components'
var _ = require('lodash')

class CopyNameToClipboard extends Component {
	constructor(...args) {
		super(...args)

		this.namingCodes = new NamingCodes()
	}

	decodedName() {
		let { values } = this.props
		const { industries, countries, brands, channels } = this.namingCodes

		let industryCode = _.findKey(industries, o => {
			return o === values.industry
		})
		industryCode = industryCode === undefined ? '' : industryCode + '_'

		let countryCode = _.findKey(countries, o => {
			return o === values.country
		})
		countryCode = countryCode === undefined ? '' : countryCode + '_'

		let brandCode = _.findKey(brands, o => {
			return o === values.brand
		})
		brandCode = brandCode === undefined ? '' : brandCode + '_'

		let channelCode = _.findKey(channels, o => {
			return o === values.channel
		})
		channelCode = channelCode === undefined ? '' : channelCode + '_'

		let length = values.length === undefined ? '' : values.length + '_'

		let dateCode = !_.isEmpty(values.date)
			? values.date.year + '' + values.date.month + '_'
			: ''

		let adname = values.adname === undefined ? '' : values.adname + '_'

		let version = values.version === undefined ? '' : values.version + '_'

		let name =
			industryCode +
			brandCode +
			countryCode +
			channelCode +
			length +
			dateCode +
			adname +
			version

		return name.toUpperCase()
	}

	render() {
		return (
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Spot name"
					aria-describedby="basic-addon2"
					value={this.decodedName()}
					disabled
					onChange={e => {}}
				/>
				<div className="input-group-append">
					<CopyToClipboard
						className="btn btn-outline-secondary"
						text={this.decodedName()}>
						<button onClick={this.onClick}>
							Copy to clipboard
						</button>
					</CopyToClipboard>
				</div>
			</div>
		)
	}
}

export default CopyNameToClipboard
