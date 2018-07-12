import React, { Component } from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
var _ = require('lodash')

class CreateMultiselect extends Component {
	constructor(...args) {
		super(...args)

		this.state = {
			value: []
		}
	}

	render() {
		const self = this
		const { value } = this.state
		const { dataDropdown, placeholder, keyName, filter } = this.props

		const options = []

		dataDropdown.forEach(function(d) {
			options.push({
				label: d,
				value: d
			})
		})

		const handleSelectChange = value => {
			self.setState({ value })
			value = _.values(
				value.map(i => {
					return i['label']
				})
			)
			filter(value, keyName)
		}

		return (
			<Select
				closeOnSelect={true}
				disabled={false}
				multi
				onChange={handleSelectChange}
				options={options}
				placeholder={placeholder}
				removeSelected={true}
				value={value}
			/>
		)
	}
}

export default CreateMultiselect
