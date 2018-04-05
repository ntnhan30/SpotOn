import React, { Component } from 'react'

class SearchBar extends Component {
	render() {
		return (
			<input
				type="text"
				className="form-control form-control-lg"
				placeholder="Search"
			/>
		)
	}
}

export default SearchBar
