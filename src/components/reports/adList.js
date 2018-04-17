import React, { Component } from 'react'
import { LoadingSpinner } from '../../components'
import { Link } from 'react-router-dom'
import Checkbox from 'rc-checkbox'
import 'rc-checkbox/assets/index.css'

class AdList extends Component {
	handleInputChange(ad, event) {
		this.props.handleSelection(ad, event.target.checked)
	}

	render() {
		// Logic for displaying ads
		const { ads } = this.props

		const tableHeader = (
			<tr>
				<th scope="col" />
				<th scope="col">Title</th>
				<th scope="col">Brand</th>
				<th scope="col">Date</th>
				<th scope="col">Industry</th>
				<th scope="col">Length</th>
				<th scope="col">Channel</th>
				<th scope="col">State</th>
				<th scope="col">Ad info</th>
			</tr>
		)

		const renderedAds = ads.map((ad, i) => {
			if (ad.show) {
				//<Link to={{ pathname:'/ad/' + ad.adname, query: { ad: ad } }}>
				return (
					<tr key={i}>
						<td>
							<Checkbox
								name={ad.adname}
								checked={ad.selected}
								onChange={e => this.handleInputChange(ad, e)}
							/>
						</td>
						<td>{ad.shortname}</td>
						<td>{ad.brand}</td>
						<td>{ad.campaigndate}</td>
						<td>{ad.industry}</td>
						<td>{ad.lengthAd}"</td>
						<td>{ad.channel}</td>
						<td>{ad.state}</td>
						<td>
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

		if (ads === undefined || ads.length === 0) {
			return <LoadingSpinner />
		} else {
			// The return from the AdList Class
			return (
				<table className="table table-striped table-hover table-fixed">
					<thead className="">{tableHeader}</thead>
					<tbody>{renderedAds}</tbody>
				</table>
			)
		}
	}
}

export default AdList
