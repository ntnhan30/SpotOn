import React, { Component } from 'react'
import { Multiselect } from 'react-widgets'
var _ = require('lodash')

/**
 * Creates a reusable <Multiselect/> element
 *
 * @param {Array} props.values			Array of values selected
 */
class MultiselectFormElement extends Component {
	constructor(...args) {
		super(...args)

		this.state = {
			values: []
		}
	}

	static getDerivedStateFromProps(nextProps, prevState, prevProps) {
		let { values } = nextProps
		return values !== undefined ? { values } : null
	}

	render() {
		const { name, data, passData } = this.props

		return (
			<Multiselect
				filter
				data={_.values(data)}
				placeholder={'Select ' + name}
				value={this.state.values}
				allowCreate="onFilter"
				onChange={(i, k) => {
					//self.setState({ values: i })
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
