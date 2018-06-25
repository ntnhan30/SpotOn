import React, { Component, Fragment } from 'react'
import {
	RadarCharts,
	BarCharts,
	StackedBarCharts,
	GetKPIs,
	SmallLoadingSpinner,
	AppContext,
	ChartTour,
	ExportChart
} from '../../components'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
var _ = require('lodash')

const getKPIs = new GetKPIs()

class Chart extends Component {
	static defaultProps = {
		getKPIs
	}

	render() {
		const { selectedAds } = this.props

		if (!_.isEmpty(selectedAds)) {
			let total = ['Total']
			let mainKPIs = [
				'Brand Relevance',
				'Viewer Engagement',
				'Ad Message'
			]
			let singleKpis = [
				'Brand Recall',
				'Relevance',
				'Brand Fit',
				'Ad Appeal',
				'Shareability',
				'Call to action',
				'Tone of voice',
				'Emotion',
				'Uniqueness',
				'Messaging'
			]
			let brandRelevance = ['Brand Recall', 'Relevance', 'Brand Fit']
			let viewerEngagement = [
				'Ad Appeal',
				'Shareability',
				'Call to action'
			]
			let adMessage = [
				'Messaging',
				'Tone of voice',
				'Emotion',
				'Uniqueness'
			]

			const showTour = () => {
				if (this.props.profile.firstTime) {
					return (
						<AppContext.Consumer>
							{context => (
								<ChartTour
									selectedAds={selectedAds}
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
				<AppContext.Consumer>
					{context => (
						<Fragment>
							{showTour()}
							<Tabs>
								<TabList>
									<ExportChart />
									<Tab>Spot On score</Tab>
									<Tab>L1 KPIs</Tab>
									<Tab>Brand Relevance</Tab>
									<Tab>Viewer Engagement</Tab>
									<Tab>Ad Message</Tab>
									<Tab>KPIs details</Tab>
								</TabList>

								<TabPanel>
									<BarCharts
										selectedAds={context.selectedAds}
										kpis={this.props.getKPIs.init(total)}
										countryNorms={context.countryNorms}
									/>
								</TabPanel>
								<TabPanel>
									<BarCharts
										selectedAds={context.selectedAds}
										kpis={this.props.getKPIs.init(mainKPIs)}
										countryNorms={context.countryNorms}
									/>
								</TabPanel>
								<TabPanel>
									<StackedBarCharts
										selectedAds={selectedAds}
										kpis={this.props.getKPIs.init(
											brandRelevance
										)}
									/>
								</TabPanel>
								<TabPanel>
									<StackedBarCharts
										selectedAds={selectedAds}
										kpis={this.props.getKPIs.init(
											viewerEngagement
										)}
									/>
								</TabPanel>
								<TabPanel>
									<StackedBarCharts
										selectedAds={selectedAds}
										kpis={this.props.getKPIs.init(
											adMessage
										)}
									/>
								</TabPanel>
								<TabPanel>
									<RadarCharts
										selectedAds={selectedAds}
										kpis={this.props.getKPIs.init(
											singleKpis
										)}
									/>
								</TabPanel>
							</Tabs>
						</Fragment>
					)}
				</AppContext.Consumer>
			)
		} else {
			return <SmallLoadingSpinner />
		}
	}
}

export default Chart
