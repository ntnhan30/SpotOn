import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import {
	AppContext,
	AdList,
	FilterSidebar,
	SelectedAds,
	Tour
} from '../../components'
import { SingleReport, Chart } from '../../screens'

class SelectReports extends Component {
	render() {
		return (
			<AppContext.Consumer>
				{context => (
					<Fragment>
						{/* <Tour />*/}
						<div className="container-fluid main">
							<div className="col-2 sidebar" id="filter">
								<FilterSidebar
									ads={context.ads}
									filteredAds={context.ads}
								/>
							</div>

							<div className="col-2 sidebar" id="selected">
								<Route
									key={2}
									exact={false}
									path="/"
									render={props => (
										<SelectedAds
											ads={context.selectedAds}
											toggleSelection={
												context.toggleSelection
											}
											{...this.props}
											{...props}
										/>
									)}
								/>
							</div>

							<div className="col-8 main-content">
								<div>
									<Route
										key={1}
										exact={true}
										path="/weightedReport/:id"
										render={props => (
											<SingleReport
												selectedAds={
													context.selectedAds
												}
												toggleSelection={
													context.toggleSelection
												}
												detailsOfSelectedAds={
													context.detailsOfSelectedAds
												}
												getAdsFromURL={
													context.getAdsFromURL
												}
												typeOfReport="weighted"
												{...this.props}
												{...props}
											/>
										)}
									/>

									<Route
										key={2}
										exact={true}
										path="/percentileReport/:id"
										render={props => (
											<SingleReport
												selectedAds={
													context.selectedAds
												}
												toggleSelection={
													context.toggleSelection
												}
												detailsOfSelectedAds={
													context.detailsOfSelectedAds
												}
												getAdsFromURL={
													context.getAdsFromURL
												}
												typeOfReport="percentile"
												{...this.props}
												{...props}
											/>
										)}
									/>

									<Route
										key={3}
										exact={true}
										path="/chart/:id"
										render={props => (
											<Chart
												detailsOfSelectedAds={
													context.detailsOfSelectedAds
												}
												getAdsFromURL={
													context.getAdsFromURL
												}
												{...this.props}
												{...props}
											/>
										)}
									/>

									<Route
										key={4}
										exact={true}
										path="/"
										render={props => (
											<AdList
												ads={context.ads}
												toggleSelection={
													context.toggleSelection
												}
												{...this.props}
												{...props}
											/>
										)}
									/>
								</div>
							</div>
						</div>
					</Fragment>
				)}
			</AppContext.Consumer>
		)
	}
}

export default SelectReports
