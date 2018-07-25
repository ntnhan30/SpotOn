import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
	AppContext,
	Favourite,
	CellCPA,
	LoadingSpinner
} from '../../components'

class FeaturedTable extends Component {
	constructor(props, context) {
		super(props, context)

		this.state = {
			imported: false,
			uploading: false
		}
	}

	render() {
		const { ads } = this.props
		console.log(ads)

		const tableHeader = (
			<tr>
				<th scope="col" />
				<th scope="col">Title</th>
				<th scope="col">Brand</th>
				<th scope="col">Industry</th>
				<th scope="col">Score</th>
				<th scope="col">CPA / GRP</th>
				<th scope="col">More</th>
				<th scope="col">Fav</th>
			</tr>
		)

		const listOfAds = ads.map((ad, i) => {
			return (
				<tr key={i}>
					<td>{i + 1}</td>
					<td>{ad.shortname}</td>
					<td>{ad.brand}</td>
					<td>{ad.industry}</td>
					<td>{Math.round(ad.kpis.total)}</td>
					<td>{<CellCPA cpa={ad.CPA_name} />}</td>
					<td>
						<Link to={{ pathname: '/ad/' + ad.adname }}>
							<span className="icon-eye" />
						</Link>
					</td>
					<td>
						<AppContext>
							{context => (
								<Favourite
									isFavorite={ad.favourite}
									adname={ad.adname}
									updateFavourites={context.updateFavourites}
								/>
							)}
						</AppContext>
					</td>
				</tr>
			)
		})

		if (ads.length > 0) {
			return (
				<table className="table table-striped table-hover table-fixed">
					<thead className="">{tableHeader}</thead>
					<tbody>{listOfAds}</tbody>
				</table>
			)
		} else {
			return <LoadingSpinner />
		}
	}
}

export default FeaturedTable
