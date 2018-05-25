import React, { Component } from 'react'
import { GetFeaturedAds } from '../../components'

class FeaturedScreen extends Component {
	constructor() {
		super()

		this.getFeaturedAds = new GetFeaturedAds()
	}

	render() {
		const { ads } = this.props
		const { getFeaturedAds } = this

		console.log(getFeaturedAds.bestFiveByKPI('total', 'desc', ads))
		console.log(getFeaturedAds.bestFiveByKPI('brandRelevance', 'desc', ads))
		console.log(
			getFeaturedAds.bestFiveByKPI('viewerEngagement', 'desc', ads)
		)
		console.log(getFeaturedAds.bestFiveByKPI('adMessage', 'desc', ads))

		console.log(
			getFeaturedAds.bestFiveByIndustry('Food delivery', 'desc', ads)
		)

		return <div className="import-main">Featured Ads</div>
	}
}

export default FeaturedScreen
