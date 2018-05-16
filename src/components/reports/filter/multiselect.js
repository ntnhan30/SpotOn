import React, { Component } from 'react'
import { Multiselect } from 'react-widgets'

class CreateMultiselect extends Component {
	constructor(...args) {
		super(...args)

		this.state = {
			values: []
		}
	}

	render() {
		const self = this
		const { dataDropdown, placeholder, keyName, filter } = this.props

		return (
			<Multiselect
				filter
				data={dataDropdown}
				placeholder={placeholder}
				value={this.state.values}
				allowCreate="onFilter"
				onChange={function(i, k) {
					self.setState({ values: i })
					filter(i, keyName)
				}}
				textField="name"
			/>
		)
	}
}

export default CreateMultiselect
