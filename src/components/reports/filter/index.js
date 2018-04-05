import React, { Component } from 'react'
import CreateMultiselect from './multiselect.js'
import CreateCalendar from './calendar.js'
import RangeSlider from './rangeSlider.js'

import 'react-widgets/dist/css/react-widgets.css'

class FilterSidebar extends Component {
	constructor(...args) {
		super(...args)

		this.state = {
			itemDropdown: this.props.dataDropdown,
			ads: []
		}
	}

	filterAds = (valueToFilter, key) => {
		// Calls function in parent Component (selectReports.js)
		this.props.filterAdlist(valueToFilter, key)
	}

	render() {
		// Get the different attributes of every Ad
		const brands = [
			...new Set(this.props.ads.map(item => item.brand))
		].sort()
		const countries = [
			...new Set(this.props.ads.map(item => item.country))
		].sort()
		//const lengths = [...new Set(this.props.ads.map( item => item.lengthAd ))].sort();
		const industries = [
			...new Set(this.props.ads.map(item => item.industry))
		].sort()
		const channels = [
			...new Set(this.props.ads.map(item => item.channel))
		].sort()
		const productionStates = [
			...new Set(this.props.ads.map(item => item.productionState))
		].sort()
		const states = [
			...new Set(this.props.ads.map(item => item.state))
		].sort()

		// Display the sidebar
		return (
			<div>
				<table className="table">
					<thead className="thead-dark">
						<tr>
							<th scope="col">FILTER</th>
						</tr>
					</thead>
				</table>
				<div>
					<CreateCalendar
						ads={this.props.ads}
						filter={this.filterAds}
						keyName={'campaigndate'}
					/>

					<CreateMultiselect
						dataDropdown={brands}
						filter={this.filterAds}
						keyName={'brand'}
					/>

					<CreateMultiselect
						dataDropdown={industries}
						filter={this.filterAds}
						keyName={'industry'}
					/>

					<CreateMultiselect
						dataDropdown={channels}
						filter={this.filterAds}
						keyName={'channel'}
					/>

					<CreateMultiselect
						dataDropdown={countries}
						filter={this.filterAds}
						keyName={'country'}
					/>

					<RangeSlider
						ads={this.props.ads}
						filter={this.filterAds}
						keyName={'lengthAd'}
					/>

					<CreateMultiselect
						dataDropdown={productionStates}
						filter={this.filterAds}
						keyName={'productionState'}
					/>

					<CreateMultiselect
						dataDropdown={states}
						filter={this.filterAds}
						keyName={'state'}
					/>
				</div>
			</div>
		)
	}
}

export default FilterSidebar
