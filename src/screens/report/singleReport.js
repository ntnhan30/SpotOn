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
	render() {
		const { selectedAds, typeOfReport } = this.props

		if (!_.isEmpty(selectedAds)) {
			if (typeOfReport === 'weighted') {
				return (
					<AppContext.Consumer>
						{context => (
							<ErrorBoundary>
								<WeightedReport
									ads={context.ads}
									selectedAds={context.selectedAds}
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
									ads={context.ads}
									selectedAds={context.selectedAds}
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
