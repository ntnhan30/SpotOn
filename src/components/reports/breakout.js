import React, { Component, Fragment } from 'react'
import {
	CreateMultiselect,
	CreateToggle,
	FilterResults
} from '../../components'
var _ = require('lodash')

class Breakout extends Component {
	constructor(...args) {
		super(...args)

		this.filterResults = new FilterResults()

		this.state = {
			isOpen: false,
			currentBreakout: {}
		}
	}

	handleClick = () => { }

	filterAds = async (v, key) => {
		const { ads, selectedAds, breakoutSelectedAds } = this.props
		let { currentBreakout } = this.state

		let newTabulated = await this.filterResults.init(
			ads,
			selectedAds,
			v,
			key
		)
		breakoutSelectedAds(newTabulated)


		if (_.isEmpty(v)) {
			currentBreakout = _.omit(currentBreakout, [key]);
		} else {
			currentBreakout[key] = v
		}
		this.setState({ currentBreakout })
	}

	render() {
		const { isInsideReport, mode } = this.props
		const { isOpen } = this.state

		const age = ['18 - 24', '25 - 35']
		const gender = ['Male', 'Female']
		const heavyUsers = [true, false]

		const openBreakout = (
			<h3
				className={'breakoutTitle'}
				onClick={() => {
					this.setState({
						isOpen: !isOpen
					})
				}}>
				Breakout
			</h3>
		)

		const checkIfShouldBeDisabled = (key) => {
			const { currentBreakout } = this.state

			if (_.isEmpty(currentBreakout)) {
				return false
			}

			if (_.isEmpty(currentBreakout[key])) {
				return true
			}

			return false

		}

		const classNameOpen = isOpen ? 'open' : ''

		if (isInsideReport && mode === 'YT') {
			return (
				<Fragment>
					{openBreakout}
					<div className={'breakout ' + classNameOpen}>
						<CreateMultiselect
							dataDropdown={age}
							filter={this.filterAds}
							keyName={'Age'}
							placeholder={'Age bracket'}
							disabled={checkIfShouldBeDisabled('Age')}
						/>

						{/*
						<CreateDropdownList
							dataDropdown={gender}
							filter={this.filterAds}
							keyName={'Gender'}
							placeholder={'Gender'}
						/>
						*/}
						<CreateMultiselect
							dataDropdown={gender}
							filter={this.filterAds}
							keyName={'Gender'}
							placeholder={'Gender'}
							disabled={checkIfShouldBeDisabled('Gender')}
						/>

						<CreateToggle
							dataDropdown={heavyUsers}
							filter={this.filterAds}
							keyName={'Heavy Users'}
							placeholder={'Only Heavy Users?'}
							disabled={checkIfShouldBeDisabled('Heavy Users')}
						/>
					</div>
				</Fragment>
			)
		} else {
			return null
		}
	}
}

export default Breakout
