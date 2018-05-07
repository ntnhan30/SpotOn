import React, {Component} from 'react'
import {
	WeightedReport,
	PercentileReport,
	LoadingSpinner,
	AppContext,
	ErrorBoundary
} from '../../components'
var _ = require('lodash')

class SingleReport extends Component {
	render() {
		const {detailsOfSelectedAds, typeOfReport} = this.props

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
