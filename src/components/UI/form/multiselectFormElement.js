import React, { Component } from 'react'
import { Multiselect } from 'react-widgets'
var _ = require('lodash')

class MultiselectFormElement extends Component {
	constructor(...args) {
		super(...args)

		this.state = {
			values: []
		}
	}

	render() {
		const self = this
		const { name, data, passData } = this.props

		return (
			<Multiselect
				filter
				data={_.values(data)}
				placeholder={'Select ' + name}
				value={this.state.values}
				allowCreate="onFilter"
				onChange={function(i, k) {
					self.setState({ values: i })

					let result = {}
					result[name] = i
					passData(result)
				}}
				textField="name"
			/>
		)
	}
}

export default MultiselectFormElement
