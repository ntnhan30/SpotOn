import React, { Component, Fragment } from 'react'
import SearchBar from './search.js'
import CreateMultiselect from './multiselect.js'
import CreateCalendar from './calendar.js'
import RangeSlider from './rangeSlider.js'
import { AppContext } from '../../context'

import 'react-widgets/dist/css/react-widgets.css'

class FilterSidebar extends Component {
	render() {
		const { ads } = this.props
		// Get the different attributes of every Ad
		const brands = [...new Set(ads.map(i => i.brand))].sort()
		const countries = [...new Set(ads.map(i => i.country))].sort()
		const industries = [...new Set(ads.map(i => i.industry))].sort()
		const channels = [...new Set(ads.map(i => i.channel))].sort()
		const productionStates = [
			...new Set(ads.map(i => i.productionState))
		].sort()
		const states = [...new Set(ads.map(i => i.state))].sort()

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
					<AppContext.Consumer>
						{context => (
							<Fragment>
								<SearchBar
									ads={ads}
									filter={context.filterAds}
									keyName={'shortname'}
								/>

								<CreateCalendar
									ads={ads}
									filter={context.filterAds}
									keyName={'campaigndate'}
								/>

								<CreateMultiselect
									dataDropdown={brands}
									filter={context.filterAds}
									keyName={'brand'}
								/>

								<CreateMultiselect
									dataDropdown={industries}
									filter={context.filterAds}
									keyName={'industry'}
								/>

								<CreateMultiselect
									dataDropdown={channels}
									filter={context.filterAds}
									keyName={'channel'}
								/>

								<CreateMultiselect
									dataDropdown={countries}
									filter={context.filterAds}
									keyName={'country'}
								/>

								<RangeSlider
									ads={ads}
									filter={context.filterAds}
									keyName={'lengthAd'}
								/>

								<CreateMultiselect
									dataDropdown={productionStates}
									filter={context.filterAds}
									keyName={'productionState'}
								/>

								<CreateMultiselect
									dataDropdown={states}
									filter={context.filterAds}
									keyName={'state'}
								/>
							</Fragment>
						)}
					</AppContext.Consumer>
				</div>
			</div>
		)
	}
}

export default FilterSidebar
