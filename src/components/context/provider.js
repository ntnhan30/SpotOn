import React, { Component } from 'react'
import AppContext from './context'
import { Auth, Api, FilterAds } from '../../components'

var _ = require('lodash')

class AppProvider extends Component {
	state = {
		profile: {},
		ads: [],
		filterAtts: {},
		filterAds: async (valueToFilter, key) => {
			const filterAds = new FilterAds()
			let result = await filterAds.init(
				this.state.ads,
				this.state.filterAtts,
				valueToFilter,
				key
			)
			console.log(result)
			this.setState({
				filterAtts: result.filterAtts,
				ads: result.ads
			})
		},
		toggleSelection: (ad, isSelected) => {
			let currentlySelectedAds = this.state.ads
			ad['selected'] = isSelected
			_.map(currentlySelectedAds, function(obj) {
				return _.assign(obj, _.find([ad], { adname: obj.adname }))
			})

			this.setState({
				ads: currentlySelectedAds
			})
		}
	}

	async componentDidMount() {
		// -- init Auth() & Api()
		const auth = new Auth()
		const api = new Api()

		// -- Get Profile from server
		const profile = await auth.getUserInfo()
		// -- Get All ads from server and add 'show' attr
		let ads = await api.fetchAds(profile)
		ads = _.map(ads, o => _.extend({ show: true }, o))
		this.setState({ profile, ads })
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
