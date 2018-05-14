/***** ============================
 *
 * This Class takes an array with all the results from an AD and tabulates the, and
 * analyses it to give the score for each KPI of Weighted Top Box.
 *
 ============================ ******/
var _ = require('lodash')

class GetFeaturedAds {
	bestFiveByKPI = (key, sort, ads) => {
		let customSorter = i => {
			return i.kpis[key]
		}

		// clean the 'ads' -- remove the ones without kpis
		ads = _.filter(ads, v => !_.isEmpty(v.kpis))
		// Sort in Descending order
		ads = _.orderBy(ads, customSorter, [sort])
		// Get only the first 5
		ads = ads.slice(0, 5)

		return ads
	}

	bestFiveByIndustry = (industry, sort, ads) => {
		let customSorter = i => {
			return i.kpis.total
		}

		// clean the 'ads' -- remove the ones without kpis and from other industries
		ads = _.filter(ads, v => !_.isEmpty(v.kpis) && v.industry === industry)

		// Sort in Descending order
		ads = _.orderBy(ads, customSorter, [sort])
		// Get only the first 5
		ads = ads.slice(0, 5)

		return ads
	}
}

export default GetFeaturedAds
