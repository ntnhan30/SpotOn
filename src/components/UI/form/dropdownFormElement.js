import React, { Component } from 'react'
import { DropdownList } from 'react-widgets'
var _ = require('lodash')

class DropdownFormElement extends Component {
	render() {
		const { name, data, passData } = this.props

		return (
			<DropdownList
				filter
				data={_.values(data)}
				placeholder={'Select ' + name}
				allowCreate="onFilter"
				onSelect={i => {
					let result = {}
					result[name] = i
					passData(result)
				}}
				textField="name"
			/>
		)
	}
}

export default DropdownFormElement
