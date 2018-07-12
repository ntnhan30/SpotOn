import React, { Component } from 'react'

class SingleValueCell extends Component {
	render() {
		let { name, value, countryNorm } = this.props
		countryNorm = '[' + Math.round(this.props.countryNorm) + ']'

		return (
			<div className="singleValueCell">
				<h6>{name}</h6>
				<h4>
					{value}
					<span>{countryNorm}</span>
				</h4>
			</div>
		)
	}
}

export default SingleValueCell
