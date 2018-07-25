import React, { Component } from 'react'



class ColorTag extends Component {

	render() {
		let { country, difference, standardDeviation } = this.props

		let tagClassName = ''
		let diff = Math.round(difference)

		if (diff >= standardDeviation * 2) {
			tagClassName = 'green'
		} else if (diff >= standardDeviation) {
			tagClassName = 'subtle-green'
		} else if (diff >= -standardDeviation) {
			diff = ''
			tagClassName = 'normal'
		} else if (diff > -(standardDeviation * 2)) {
			tagClassName = 'subtle-red'
		} else {
			tagClassName = 'red'
		}

		if (diff > 0) {
			diff = '+' + diff
		} else if (isNaN(diff)) {
			diff = 0
		}

		return (
			<span className="color-tag">
				<span className={tagClassName}>{diff}</span>
			</span>
		)
	}
}

export default ColorTag
