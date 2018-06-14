import React, { Component } from 'react'
import { SmallLoadingSpinner, Api } from '../../components'
var _ = require('lodash')

class AdCPA extends Component {
	constructor() {
		super()
		this.state = {
			cpa: {}
		}

		this.api = new Api()
	}

	async componentDidMount() {
		const { thisAd } = this.props

		if (!_.isEmpty(thisAd.CPA_name)) {
			const thisCPA = await this.api.fetchAdCPA(thisAd.CPA_name)
			this.setState({
				cpa: thisCPA
			})
		}
	}

	render() {
		const { cpa } = this.state
		if (_.isEmpty(cpa)) {
			return null
		} else {
			return (
				<div className={'cpa'}>
					<table>
						<tbody>
							<tr>
								<td>CPA:</td>
								<td>€{cpa.CPA_euro.toFixed(2)}</td>
							</tr>

							{cpa.CPA_local === cpa.CPA_euro ? null : (
								<tr>
									<td>Local CPA:</td>
									<td>{cpa.CPA_local.toFixed(2)}</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			)
		}
	}
}

export default AdCPA
