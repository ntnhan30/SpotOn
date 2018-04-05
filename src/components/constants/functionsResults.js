/***** ============================
 *
 * This Class takes an array with all the results from an AD and tabulates the, and
 * analyses it to give the score for each KPI of Weighted Top Box.
 *
 ============================ ******/
import Api from './api'
var _ = require('lodash')

class FunctionsResults {
	constructor() {
		this.api = new Api()
	}

	getCountryNorm = async country => {
		// create empty object
		const allKPIs = await this.api.fetchCountryKPIs(country)
		let averageKPIs = {}

		// Get the average of every key and assign to avergaeKPIs
		for (let key in allKPIs['0']) {
			let byKey = _.mapValues(allKPIs, function(o) {
				return o[key]
			})
			byKey = _.mean(_.values(byKey))
			averageKPIs[key] = byKey
		}

		return averageKPIs
	}

	getGlobalRange = KPIs => {
		let result = {}

		let maxPercentile = KPIs[0]
		let minPercentile = KPIs[1]

		// for each kpi
		for (let single in KPIs) {
			// For each value inside KPI
			for (let key in KPIs[single]) {
				// Get maximum
				maxPercentile[key] =
					KPIs[single][key] > maxPercentile[key]
						? KPIs[single][key]
						: maxPercentile[key]
				// Get minimum
				minPercentile[key] =
					KPIs[single][key] < minPercentile[key]
						? KPIs[single][key]
						: minPercentile[key]
			}
		}

		result.maxPercentile = maxPercentile
		result.minPercentile = minPercentile
		return result
	}

	getAverageKPIsOfSelected = selectedAds => {
		// create empty object
		let allKPIs = []
		let averageKPIs = {}

		// Asign only the KPI objects into the allKPIs array
		_.mapValues(selectedAds, single => {
			allKPIs.push(single.kpis)
		})

		// Get the average of every key and assign to avergaeKPIs
		for (let key in allKPIs['0']) {
			let byKey = _.mapValues(allKPIs, o => {
				return o[key]
			})
			byKey = _.mean(_.values(byKey))
			averageKPIs[key] = byKey
		}

		return averageKPIs
	}

	getCountriesOfSelectedAds = selectedAds => {
		// Get list of selected countries
		let selectedCountries = []
		for (let i in selectedAds) {
			selectedCountries.push(selectedAds[i].ad.country)
		}
		selectedCountries = Array.from(new Set(selectedCountries))

		return selectedCountries
	}

	getPercentileScore = async selectedAds => {
		const self = this

		// Get list of selected countries
		let selectedCountries = this.getCountriesOfSelectedAds(selectedAds)

		// group the Results by country and Sort them
		const sortNumber = (a, b) => {
			return a - b
		}
		// KPIs by Country
		let countryKPIs = {}
		let sorted = {}
		let counted = []
		await Promise.all(
			selectedCountries.map(async c => {
				countryKPIs[c] = await self.api.fetchCountryKPIs([c])
				sorted[c] = {}
				for (let singleKPI in countryKPIs[c]['0']) {
					sorted[c][singleKPI] = _.map(
						countryKPIs[c],
						singleKPI
					).sort(sortNumber)
				}
				counted[c] = {}
				for (let s in sorted[c]) {
					var count = {}
					// eslint-disable-next-line
					sorted[c][s].forEach(function(i) {
						count[i] = (count[i] || 0) + 1
					})
					counted[c][s] = count
				}
			})
		)

		// For each ad selected
		for (let single in selectedAds) {
			// Generate an empty object for the percentile values
			selectedAds[single].percentile = {}
			// For KPI of the selected Ad
			for (let kpi in selectedAds[single].kpis) {
				if (kpi !== 'adID') {
					let value = selectedAds[single].kpis[kpi] // Get value
					let index = sorted[selectedAds[single].ad.country][
						kpi
					].indexOf(selectedAds[single].kpis[kpi]) // Get first position in the sorted array
					let duplicates =
						counted[selectedAds[single].ad.country][kpi][value] // Get the number of duplicates
					let position = index + duplicates / 2 // Get the final position in the sorted array
					let percentile =
						position /
						countryKPIs[selectedAds[single].ad.country].length *
						100 // Get the percentile value based on the position divided by the amount of Ads.
					// push the percentile values into the selectedAds
					selectedAds[single]['percentile'][kpi] = percentile
				} else {
					selectedAds[single]['percentile'][kpi] =
						selectedAds[single]['kpis'][kpi]
				}
			}
		}

		// Get the average percentile -----

		// create empty object
		let allPercentileValues = []
		let averagePercentiles = {}

		// Asign only the KPI objects into the allKPIs array
		_.mapValues(selectedAds, single => {
			allPercentileValues.push(single.percentile)
		})

		// Get the average of every key and assign to avergaeKPIs
		for (let key in allPercentileValues['0']) {
			let byKey = _.mapValues(allPercentileValues, function(o) {
				return o[key]
			})
			byKey = _.mean(_.values(byKey))
			averagePercentiles[key] = byKey
		}

		//return the selected Ads and Average Percentiles;
		let result = {}
		result.selectedAds = selectedAds
		result.average = averagePercentiles
		return result
	}
}

export default FunctionsResults
