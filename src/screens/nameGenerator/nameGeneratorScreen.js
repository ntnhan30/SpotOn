import React, { Component } from 'react'
import {
	NamingCodes,
	SingleCalendarMonth,
	DropdownFormElement,
	InputFormElement,
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
						<DropdownFormElement
							name={'industry'}
							data={industries}
							passData={getValuesFromInputs}
						/>
					</div>
					<div className="col-6">
						<DropdownFormElement
							name={'country'}
							data={countries}
							passData={getValuesFromInputs}
						/>
					</div>
					<div className="col-6">
						<DropdownFormElement
							name={'brand'}
							data={brands}
							passData={getValuesFromInputs}
						/>{' '}
					</div>
					<div className="col-6">
						<DropdownFormElement
							name={'channel'}
							data={channels}
							passData={getValuesFromInputs}
						/>
					</div>
					<div className="col-6">
						<SingleCalendarMonth passData={getValuesFromInputs} />
					</div>
					<div className="col-6">
						<InputFormElement
							name={'length'}
							placeholder={'Enter Length'}
							passData={getValuesFromInputs}
						/>
					</div>
					<div className="col-6">
						<InputFormElement
							name={'adname'}
							placeholder={'Enter Adname'}
							passData={getValuesFromInputs}
						/>
					</div>
					<div className="col-6">
						<InputFormElement
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
