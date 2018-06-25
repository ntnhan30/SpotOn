import React, { Component, Fragment } from 'react'
import { GetFeaturedAds, FeaturedTable } from '../../components'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

class FeaturedScreen extends Component {
	constructor() {
		super()

		this.getFeaturedAds = new GetFeaturedAds()
	}

	render() {
		const { ads } = this.props
		const { getFeaturedAds } = this

		return (
			<Fragment>
				<div className="container">
					<div className="row notification-screen boxed">
						<div className="col-12">
							<h1>Overall Score</h1>
							<Tabs>
								<TabList>
									<Tab>Best</Tab>
									<Tab>Worst</Tab>
								</TabList>

								<TabPanel>
									<FeaturedTable
										ads={getFeaturedAds.bestFiveByKPI(
											'total',
											'desc',
											ads
										)}
									/>
								</TabPanel>
								<TabPanel>
									<FeaturedTable
										ads={getFeaturedAds.bestFiveByKPI(
											'total',
											'asc',
											ads
										)}
									/>
								</TabPanel>
							</Tabs>
						</div>

						<hr />

						<div className="col-12">
							<h1>By KPI</h1>
							<Tabs>
								<TabList>
									<Tab>Brand Relevance</Tab>
									<Tab>Viewer Engagement</Tab>
									<Tab>Ad Message</Tab>
								</TabList>

								<TabPanel>
									<h4>Best performing</h4>
									<FeaturedTable
										ads={getFeaturedAds.bestFiveByKPI(
											'brandRelevance',
											'desc',
											ads
										)}
									/>
									<h4>Worst performing</h4>
									<FeaturedTable
										ads={getFeaturedAds.bestFiveByKPI(
											'brandRelevance',
											'asc',
											ads
										)}
									/>
								</TabPanel>

								<TabPanel>
									<h4>Best performing</h4>
									<FeaturedTable
										ads={getFeaturedAds.bestFiveByKPI(
											'viewerEngagement',
											'desc',
											ads
										)}
									/>
									<h4>Worst performing</h4>
									<FeaturedTable
										ads={getFeaturedAds.bestFiveByKPI(
											'viewerEngagement',
											'asc',
											ads
										)}
									/>
								</TabPanel>
								<TabPanel>
									<h4>Best performing</h4>
									<FeaturedTable
										ads={getFeaturedAds.bestFiveByKPI(
											'adMessaging',
											'desc',
											ads
										)}
									/>
									<h4>Worst performing</h4>
									<FeaturedTable
										ads={getFeaturedAds.bestFiveByKPI(
											'adMessaging',
											'asc',
											ads
										)}
									/>
								</TabPanel>
							</Tabs>
						</div>

						<hr />

						<div className="col-12">
							<h1>By Industry</h1>
							<Tabs>
								<TabList>
									<Tab>Food delivery</Tab>
									<Tab>Non-food offline</Tab>
									<Tab>Offline food</Tab>
									<Tab>Online Ordering</Tab>
								</TabList>

								<TabPanel>
									<h4>Best performing</h4>
									<FeaturedTable
										ads={getFeaturedAds.bestFiveByIndustry(
											'Food delivery',
											'desc',
											ads
										)}
									/>
									<h4>Worst performing</h4>
									<FeaturedTable
										ads={getFeaturedAds.bestFiveByIndustry(
											'Food delivery',
											'asc',
											ads
										)}
									/>
								</TabPanel>

								<TabPanel>
									<h4>Best performing</h4>
									<FeaturedTable
										ads={getFeaturedAds.bestFiveByIndustry(
											'Non-food offline',
											'desc',
											ads
										)}
									/>
									<h4>Worst performing</h4>
									<FeaturedTable
										ads={getFeaturedAds.bestFiveByIndustry(
											'Non-food offline',
											'asc',
											ads
										)}
									/>
								</TabPanel>
								<TabPanel>
									<h4>Best performing</h4>
									<FeaturedTable
										ads={getFeaturedAds.bestFiveByIndustry(
											'Offline food',
											'desc',
											ads
										)}
									/>
									<h4>Worst performing</h4>
									<FeaturedTable
										ads={getFeaturedAds.bestFiveByIndustry(
											'Offline food',
											'asc',
											ads
										)}
									/>
								</TabPanel>
								<TabPanel>
									<h4>Best performing</h4>
									<FeaturedTable
										ads={getFeaturedAds.bestFiveByIndustry(
											'Online ordering',
											'desc',
											ads
										)}
									/>
									<h4>Worst performing</h4>
									<FeaturedTable
										ads={getFeaturedAds.bestFiveByIndustry(
											'Online ordering',
											'asc',
											ads
										)}
									/>
								</TabPanel>
							</Tabs>
						</div>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default FeaturedScreen
