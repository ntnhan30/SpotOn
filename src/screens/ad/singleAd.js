import React, { Component, Fragment } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {
	Api,
	ObjectBarChart,
	HorizontalChart,
	GetKPIs,
	LoadingSpinner,
	CircleProgress,
	SingleValueCell,
	MessagingCode,
	FunctionsResults,
	ImageOfAd,
	SingleViewTour,
	AppContext,
	VideoLightbox,
	AdCPA
} from '../../components'
var _ = require('lodash')

class SingleAd extends Component {
	constructor() {
		super()
		this.state = {
			thisAd: null,
			countryNorm: null,
			adStillExist: true
		}

		this.api = new Api()
		this.getKPIs = new GetKPIs()
		this.messagingCode = new MessagingCode()
		this.functionsResults = new FunctionsResults()
		this.imageOfAd = new ImageOfAd()
	}

	componentDidMount = async () => {
		// Get the adname of this Ad
		const adname = this.props.match.params.id

		// Retrieve the ad details from the server
		const { ads } = this.props
		let thisAd = {}
		if (ads.length > 0) {
			thisAd = this.props.ads.filter(function(ad) {
				return ad.adname === adname
			})
			thisAd = thisAd[0]
		} else {
			thisAd = await this.api.fetchSingleAd(adname)
		}

		const countryNorm = await this.functionsResults.getCountryNorm([
			thisAd.country
		])

		// Save them into the state
		this.setState({
			thisAd,
			countryNorm
		})
	}

	deleteSingleAd = async () => {
		// Retrieve the ad details from the server
		const didItDelete = await this.api.deleteAd(this.state.thisAd.adname)

		this.setState({
			adStillExist: !didItDelete
		})
	}

	reimportAd = () => {
		//console.log(this.props.api);
	}

	downloadAd = () => {
		//console.log(this.props.api);
	}

	render() {
		const thisAd = this.state.thisAd
		const countryNorm = this.state.countryNorm

		const brandRelevance = ['Brand Recall', 'Relevance', 'Brand Fit']
		const viewerEngagement = ['Ad Appeal', 'Shareability', 'Call to action']
		const adMessage = [
			'Messaging',
			'Tone of voice',
			'Emotion',
			'Uniqueness'
		]

		if (!this.state.adStillExist) {
			return (
				<div className="container-fluid">
					<div className="col-md-8 offset-md-2">
						<h1>POST SUCCESFULLY DELETED</h1>
					</div>
				</div>
			)
		} else if (!_.isEmpty(thisAd)) {
			const AdImage = this.imageOfAd.getRandomImage(thisAd.industry)

			const heroStyle = {
				backgroundImage: `url(${AdImage})`
			}

			const showTour = () => {
				if (this.props.profile.firstTime) {
					return (
						<AppContext.Consumer>
							{context => (
								<SingleViewTour
									activateLastStepOfTour={
										context.activateLastStepOfTour
									}
									finishTour={context.finishTour}
								/>
							)}
						</AppContext.Consumer>
					)
				} else {
					return null
				}
			}

			return (
				<Fragment>
					{showTour()}
					<div
						className="container-fluid hero-image"
						style={heroStyle}>
						<div className="col-5 offset-2">
							<h1>{thisAd.adname}</h1>
							<article className="ad-messages">
								<p>
									<b>
										{this.messagingCode.init(
											thisAd.mainMessage
										)}
									</b>
								</p>
								<p>
									{this.messagingCode.init(
										thisAd.secondaryMessage
									)}
								</p>
								<p>
									{this.messagingCode.init(
										thisAd.tertiaryMessage
									)}
								</p>
							</article>
						</div>
					</div>

					<div className="container-fluid single">
						<div className="col-6 offset-2 details">
							<Tabs>
								<TabList className="row">
									<Tab className="col-md-3 col-sm-6">
										<SingleValueCell
											value={Math.round(
												thisAd.kpis.total
											)}
											size={'big'}
											name={'SpotOn score'}
											countryNorm={countryNorm.total}
										/>
									</Tab>
									<Tab className="col-md-3 col-sm-6">
										<SingleValueCell
											value={Math.round(
												thisAd.kpis.brandRelevance
											)}
											size={'medium'}
											name={'Brand Relevance'}
											countryNorm={
												countryNorm.brandRelevance
											}
										/>
									</Tab>
									<Tab className="col-md-3 col-sm-6">
										<SingleValueCell
											value={Math.round(
												thisAd.kpis.viewerEngagement
											)}
											size={'medium'}
											name={'Viewer Engagement'}
											countryNorm={
												countryNorm.viewerEngagement
											}
										/>
									</Tab>
									<Tab className="col-md-3 col-sm-6">
										<SingleValueCell
											value={Math.round(
												thisAd.kpis.adMessage
											)}
											size={'medium'}
											name={'Ad Message'}
											countryNorm={countryNorm.adMessage}
										/>
									</Tab>
								</TabList>
								<TabPanel />
								<TabPanel>
									<HorizontalChart
										selectedAds={[thisAd]}
										kpis={this.getKPIs.init(brandRelevance)}
									/>
								</TabPanel>
								<TabPanel>
									<HorizontalChart
										selectedAds={[thisAd]}
										kpis={this.getKPIs.init(
											viewerEngagement
										)}
									/>
								</TabPanel>
								<TabPanel>
									<HorizontalChart
										selectedAds={[thisAd]}
										kpis={this.getKPIs.init(adMessage)}
									/>
									<h2>Emotion breakout</h2>
									<ObjectBarChart
										selectedAds={thisAd.emotion}
										kpis={'Emotion'}
									/>
									<br />
									<h2>Tone of voice breakout</h2>
									<ObjectBarChart
										selectedAds={thisAd.toneOfVoice}
										kpis={'Tone of Voice'}
									/>
								</TabPanel>
							</Tabs>
						</div>

						<div className="col-3 move-up">
							<VideoLightbox
								url={thisAd.videourl}
								image={AdImage}
							/>

							<table className="">
								<tbody>
									<tr>
										<td>Title</td>
										<td>{thisAd.shortname}</td>
									</tr>
									<tr>
										<td>Brand</td>
										<td>{thisAd.brand}</td>
									</tr>
									<tr>
										<td>Industry</td>
										<td>{thisAd.industry}</td>
									</tr>
									<tr>
										<td>Length</td>
										<td>{thisAd.lengthAd}"</td>
									</tr>
									<tr>
										<td>Channel</td>
										<td>{thisAd.channel}</td>
									</tr>
									<tr>
										<td>State</td>
										<td>{thisAd.productionState}</td>
									</tr>
								</tbody>
							</table>

							<AdCPA thisAd={thisAd} />
						</div>
					</div>

					<div className="container-fluid single summary">
						<div className="col-9 offset-2">
							<p>{thisAd.summary}</p>
						</div>
					</div>
				</Fragment>
			)
		} else {
			return <LoadingSpinner />
		}
	}
}

export default SingleAd
