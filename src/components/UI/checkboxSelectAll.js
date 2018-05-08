import React, { Component } from 'react'
import Checkbox from 'rc-checkbox'
var _ = require('lodash')

class CheckBoxSelectAll extends Component {
	constructor(props) {
		super(props)
		this.state = {
			checked: false
		}
	}

	handleInputChange(event) {
		this.bulkToggleAds(event.target.checked)
		this.setState({ checked: event.target.checked })
	}

	bulkToggleAds(checked) {
		const { ads, toggleSelection } = this.props

		// Get an array of alll the shown Ads
		let shownAds = _.map(ads, function(a) {
			if (a.show === true) return a
		})
		shownAds = _.compact(shownAds)

		for (var i in shownAds) {
			toggleSelection(shownAds[i].adname, checked)
		}
	}

	render() {
		const { checked } = this.state
		let { filterAtts } = this.props
		filterAtts = _.omitBy(filterAtts, _.isEmpty)

		console.log(filterAtts)

		if (_.isEmpty(filterAtts)) {
			if (checked) {
				this.setState({ checked: false })
			}
			return null
		} else {
			return (
				<Checkbox
					className={'selectAll'}
					checked={checked}
					onChange={e => this.handleInputChange(e)}
				/>
			)
		}
	}
}

export default CheckBoxSelectAll
