import React, { Component, Fragment } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {
	Api,
	ObjectBarChart,
	HorizontalChart,
	GetKPIs,
	LoadingSpinner,
	CircleProgress,
	MessagingCode,
	FunctionsResults
} from '../../components'
import ThumbAd from '../../Assets/imgs/ad-thumb.jpg'
import HeroImageAd from '../../Assets/imgs/ad-heroimage.png'
var _ = require('lodash')

const api = new Api()
const getKPIs = new GetKPIs()
const messagingCode = new MessagingCode()
const functionsResults = new FunctionsResults()

class SingleAd extends Component {
	constructor() {
		super()
		this.state = {
			thisAd: null, // this is the list of filtered ads
			countryNorm: null,
			adStillExist: true
		}
	}

	static defaultProps = {
		api,
		getKPIs,
		messagingCode,
		functionsResults
	}

	componentDidMount = async () => {
		// Get the adname of this Ad
		const adname = this.props.match.params.id

		// Retrieve the ad details from the server
		const thisAd = await this.props.api.fetchSingleAd(adname)
		const countryNorm = await this.props.functionsResults.getCountryNorm([
			thisAd.ad.country
		])

		// Save them into the state
		this.setState({
			thisAd,
			countryNorm
			//thisKPIs: thisAd.kpis
		})
	}

	deleteSingleAd = async () => {
		// Retrieve the ad details from the server
		const didItDelete = await this.props.api.deleteAd(
			this.state.thisAd.ad.adname
		)

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
			var heroStyle = {
				backgroundImage: `url(${HeroImageAd})`
			}

			console.log(countryNorm)

			return (
				<Fragment>
					<div
						className="container-fluid hero-image"
						style={heroStyle}
					>
						<div className="col-5 offset-2">
							<h1>{thisAd.ad.adname}</h1>
							<p>
								<b>
									{this.props.messagingCode.init(
										thisAd.ad.mainMessage
									)}
								</b>
							</p>
							<p>
								{this.props.messagingCode.init(
									thisAd.ad.secondaryMessage
								)}
							</p>
							<p>
								{this.props.messagingCode.init(
									thisAd.ad.tertiaryMessage
								)}
							</p>
						</div>
					</div>

					<div className="container-fluid single">
						<div className="col-5 offset-2">
							<p>{thisAd.ad.summary}</p>
						</div>

						<div className="col-3 move-up offset-1">
							<a href={thisAd.ad.videourl} target="_blank">
								<img src={ThumbAd} alt="Upload Ads" />
							</a>
							<table className="">
								<tbody>
									<tr>
										<td>Title</td>
										<td>{thisAd.ad.shortname}</td>
									</tr>
									<tr>
										<td>Brand</td>
										<td>{thisAd.ad.brand}</td>
									</tr>
									<tr>
										<td>Industry</td>
										<td>{thisAd.ad.industry}</td>
									</tr>
									<tr>
										<td>Length</td>
										<td>{thisAd.ad.lengthAd}"</td>
									</tr>
									<tr>
										<td>Channel</td>
										<td>{thisAd.ad.channel}</td>
									</tr>
									<tr>
										<td>State</td>
										<td>{thisAd.ad.productionState}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<div className="container-fluid single">
						<div className="col-9 offset-2">
							<Tabs>
								<TabList>
									<Tab>
										<div className="col-3">
											<CircleProgress
												value={Math.round(
													thisAd.kpis.total
												)}
												size={'big'}
												name={'SpotOn score'}
												countryNorm={countryNorm.total}
											/>
										</div>
									</Tab>
									<Tab>
										<div className="col-2">
											<CircleProgress
												value={Math.round(
													thisAd.kpis.brandRelevance
												)}
												size={'medium'}
												name={'Brand Relevance'}
												countryNorm={
													countryNorm.brandRelevance
												}
											/>
										</div>
									</Tab>
									<Tab>
										<div className="col-2">
											<CircleProgress
												value={Math.round(
													thisAd.kpis.viewerEngagement
												)}
												size={'medium'}
												name={'Viewer Engagement'}
												countryNorm={
													countryNorm.viewerEngagement
												}
											/>
										</div>
									</Tab>
									<Tab>
										<div className="col-2">
											<CircleProgress
												value={Math.round(
													thisAd.kpis.adMessage
												)}
												size={'medium'}
												name={'Ad Message'}
												countryNorm={
													countryNorm.adMessage
												}
											/>
										</div>
									</Tab>
								</TabList>

								<TabPanel />
								<TabPanel>
									<HorizontalChart
										thisResults={[thisAd]}
										kpis={this.props.getKPIs.init(
											brandRelevance
										)}
									/>
								</TabPanel>
								<TabPanel>
									<HorizontalChart
										thisResults={[thisAd]}
										kpis={this.props.getKPIs.init(
											viewerEngagement
										)}
									/>
								</TabPanel>
								<TabPanel>
									<HorizontalChart
										thisResults={[thisAd]}
										kpis={this.props.getKPIs.init(
											adMessage
										)}
									/>
									<h2>Emotion breakout</h2>
									<ObjectBarChart
										thisResults={thisAd.ad.emotion}
										kpis={'Emotion'}
									/>
									<br />
									<h2>Tone of voice breakout</h2>
									<ObjectBarChart
										thisResults={thisAd.ad.toneOfVoice}
										kpis={'Tone of Voice'}
									/>
								</TabPanel>
							</Tabs>
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
