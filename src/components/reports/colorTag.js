import React, { Component } from 'react'

class ColorTag extends Component {
	render() {
		let tagClassName = ''
		let diff = Math.round(this.props.difference)

		if (diff >= 15) {
			tagClassName = 'green'
		} else if (diff >= 7) {
			tagClassName = 'subtle-green'
		} else if (diff >= -7) {
			diff = ''
			tagClassName = 'normal'
		} else if (diff > -15) {
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
