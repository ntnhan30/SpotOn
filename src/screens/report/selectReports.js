import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import {
	AppContext,
	AdList,
	FilterSidebar,
	SelectedAds
} from '../../components'
import { SingleReport, Chart } from '../../screens'

class SelectReports extends Component {
	render() {
		const isHide = this.props.isInsideReport ? ' hide' : ''

		return (
			<AppContext.Consumer>
				{context => (
					<div className={isHide}>
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
											isInsideReport={
												context.isInsideReport
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
												profile={context.profile}
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
												profile={context.profile}
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
												profile={context.profile}
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
												profile={context.profile}
												lastStepOfTour={
													context.lastStepOfTour
												}
												finishTour={context.finishTour}
												{...this.props}
												{...props}
											/>
										)}
									/>
								</div>
							</div>
						</div>
					</div>
				)}
			</AppContext.Consumer>
		)
	}
}

export default SelectReports
