import axios from 'axios'

var _ = require('lodash')

axios.defaults.baseURL = 'http://localhost:4000/api' // LOCAL
//axios.defaults.baseURL = 'https://polar-beyond-85959.herokuapp.com/api' // Heroku

class Api {
	constructor() {
		this.getAllAds = '/spot'
		this.getAllCountryAds = '/spot/country/'
		this.getSingleAd = '/spot/'
		this.createAd = '/spot/new'
		this.removeAd = '/spot/remove'
		this.addExtraInfo = '/spot/addExtraInfo/'

		this.getResultsAd = '/results/'
		this.getResultsVarious = '/results/various'
		this.createResults = '/results/new'

		this.getAllKPIs = '/kpi'
		this.getAllCountryKPIs = '/kpi/country/'
		this.createKPIs = '/kpi/new'

		this.getAllUsers = '/user'
		this.getSingleUser = '/user/'
		this.createUser = '/user/new'
		this.notFirstTime = '/user/notFirstTime/'
		this.deleteUser = '/user/delete/'
		this.updateFavourites = '/user/favourites'
		this.updateSubscription = '/user/subscription/'

		this.getCPA = '/getCPA/'

		this.profile = {}
	}

	// Fetch all Ads from the server
	async fetchAds(profile) {
		if (profile.right === 'limited') {
			let result = []
			await Promise.all(
				profile.countries.map(async country => {
					console.log(country)
					const { data } = await axios.get(
						this.getAllCountryAds + country
					)
					result = result.concat(data.ads)
				})
			)
			return result
		} else {
			const { data } = await axios.get(this.getAllAds)
			return data.ads
		}
	}

	// Fetch a single Ad from the server using the "adname"
	async fetchSingleAd(adname) {
		const { data } = await axios.get(this.getSingleAd + adname)
		return data.ad
	}

	// Create multiple Ads from an array
	async createBulkAds(bulk) {
		await axios.post(this.createAd, { ads: bulk })
		return true
	}

	// Remove a single Ad from the server using the "adname"
	async deleteAd(adname) {
		const { data } = await axios.post(this.removeAd, {
			adname: adname
		})
		return !data.error
	}

	// Fetch Results from single Ad
	async fetchResultsFromAd(adname) {
		const { data } = await axios.get(this.getResultsAd + adname)
		return data.results
	}

	// Fetch Results from Various Ad
	async fetchResultsFromVariousAds(adnames) {
		const { data } = await axios.post(this.getResultsVarious, {
			adIDs: adnames
		})
		return data.results
	}

	// Create Tone Of Voice of the Ad
	async updateExtraInfo(arr) {
		for (let i in arr) {
			let single = arr[i]
			const adName = single.adName
			await axios.post(this.addExtraInfo + adName, {
				witty: single.toneOfVoice[1],
				cool: single.toneOfVoice[2],
				trustworthy: single.toneOfVoice[3],
				inspiring: single.toneOfVoice[4],
				friendly: single.toneOfVoice[5],
				youthful: single.toneOfVoice[6],
				funny: single.toneOfVoice[7],
				easyGoing: single.toneOfVoice[8],
				boring: single.toneOfVoice[9],
				generic: single.toneOfVoice[10],
				silly: single.toneOfVoice[11],
				formal: single.toneOfVoice[12],
				shocking: single.toneOfVoice[13],
				aggressive: single.toneOfVoice[14],
				childish: single.toneOfVoice[15],
				pretentious: single.toneOfVoice[16],

				excited: single.emotion[1],
				impressed: single.emotion[2],
				intrigued: single.emotion[3],
				entertained: single.emotion[4],
				informed: single.emotion[5],
				interested: single.emotion[6],
				indifferent: single.emotion[7],
				bored: single.emotion[8],
				confused: single.emotion[9],
				offended: single.emotion[10],
				annoyed: single.emotion[11],
				irritated: single.emotion[12],

				sampleSize: single.sampleSize
			})
		}
		return true
	}

	// Create multiple Results from an array
	async createBulkResults(bulk) {
		await axios.post(this.createResults, { results: bulk })
	}

	// Fetch all KPIs from the server
	async fetchKPIs() {
		const profile = this.profile
		if (profile.right === 'limited') {
			return await this.fetchCountryKPIs(profile.country)
		} else {
			const { data } = await axios.get(this.getAllKPIs)
			let kpis = _.map(data.KPIs, kpi => {
				return kpi.kpis
			})
			return kpis
		}
	}

	async fetchCountryKPIs(countries) {
		let result = []
		await Promise.all(
			countries.map(async country => {
				const { data } = await axios.get(
					this.getAllCountryKPIs + country
				)
				let kpis = _.map(data.KPIs, kpi => {
					return kpi.kpis
				})
				result = result.concat(kpis)
			})
		)
		return result
	}

	// Create multiple Ads from an array
	async createKPI(arryOfKpis) {
		let result = false
		await Promise.all(
			arryOfKpis.map(async kpis => {
				await axios.post(this.createKPIs, {
					adname: kpis.adname,
					brandRecall: kpis.brandRecall,
					adAppeal: kpis.adAppeal,
					toneOfVoice: kpis.toneOfVoice,
					emotion: kpis.emotion,
					uniqueness: kpis.uniqueness,
					relevance: kpis.relevance,
					shareability: kpis.shareability,
					callToAction: kpis.callToAction,
					messaging: kpis.messaging,
					brandFit: kpis.brandFit,
					brandRelevance: kpis.brandRelevance,
					viewerEngagement: kpis.viewerEngagement,
					adMessage: kpis.adMessage,
					total: kpis.total
				})
				result = true
			})
		)
		return result
	}

	// Fetch all Users from the server
	async fetchAllUsers() {
		const { data } = await axios.get(this.getAllUsers)
		return data.users
	}

	// Fetch a single User from the server using the "email"
	async fetchSingleUser(userEmail) {
		const { data } = await axios.get(this.getSingleUser + userEmail)
		this.profile = data.user
		return data.user
	}

	// Create Single User
	async addUser(email, countries, right) {
		await axios.post(this.createUser, {
			email: email,
			countries: countries,
			right: right
		})
		return true
	}

	async removeUser(userEmail) {
		const { data } = await axios.get(this.deleteUser + userEmail)
		return data
	}

	// Create Single User
	async updateUserFavorites(email, favourites) {
		const { data } = await axios.post(this.updateFavourites, {
			email: email,
			favourites: favourites
		})
		return data.user
	}

	// Create Single User
	async updateUserSubscriptions(userEmail, subscriptions) {
		const { data } = await axios.post(this.updateSubscription + userEmail, {
			industries: subscriptions.industries,
			countries: subscriptions.countries
		})
		return data
	}

	//
	async toggleUserFirstTime(userEmail) {
		const { data } = await axios.get(this.notFirstTime + userEmail)
		this.profile = data
		return data
	}

	// Fetch a single Ad from the server using the "adname"
	async fetchAdCPA(name) {
		const { data } = await axios.get(this.getCPA + name)
		return data
	}
}

export default Api
