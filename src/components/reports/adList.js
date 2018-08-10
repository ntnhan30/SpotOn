import React, { Component, Fragment } from 'react'
import {
	LoadingSpinner,
	HomeTour,
	HomeFinalTour,
	AppContext,
	CheckBoxSelectAll,
	Favourite,
	SortToggle,
	BrandRecall
} from '../../components'
import { Link } from 'react-router-dom'
import Checkbox from 'rc-checkbox'
import 'rc-checkbox/assets/index.css'

class AdList extends Component {
	handleInputChange = (ad, event) => {
		this.props.toggleSelection(ad.adname, event.target.checked)
	}

	sortAds = (title, key) => {
		return (
			<th
				scope="col"
				onClick={() => {
					this.props.sortAds(key)
				}}>
				{title}
			</th>
		)
	}

	componentDidMount() { }

	// Logic for displaying ads
	render = () => {
		let { ads, mode } = this.props

		const brandRecall = new BrandRecall()
		brandRecall.init('leifer', 'lieferheld')

		/**
		 * Set the header of the Ad list Table
		 *
		 * @returns {Component}                       The header
		 */
		const tableHeader = (
			<AppContext>
				{context => (
					<tr>
						<th scope="col">
							<CheckBoxSelectAll
								ads={context.ads}
								toggleSelection={context.toggleSelection}
								filterAtts={context.filterAtts}
							/>
						</th>
						<SortToggle
							title={'Title'}
							keyName={'shortname'}
							sorting={context.sorting}
							sortAds={context.sortAds}
						/>
						<SortToggle
							title={'Brand'}
							keyName={'brand'}
							sorting={context.sorting}
							sortAds={context.sortAds}
						/>
						<SortToggle
							title={'Date'}
							keyName={'campaigndate'}
							sorting={context.sorting}
							sortAds={context.sortAds}
						/>
						<SortToggle
							title={'Industry'}
							keyName={'industry'}
							sorting={context.sorting}
							sortAds={context.sortAds}
						/>
						<SortToggle
							title={'Length'}
							keyName={'lengthAd'}
							sorting={context.sorting}
							sortAds={context.sortAds}
						/>
						<SortToggle
							title={'Channel'}
							keyName={'channel'}
							sorting={context.sorting}
							sortAds={context.sortAds}
						/>
						<SortToggle
							title={'State'}
							keyName={'productionState'}
							sorting={context.sorting}
							sortAds={context.sortAds}
						/>
						<th scope="col">More</th>
						<SortToggle
							title={'Fav'}
							keyName={'favourite'}
							sorting={context.sorting}
							sortAds={context.sortAds}
						/>
					</tr>
				)}
			</AppContext>
		)

		/**
		 * Loop of the ads, each loop is a row
		 *
		 * @returns {Component}                       The Table
		 */
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
							<Link to={{ pathname: '/' + mode + '/ad/' + ad.adname }}>
								<span className="icon-eye" />
							</Link>
						</td>
						<td>
							<AppContext>
								{context => (
									<Favourite
										isFavorite={ad.favourite}
										adname={ad.adname}
										updateFavourites={
											context.updateFavourites
										}
									/>
								)}
							</AppContext>
						</td>
					</tr>
				)
			} else {
				return false
			}
		})

		/**
		 * Show tour Only if its the first time opening the app
		 *
		 * @returns {Component}                       The Tour
		 */
		const showTour = () => {
			if (this.props.profile.firstTime) {
				if (!this.props.lastStepOfTour) {
					return (
						<AppContext>
							{context => (
								<HomeTour finishTour={context.finishTour} />
							)}
						</AppContext>
					)
				} else {
					return (
						<AppContext>
							{context => (
								<HomeFinalTour
									finishTour={context.finishTour}
								/>
							)}
						</AppContext>
					)
				}
			} else {
				return null
			}
		}

		/**
		 * The return of the class
		 */
		if (ads === undefined || ads.length === 0) {
			// If there is nothing
			return <LoadingSpinner />
		} else {
			return (
				<Fragment>
					{showTour()}
					<table className="table table-striped table-hover table-fixed">
						<thead className="">{tableHeader}</thead>
						<tbody>{renderedAds}</tbody>
					</table>
				</Fragment>
			)
		}
	}
}

export default AdList
