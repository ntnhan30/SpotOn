import { Api, TabulateAnswers } from '../../components'
var _ = require('lodash')

/**
 * This Class handles the breakout of the results.
 * It filter the results based on the demographic selected values and
 * runs the TabulateAnswers Class to calculate again the KPIs
 *
 * @param {Int} num              Key of the color
 * @returns {String}             The color in HEX to use
 */
class FilterResults {
	constructor() {
		this.ads = []
		this.selectedAds = {}

		this.filters = {}

		this.api = new Api()
		this.tabulateAnswers = new TabulateAnswers()

		this.results = []
	} // valueToFilter - is an array of the selected values // key is a string with the name of the attr // copy the state

	/**
	 * Entry Point
	 *
	 * @param {Array} ads             	Array of Objects wth Ads
	 * @param {Object} selectedAds      Object with details of selected Ads
	 * @param {String} value      		Value to filter
	 * @param {String} key      		Property to filter
	 *
	 * @returns {String}             The color in HEX to use
	 */ async init(ads, selectedAds, value, key) {
		this.filters[key] = value
		this.filters = _.omitBy(this.filters, _.isEmpty)

		this.ads = ads
		this.selectedAds = selectedAds

		let arrayNamesSelectedAds = _.keys(selectedAds)
		this.results = await this.api.fetchResultsFromVariousAds(
			arrayNamesSelectedAds
		)

		const isGender = gender => {
			if (!_.isEmpty(gender)) {
				let resultsEachLoop = []
				let resultsAggregated = []

				_.forEach(gender, v => {
					switch (v) {
						case 'Male':
							resultsEachLoop = _.map(this.results, o => {
								if (o.S2 === 1) return o
							})
							break
						case 'Female':
							resultsEachLoop = _.map(this.results, o => {
								if (o.S2 === 2) return o
							})
							break
						default:
							break

					}
					resultsAggregated = _.concat(
						resultsAggregated,
						resultsEachLoop
					)
				})
				this.results = _.without(resultsAggregated, undefined)
			}
		}

		const onlyHeavyUsers = v => {
			const checkHeavyUser = o => {
				if (o.S4a && o.S4a <= 4) {
					return o
				} else if (o.S4b && o.S4b <= 2) {
					return o
				}
			}

			this.results = _.map(this.results, checkHeavyUser)
			this.results = _.without(this.results, undefined)
		}

		/*
		const isMaritalStatus = values => {
			if (!_.isEmpty(values)) {
				let resultsEachLoop = []
				let resultsAggregated = []

				_.forEach(values, v => {
					switch (v) {
						case 'Single':
							resultsEachLoop = _.map(this.results, o => {
								if (o.S5 === 1) return o
							})
							resultsEachLoop = _.without(
								resultsEachLoop,
								undefined
							)
							break
						case 'Married without children':
							resultsEachLoop = _.map(this.results, o => {
								if (o.S5 === 2) return o
							})
							resultsEachLoop = _.without(
								resultsEachLoop,
								undefined
							)
							break
						case 'Married with children':
							resultsEachLoop = _.map(this.results, o => {
								if (o.S5 === 3) return o
							})
							resultsEachLoop = _.without(
								resultsEachLoop,
								undefined
							)
							break
						default:
							break
					}
					resultsAggregated = _.concat(
						resultsAggregated,
						resultsEachLoop
					)
				})
				this.results = resultsAggregated
			}
		}
		*/

		const isInAgeBracket = values => {
			if (!_.isEmpty(values)) {
				let resultsEachLoop = []
				let resultsAggregated = []

				_.forEach(values, v => {
					switch (v) {
						case '18 - 24':
							resultsEachLoop = _.map(this.results, o => {
								if (o.S1_Dummy <= 24) return o
							})
							break
						case '25 - 35':
							resultsEachLoop = _.map(this.results, o => {
								if (o.S1_Dummy >= 25 && o.S1_Dummy <= 35)
									return o
							})
							break
						default:
							break
					}
					resultsAggregated = _.concat(
						resultsAggregated,
						resultsEachLoop
					)
				})
				this.results = _.without(resultsAggregated, undefined)
			}
		}

		_.forEach(this.filters, (value, filterKey) => {
			switch (filterKey) {
				case 'Gender':
					isGender(value)
					break
				case 'Heavy Users':
					onlyHeavyUsers(value)
					break
				case 'Marital Status':
					//isMaritalStatus(value)
					break
				case 'Age':
					isInAgeBracket(value)
					break
				default:
					break
			}
		})
		console.log(this.filters)
		console.log(this.results)


		let tabulated = await this.tabulateAnswers.init(this.results)
		return tabulated
	}
}

export default FilterResults
