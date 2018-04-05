import React, { Component } from 'react'
import { DropdownList } from 'react-widgets'

class CreateDropdownList extends Component {
	render() {
		const self = this
		const key = this.props.keyName

		return (
			<DropdownList
				filter
				data={this.props.dataDropdown}
				placeholder={key}
				allowCreate="onFilter"
				onSelect={function(i) {
					// enclose the value in an array
					const thisValue = [i]
					self.props.filter(thisValue, key)
				}}
				textField="name"
			/>
		)
	}
}

export default CreateDropdownList
