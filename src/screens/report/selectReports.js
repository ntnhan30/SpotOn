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
									path="/:mode"
									render={props => (
										<SelectedAds
											ads={context.selectedAds}
											toggleSelection={
												context.toggleSelection
											}
											isInsideReport={
												context.isInsideReport
											}
											mode={context.mode}
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
										path="/:mode/weightedReport/:id"
										render={props => (
											<SingleReport
												selectedAds={
													context.selectedAds
												}
												toggleSelection={
													context.toggleSelection
												}
												getAdsFromURL={
													context.getAdsFromURL
												}
												profile={context.profile}
												typeOfReport="weighted"
												mode={context.mode}
												{...this.props}
												{...props}
											/>
										)}
									/>

									<Route
										key={2}
										exact={true}
										path="/:mode/percentileReport/:id"
										render={props => (
											<SingleReport
												selectedAds={
													context.selectedAds
												}
												toggleSelection={
													context.toggleSelection
												}
												getAdsFromURL={
													context.getAdsFromURL
												}
												profile={context.profile}
												typeOfReport="percentile"
												mode={context.mode}
												{...this.props}
												{...props}
											/>
										)}
									/>

									<Route
										key={3}
										exact={true}
										path="/:mode/chart/:id"
										render={props => (
											<Chart
												selectedAds={
													context.selectedAds
												}
												getAdsFromURL={
													context.getAdsFromURL
												}
												profile={context.profile}
												mode={context.mode}
												{...this.props}
												{...props}
											/>
										)}
									/>

									<Route
										key={4}
										exact={true}
										path="/:mode"
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
												mode={context.mode}
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
