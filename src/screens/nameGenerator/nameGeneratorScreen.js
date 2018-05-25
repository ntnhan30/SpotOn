import React, { Component, Fragment } from 'react'
import {
	NamingCodes,
	SingleCalendarMonth,
	DropdownNameGenerator,
	InputNameGenerator,
	CopyNameToClipboard
} from '../../components'

var _ = require('lodash')

class NameGenerator extends Component {
	constructor(...args) {
		super(...args)

		this.namingCodes = new NamingCodes()
		this.state = {
			values: {}
		}
	}

	render() {
		const self = this
		let { values } = this.state

		const { industries, countries, brands, channels } = this.namingCodes

		const getValuesFromInputs = newObj => {
			let { values } = self.state
			values = _.merge(values, newObj)
			self.setState({ values })
		}

		return (
			<div className="container">
				<div className="row name-generator-screen">
					<div className="col-12">
						<h1>Name Generator</h1>
					</div>

					<div className="col-6">
						<DropdownNameGenerator
							name={'industry'}
							data={industries}
							passData={getValuesFromInputs}
						/>
					</div>
					<div className="col-6">
						<DropdownNameGenerator
							name={'country'}
							data={countries}
							passData={getValuesFromInputs}
						/>
					</div>
					<div className="col-6">
						<DropdownNameGenerator
							name={'brand'}
							data={brands}
							passData={getValuesFromInputs}
						/>{' '}
					</div>
					<div className="col-6">
						<DropdownNameGenerator
							name={'channel'}
							data={channels}
							passData={getValuesFromInputs}
						/>
					</div>
					<div className="col-6">
						<SingleCalendarMonth passData={getValuesFromInputs} />
					</div>
					<div className="col-6">
						<InputNameGenerator
							name={'length'}
							placeholder={'Enter Length'}
							passData={getValuesFromInputs}
						/>
					</div>
					<div className="col-6">
						<InputNameGenerator
							name={'adname'}
							placeholder={'Enter Adname'}
							passData={getValuesFromInputs}
						/>
					</div>
					<div className="col-6">
						<InputNameGenerator
							name={'version'}
							placeholder={'Enter version'}
							passData={getValuesFromInputs}
						/>
					</div>

					<div className="col-12">
						<CopyNameToClipboard values={this.state.values} />
					</div>
				</div>
			</div>
		)
	}
}

export default NameGenerator
