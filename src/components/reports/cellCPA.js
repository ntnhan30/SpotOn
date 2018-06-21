import React, { Component } from 'react'
import { Api, SmallLoadingSpinner } from '../../components'
var _ = require('lodash')

class CellCPA extends Component {
	constructor() {
		super()
		this.state = {
			cpa: {},
			empty: false
		}

		this.api = new Api()
	}

	async componentDidMount() {
		const { cpa } = this.props

		if (!_.isEmpty(cpa)) {
			const thisCPA = await this.api.fetchAdCPA(cpa)
			this.setState({
				cpa: thisCPA
			})
		} else {
			this.setState({
				empty: true
			})
		}
	}

	render() {
		const { cpa, empty } = this.state

		if (empty) {
			return <span>- / -</span>
		}
		if (_.isEmpty(cpa)) {
			return <SmallLoadingSpinner />
		} else {
			return (
				<span>
					€{cpa.CPA_euro.toFixed(2)} / {cpa.GRP}
				</span>
			)
		}
	}
}

export default CellCPA
