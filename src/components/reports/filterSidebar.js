import React, { Component, Fragment } from 'react'
import {
	SearchBar,
	CreateMultiselect,
	CreateCalendar,
	RangeSlider,
	CreateToggle,
	AppContext
} from '../../components'

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
		const favourites = [...new Set(ads.map(i => i.favourite))].sort()

		// Display the sidebar
		return (
			<div>
				<table className="table">
					<thead className="thead-dark">
						<tr>
							<th scope="col">
								<span className="icon-narrow" />
								FILTER
							</th>
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
									placeholder={'Brands'}
								/>

								<CreateMultiselect
									dataDropdown={industries}
									filter={context.filterAds}
									keyName={'industry'}
									placeholder={'Industries'}
								/>

								<CreateMultiselect
									dataDropdown={channels}
									filter={context.filterAds}
									keyName={'channel'}
									placeholder={'Channels'}
								/>

								<CreateMultiselect
									dataDropdown={countries}
									filter={context.filterAds}
									keyName={'country'}
									placeholder={'Countries'}
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
									placeholder={'Production States'}
								/>

								<CreateMultiselect
									dataDropdown={states}
									filter={context.filterAds}
									keyName={'state'}
									placeholder={'States'}
								/>
								<CreateToggle
									dataDropdown={favourites}
									filter={context.filterAds}
									keyName={'favourite'}
									placeholder={'Only Favourites?'}
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
