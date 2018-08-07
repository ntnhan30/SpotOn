import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { AppContext, Breakout } from "../../components";
var _ = require('lodash')

class SelectedAds extends Component {
	render() {
		const ads = _.values(this.props.ads)

		let selectedAdsID = []

		const tableHeader = () => {
			if (this.props.isInsideReport) {
				return (
					<tr>
						<th scope="col">
							<Link
								to={{
									pathname: '/'
								}}>
								GO BACK
							</Link>
						</th>
						<th scope="col" />
					</tr>
				)
			} else {
				return (
					<tr>
						<th scope="col">
							<span className="icon-list" />
							SELECTED ADS
						</th>
						<th scope="col" />
					</tr>
				)
			}
		}

		const renderedAds = ads.map((ad, i) => {
			selectedAdsID.push(ad.adname)
			return (
				<tr key={i}>
					<td>
						{ad.shortname}
						<span>
							{ad.brand}, {ad.industry}, {ad.channel}{' '}
							{ad.lengthAd}'
						</span>
					</td>
					<td className="selected-icons">
						<Link to={{ pathname: '/ad/' + ad.adname }}>
							<span className="icon-eye" />
						</Link>
						<span
							className="icon-close"
							onClick={() =>
								this.props.toggleSelection(ad.adname, false)
							}
						/>
					</td>
				</tr>
			)
		})

		const reportButtons = () => {
			// get a string with all the selected Ads separated by '&'
			const selectedAdsURL = selectedAdsID.join('&')

			if (selectedAdsID.length > 0) {
				return (
					<tr className="selectedButtons">
						<td colSpan="2">
							<div>
								<Link
									to={{
										pathname:
											'/weightedReport/' + selectedAdsURL
									}}>
									<button className="weightedButton">
										Weighted
									</button>
								</Link>
								<Link
									to={{
										pathname:
											'/percentileReport/' +
											selectedAdsURL
									}}>
									<button className="percentileButton">
										Percentile
									</button>
								</Link>
								<Link
									to={{
										pathname: '/chart/' + selectedAdsURL
									}}>
									<button className="chartButton">
										Chart
									</button>
								</Link>
							</div>
						</td>
					</tr>
				)
			} else {
				return <Fragment />
			}
		}

		const listSelectedAds = () => {
			if (selectedAdsID.length > 0) {
				return <Fragment>{renderedAds}</Fragment>
			} else {
				return (
					<tr>
						<td colSpan="2">
							CLICK ON THE CHECKBOX TO ADD TO THE SELECTION
						</td>
					</tr>
				)
			}
		}

		// Display the sidebar
		return (
			<div>
				<table className="table table-striped table-hover">
					<thead className="thead-dark">{tableHeader()}</thead>
					<tbody>{reportButtons()}</tbody>
				</table>
				<div className="list-selected">
					{
						<AppContext.Consumer>
							{context => (
								<Breakout
									ads={context.ads}
									selectedAds={context.selectedAds}
									breakoutSelectedAds={
										context.breakoutSelectedAds
									}
									isInsideReport={context.isInsideReport}
								/>
							)}
						</AppContext.Consumer>
					}
					<table className="table table-striped table-hover">
						<tbody>{listSelectedAds()}</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default SelectedAds
