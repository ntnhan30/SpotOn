import React, { Component } from 'react'
import AppContext from './context'
import {
	Auth,
	Api,
	FilterAds,
	FunctionsResults,
	history
} from '../../components'

var _ = require('lodash')

class AppProvider extends Component {
	constructor() {
		super()
		this.state = {
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
			// This function toggles the [selected]
			toggleSelection: (ad, isSelected) => {
				this.toggleSelection(ad, isSelected)
			},
			//
			updateFavourites: (adname, isFavorite) => {
				this.updateFavourites(adname, isFavorite)
			},

			// This acepts this.props.match
			getAdsFromURL: async propsMatch => {
				await this.getAdsFromURL(propsMatch)
			},

			sorting: {
				key: '',
				order: 'desc'
			},

			sortAds: key => {
				this.sortAds(key)
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

			breakoutSelectedAds: newSelectedAds => {
				this.breakoutSelectedAds(newSelectedAds)
			},

			isInsideReport: false
		}

		this.api = new Api()
	}

	async finishTour() {
		// -- Toggle Profile on the Server
		const profile = await this.api.toggleUserFirstTime(
			this.state.profile.email
		)

		this.setState({ profile })
	}

	activateLastStepOfTour() {
		this.setState({ lastStepOfTour: true })
	}

	async getAdsFromURL() {
		const location = history.location.pathname
		// Only runs if inside a report
		if (
			_.includes(location, 'weightedReport') ||
			_.includes(location, 'percentileReport') ||
			_.includes(location, 'chart')
		) {
			// List of all selected Ads
			let { selectedAds } = this.state
			// Aray of the names of the ads
			let adsOnURL = []

			if (_.isEmpty(selectedAds)) {
				// If there is no selected Ads on the Provider get it from the URL
				adsOnURL = _.last(location.split('/'))
				adsOnURL = adsOnURL.split('&')
			} else {
				// If its on provider get the names from there
				adsOnURL = _.map(selectedAds, 'adname')
			}

			for (let i in adsOnURL) {
				this.toggleSelection(adsOnURL[i], true)
			}
		}
	}

	/**
	 * Sorts the array of Ads by the key
	 * - It depends on the 'sorting' state
	 * - If the sorting is already applied on a column toggle the order
	 * - If is a new key order, start as ASC
	 * Update state => ads, sorting
	 *
	 * @param {String} key                   String of the key to sort on the ad list
	 */
	sortAds(key) {
		let { ads, sorting } = this.state

		if (key === sorting.key) {
			sorting.order = sorting.order === 'desc' ? 'asc' : 'desc'
		} else {
			sorting.key = key
			sorting.order = 'asc'
		}
		// Use Lodash to sort array by the key
		ads = _.orderBy(ads, [key], [sorting.order])

		this.setState({
			ads,
			sorting
		})
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
		let { ads, selectedAds } = this.state

		let thisAd = _.find(ads, o => o.adname === adName)
		thisAd.selected = isSelected

		_.map(ads, function(obj) {
			return _.assign(obj, _.find([thisAd], { adname: obj.adname }))
		})

		// If isSelected is TRUE add it to the selectedAds
		// Otherwise remove it from the collection
		if (isSelected) {
			selectedAds[adName] = thisAd

			this.addCountryNorm(selectedAds[adName].country)
		} else {
			selectedAds = _.omit(selectedAds, adName)
		}

		this.setState({ ads, selectedAds })

		// If there are selected ads, get the details
		// Otherwise go back to the report page
		if (!(_.size(selectedAds) > 0)) {
			history.push('/')
		}
	}

	/**
	 * This ASYNC function toggles the favorite value of a single ad
	 * and saves it into the server --
	 * - Toggles the ad from the 'profile.favourites' state
	 * - Update the profile on the server
	 * - Update the ad on the 'ads' state
	 * Update state => ads, selectedAds
	 *
	 * @param {String} adName                 String of the Shortname of the ad
	 * @param {Boolean} isSelected            New state of selection
	 */
	async updateFavourites(adname, isFavorite) {
		let { ads, profile } = this.state

		// Toggles the ad from the 'profile.favourites' state
		if (isFavorite) {
			profile.favourites.push(adname)
			profile.favourites = _.uniq(profile.favourites)
		} else {
			profile.favourites = _.remove(profile.favourites, n => {
				return n !== adname
			})
		}
		// Update the profile on the server
		this.api.updateUserFavorites(profile.email, profile.favourites)

		// Update the ad on the ad state
		let thisAd = _.find(ads, o => o.adname === adname)
		if (isFavorite) {
			thisAd.favourite = true
		} else {
			thisAd.favourite = false
		}
		_.map(ads, function(obj) {
			return _.assign(obj, _.find([thisAd], { adname: obj.adname }))
		})

		// Update state => ads, selectedAds
		this.setState({
			profile,
			ads
		})
	}

	async addCountryNorm(countryName) {
		const functionsResults = new FunctionsResults()
		const { selectedAds, countryNorms } = this.state

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

	breakoutSelectedAds(newSelectedAds) {
		let { selectedAds } = this.state
		_.forEach(newSelectedAds, newKPI => {
			let adName = newKPI['adname']
			selectedAds[adName].kpis = newKPI
		})

		this.setState({
			selectedAds
		})
	}

	checkIfInsideReport() {
		const location = history.location.pathname
		const { isInsideReport } = this.state
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

		// -- Get Profile from server
		const profile = await auth.getUserInfo()

		// -- Get All ads from server
		let ads = await this.api.fetchAds(profile)
		// add 'show' & 'favourite' attr
		ads = _.map(ads, o => _.extend({ show: true, favourite: false }, o))
		// Reverse the Array - show the newest sposts first
		ads = _.reverse(ads)

		// Adds the favorites to the collection of ads
		if (ads.length > 0) {
			profile.favourites.forEach(function(adName) {
				let thisAd = _.find(ads, o => o.adname === adName)
				thisAd.favourite = true
				_.map(ads, function(obj) {
					return _.assign(
						obj,
						_.find([thisAd], { adname: obj.adname })
					)
				})
			})
		}

		this.setState({ profile, ads })

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
