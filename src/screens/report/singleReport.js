import React, { Component } from 'react'
import {
	WeightedReport,
	PercentileReport,
	LoadingSpinner,
	AppContext,
	ErrorBoundary
} from '../../components'
var _ = require('lodash')

class SingleReport extends Component {
	componentDidMount = async () => {
		//this.props.getAdsFromURL(this.props.match)
	}
	/*

	componentDidUpdate = (prevProps, prevState, snapshot) => {
		let { selectedAds } = this.props
		let oldSelectedAds = prevProps.selectedAds

		if (selectedAds !== oldSelectedAds) {
			// If the props are different
			this.props.getAdsFromURL(this.props.match)
		}
	}
	*/

	render() {
		const { detailsOfSelectedAds, typeOfReport } = this.props

		//this.getAdsFromURL()
		if (!_.isEmpty(detailsOfSelectedAds)) {
			if (typeOfReport === 'weighted') {
				return (
					<AppContext.Consumer>
						{context => (
							<ErrorBoundary>
								<WeightedReport
									allResults={detailsOfSelectedAds}
									profile={context.profile}
									countryNorms={context.countryNorms}
									addCountryNorm={context.addCountryNorm}
								/>
							</ErrorBoundary>
						)}
					</AppContext.Consumer>
				)
			} else if (typeOfReport === 'percentile') {
				return (
					<AppContext.Consumer>
						{context => (
							<ErrorBoundary>
								<PercentileReport
									allResults={detailsOfSelectedAds}
									profile={context.profile}
									countryNorms={context.countryNorms}
									addCountryNorm={context.addCountryNorm}
								/>
							</ErrorBoundary>
						)}
					</AppContext.Consumer>
				)
			}
		} else {
			return <LoadingSpinner />
		}
	}
}

export default SingleReport
