import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

class SelectedAds extends Component {
	render() {
		let selectedAdsID = []

		const tableHeader = (
			<tr>
				<th scope="col">SELECTED ADS</th>
				<th scope="col" />
			</tr>
		)

		const renderedAds = this.props.ads.map((ad, i) => {
			if (ad.selected) {
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
							<span
								className="icon-close"
								onClick={() =>
									this.props.handleSelection(ad, false)
								}
							/>
							<Link to={{ pathname: '/ad/' + ad.adname }}>
								<span className="icon-more" />
							</Link>
						</td>
					</tr>
				)
			} else {
				return false
			}
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
									}}
								>
									<button>Weighted</button>
								</Link>
								<Link
									to={{
										pathname:
											'/percentileReport/' +
											selectedAdsURL
									}}
								>
									<button>Percentile</button>
								</Link>
								<Link
									to={{
										pathname: '/chart/' + selectedAdsURL
									}}
								>
									<button>Chart</button>
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
					<thead className="thead-dark">{tableHeader}</thead>
					<tbody>{reportButtons()}</tbody>
				</table>
				<div>
					<table className="table table-striped table-hover">
						<tbody>{listSelectedAds()}</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default SelectedAds
