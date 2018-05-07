import React, {Component} from 'react'
import AppContext from './context'
import {Auth, Api, FilterAds, FunctionsResults} from '../../components'
import {history} from '../../components/auth'

var _ = require('lodash')

class AppProvider extends Component {
	state = {
		init: async () => {
			this.init()
		},

		// Object with all the profile details
		profile: {},

		finishTour: async () => {
			this.finishTour()
		},

		lastStepOfTour: false,

		activateLastStepOfTour: () => {
			this.activateLastStepOfTour()
		},

		// Array of objects of all the ads loaded from the server
		ads: [],
		// Array of Object of ads selected by the user
		selectedAds: {},
		// Object of the selected ads with all the details (kpis, percentile, results)
		detailsOfSelectedAds: {},
		// This function toggles the [selected]
		toggleSelection: (ad, isSelected) => {
			this.toggleSelection(ad, isSelected)
		},

		// This acepts this.props.match
		getAdsFromURL: async propsMatch => {
			await this.getAdsFromURL(propsMatch)
		},

		countryNorms: {},

		addCountryNorm: async () => {
			await this.addCountryNorm()
		},

		// Object of the filters applied in the search
		filterAtts: {},
		// This functions filters the ad list [show] = true
		filterAds: async (valueToFilter, key) => {
			await this.filterAds(valueToFilter, key)
		},

		isInsideReport: false
	}

	async finishTour() {
		const api = new Api()
		// -- Toggle Profile on the Server
		const profile = await api.toggleUserFirstTime(this.state.profile.email)

		this.setState({profile})
	}

	activateLastStepOfTour() {
		this.setState({lastStepOfTour: true})
	}

	// This acepts this.props.match
	async getAdsFromURL() {
		const location = history.location.pathname
		// Only runs if inside a report
		if (
			_.includes(location, 'weightedReport') ||
			_.includes(location, 'percentileReport') ||
			_.includes(location, 'chart')
		) {
			// List of all selected Ads
			let {selectedAds} = this.state
			// Aray of the names of the ads
			let adsOnURL = []

			if (_.isEmpty(selectedAds)) {
				// If there is no selected Ads on the Provider get it from the URL
				adsOnURL = _.last(location.split('/'))
				//propsMatch.params.id
				adsOnURL = adsOnURL.split('&')
				//console.log('no provider selected')
				//console.log(ads)
			} else {
				// If its on provider get the names from there
				adsOnURL = _.map(selectedAds, 'adname')
				//console.log('yes in provider')
				//console.log(ads)
			}

			for (let i in adsOnURL) {
				this.toggleSelection(adsOnURL[i], true)
			}
		}
	}

	/**
	 * This ASYNC function toggles the selection of the ad --
	 * - It adds or delete the spot on "selectedAds"
	 * - It toggles ['selected'] on "ads"
	 * Update state => ads, selectedAds
	 *
	 * @param {String} adName                 String of the Shortname of the ad
	 * @param {Boolean} isSelected            New state of selection
	 */

	async toggleSelection(adName, isSelected) {
		let {ads, selectedAds} = this.state

		let thisAd = _.find(ads, o => o.adname === adName)
		thisAd.selected = isSelected

		_.map(ads, function(obj) {
			return _.assign(obj, _.find([thisAd], {adname: obj.adname}))
		})

		// If isSelected is TRUE add it to the selectedAds
		// Otherwise remove it from the collection
		if (isSelected) {
			selectedAds[adName] = thisAd
		} else {
			selectedAds = _.omit(selectedAds, adName)
		}

		this.setState({ads, selectedAds})

		// If there are selected ads, get the details
		// Otherwise go back to the report page
		if (_.size(selectedAds) > 0) {
			await this.getDetailsOfSelectedAds(adName, isSelected)
		} else {
			history.push('/')
		}
	}

	/**
	 * This ASYNC function gets the details of the selected ad --
	 * Update state => detailsOfSelectedAds
	 * Fires the country norm retrieval
	 *
	 * @param {String} adName                 String of the Shortname of the ad
	 * @param {Boolean} isSelected            New state of selection
	 */
	async getDetailsOfSelectedAds(adName, isSelected) {
		let {detailsOfSelectedAds} = this.state
		const api = new Api()

		if (isSelected) {
			if (detailsOfSelectedAds[adName] === undefined) {
				const thisAd = await api.fetchSingleAd(adName)
				detailsOfSelectedAds[adName] = thisAd
				this.addCountryNorm(thisAd.ad.country)
			}
		} else {
			detailsOfSelectedAds = _.omit(detailsOfSelectedAds, [adName])
		}

		// Save them into the state
		this.setState({
			detailsOfSelectedAds
		})
	}

	async addCountryNorm(countryName) {
		const functionsResults = new FunctionsResults()
		const {selectedAds, countryNorms} = this.state

		// Get an Array of the countries selected
		let countries = []
		_.forEach(selectedAds, s => {
			countries.push(s.country)
		})
		countries = _.uniq(countries)

		// Get the country norm of the new countries
		await Promise.all(
			countries.map(async country => {
				if (countryNorms[country] === undefined) {
					countryNorms[
						country
					] = await functionsResults.getCountryNorm([country])
				}
			})
		)
		this.setState({
			countryNorms
		})
	}

	async filterAds(valueToFilter, key) {
		const filterAds = new FilterAds()
		let result = await filterAds.init(
			this.state.ads,
			this.state.filterAtts,
			valueToFilter,
			key
		)
		this.setState({
			filterAtts: result.filterAtts,
			ads: result.ads
		})
	}

	checkIfInsideReport() {
		const location = history.location.pathname
		const {isInsideReport} = this.state
		// Only runs if inside a report
		if (
			_.includes(location, 'weightedReport') ||
			_.includes(location, 'percentileReport') ||
			_.includes(location, 'chart')
		) {
			if (!isInsideReport) {
				this.setState({
					isInsideReport: true
				})
			}
		} else {
			if (isInsideReport) {
				this.setState({
					isInsideReport: false
				})
			}
		}
	}

	async componentDidMount() {
		this.init()
	}

	async init() {
		// -- init Auth() & Api()
		const auth = new Auth()
		const api = new Api()

		// -- Get Profile from server
		const profile = await auth.getUserInfo()
		// -- Get All ads from server and add 'show' attr
		let ads = await api.fetchAds(profile)
		ads = _.map(ads, o => _.extend({show: true}, o))
		this.setState({profile, ads})

		// Check if there are ads in the URL
		await this.getAdsFromURL()

		// List to the changes in the URL to see if inside any report
		this.checkIfInsideReport()
		history.listen((location, action) => {
			this.checkIfInsideReport()
		})
	}

	render() {
		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		)
	}
}

export default AppProvider
