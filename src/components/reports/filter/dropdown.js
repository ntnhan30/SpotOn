import React, { Component } from 'react'
import { DropdownList } from 'react-widgets'

class CreateDropdownList extends Component {
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
			<DropdownList
				filter
				data={dataDropdown}
				placeholder={placeholder}
				allowCreate="onFilter"
				onSelect={function(i) {
					// enclose the value in an array
					const thisValue = [i]
					self.setState({ values: i })
					filter(thisValue, keyName)
				}}
				textField="name"
			/>
		)
	}
}

export default CreateDropdownList
