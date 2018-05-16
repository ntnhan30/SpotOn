import { Api, TabulateAnswers } from '../../components'
var _ = require('lodash')

class FilterResults {
	constructor() {
		this.ads = []
		this.selectedAds = {}

		this.filters = {}

		this.api = new Api()
		this.tabulateAnswers = new TabulateAnswers()

		this.results = []
	}

	// valueToFilter - is an array of the selected values
	// key is a string with the name of the attr

	// copy the state
	async init(ads, selectedAds, value, key) {
		this.filters[key] = value

		this.ads = ads
		this.selectedAds = selectedAds

		let arrayNamesSelectedAds = _.keys(selectedAds)
		this.results = await this.api.fetchResultsFromVariousAds(
			arrayNamesSelectedAds
		)
		//console.log(this.results)

		const isGender = gender => {
			switch (gender[0]) {
				case 'Male':
					this.results = _.map(this.results, o => {
						if (o.S2 === 1) return o
					})
					break
				case 'Female':
					this.results = _.map(this.results, o => {
						if (o.S2 === 2) return o
					})
					break
				case 'All':
					this.results = this.results
					break
				default:
					break
			}
			this.results = _.without(this.results, undefined)
		}

		const onlyHeavyUsers = v => {
			const checkHeavyUser = o => {
				if (o.S4a && o.S4a <= 4) {
					return o
				} else if (o.S4b <= 2) {
					return o
				}
			}

			if (v) {
				this.results = _.map(this.results, checkHeavyUser)
			}
			this.results = _.without(this.results, undefined)
		}

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
						case '25 - 34':
							resultsEachLoop = _.map(this.results, o => {
								if (o.S1_Dummy >= 25 && o.S1_Dummy <= 34)
									return o
							})
							break
						case '35 - 44':
							resultsEachLoop = _.map(this.results, o => {
								if (o.S1_Dummy >= 35 && o.S1_Dummy <= 44)
									return o
							})
							break
						case '45 - 54':
							resultsEachLoop = _.map(this.results, o => {
								if (o.S1_Dummy >= 45 && o.S1_Dummy <= 54)
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

		//console.log(this.filters)
		_.forEach(this.filters, (value, filterKey) => {
			switch (filterKey) {
				case 'Gender':
					isGender(value)
					break
				case 'Heavy Users':
					onlyHeavyUsers(value)
					break
				case 'Marital Status':
					isMaritalStatus(value)
					break
				case 'Age':
					isInAgeBracket(value)
					break
				default:
					break
			}
		})

		//console.log(this.results)
		let tabulated = await this.tabulateAnswers.init(this.results)
		//console.log(tabulated)

		return tabulated
	}
}

export default FilterResults
