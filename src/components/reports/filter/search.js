import React, { Component } from 'react'

class SearchBar extends Component {
	constructor(props) {
		super(props)
		this.state = { value: '' }

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		const value = event.target.value
		const { keyName } = this.props

		this.props.filter([value], keyName)
		this.setState({ value })
	}

	render() {
		return (
			<input
				type="text"
				className="form-control form-control-lg rw-widget-container"
				placeholder="Search by name"
				value={this.state.value}
				onChange={this.handleChange}
			/>
		)
	}
}

export default SearchBar
