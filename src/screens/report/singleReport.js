import React, { Component } from 'react'
import {
	Api,
	WeightedReport,
	PercentileReport,
	LoadingSpinner,
	AppContext,
	ErrorBoundary
} from '../../components'

const api = new Api()

class SingleReport extends Component {
	constructor() {
		super()
		this.state = {
			thisResults: [],
			isLoaded: false
		}
	}

	static defaultProps = {
		api
	}

	getAdsFromURL = async () => {
		// Get the adname of this Ad
		let allResults = {}

		let ads = this.props.match.params.id
		ads = ads.split('&')

		for (let single in ads) {
			if (ads[single]) {
				const thisAd = await this.props.api.fetchSingleAd(ads[single])
				allResults[ads[single]] = thisAd
				this.props.handleSelection(thisAd.ad, true)
			}
		}
		// Save them into the state
		this.setState({
			thisResults: allResults,
			isLoaded: true
		})
	}

	componentDidMount = async () => {
		this.getAdsFromURL()
	}

	UNSAFE_componentWillReceiveProps = async nextProps => {
		const currentID = this.props.match.params.id
		const nextID = nextProps.match.params.id

		if (currentID !== nextID) {
			this.getAdsFromURL()
		}
	}

	render() {
		if (this.state.isLoaded) {
			if (this.props.typeOfReport === 'weighted') {
				return (
					<AppContext.Consumer>
						{context => (
							<ErrorBoundary>
								<WeightedReport
									allResults={this.state.thisResults}
									profile={context.profile}
								/>
							</ErrorBoundary>
						)}
					</AppContext.Consumer>
				)
			} else if (this.props.typeOfReport === 'percentile') {
				return (
					<AppContext.Consumer>
						{context => (
							<ErrorBoundary>
								<PercentileReport
									allResults={this.state.thisResults}
									profile={context.profile}
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
