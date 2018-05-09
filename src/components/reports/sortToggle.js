import React, { Component, Fragment } from 'react'

class SortToggle extends Component {
	arrow() {
		const { keyName, sorting } = this.props

		if (keyName === sorting.key) {
			if (sorting.order === 'asc') {
				return <span className="icon-arrow_drop_down" />
			} else {
				return <span className="icon-arrow_drop_up" />
			}
		} else {
			return null
		}
	}

	render() {
		const { title, keyName, sortAds } = this.props

		return (
			<th
				style={{ cursor: 'pointer' }}
				scope="col"
				onClick={() => {
					sortAds(keyName)
				}}>
				{title}
				{this.arrow()}
			</th>
		)
	}
}

export default SortToggle
