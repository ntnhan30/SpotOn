import React, { Component } from 'react'
import { GetFeaturedAds } from '../../components'

const getFeaturedAds = new GetFeaturedAds()

class FeaturedScreen extends Component {
	static defaultProps = {
		getFeaturedAds
	}
	render() {
		const { ads, getFeaturedAds } = this.props

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
