import React, { Component, Fragment } from 'react'
import {
	CreateMultiselect,
	CreateDropdownList,
	CreateToggle,
	FilterResults
} from '../../components'

class Breakout extends Component {
	constructor(...args) {
		super(...args)

		this.filterResults = new FilterResults()

		this.state = {
			isOpen: false
		}
	}

	handleClick = () => {}

	filterAds = async (v, key) => {
		const { ads, selectedAds, breakoutSelectedAds } = this.props

		let newTabulated = await this.filterResults.init(
			ads,
			selectedAds,
			v,
			key
		)
		breakoutSelectedAds(newTabulated)
	}

	render() {
		const { isInsideReport } = this.props
		const { isOpen } = this.state

		const age = ['18 - 24', '25 - 34', '35 - 44', '45 - 54']
		const gender = ['All', 'Male', 'Female']
		const heavyUsers = [true, false]
		const maritalStatus = [
			'Single',
			'Married without children',
			'Married with children'
		]

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

		const classNameOpen = isOpen ? 'open' : ''

		if (isInsideReport) {
			return (
				<Fragment>
					{openBreakout}
					<div className={'breakout ' + classNameOpen}>
						<CreateMultiselect
							dataDropdown={age}
							filter={this.filterAds}
							keyName={'Age'}
							placeholder={'Age bracket'}
						/>

						<CreateDropdownList
							dataDropdown={gender}
							filter={this.filterAds}
							keyName={'Gender'}
							placeholder={'Gender'}
						/>

						<CreateMultiselect
							dataDropdown={maritalStatus}
							filter={this.filterAds}
							keyName={'Marital Status'}
							placeholder={'Marital Status'}
						/>

						<CreateToggle
							dataDropdown={heavyUsers}
							filter={this.filterAds}
							keyName={'Heavy Users'}
							placeholder={'Only Heavy Users?'}
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
