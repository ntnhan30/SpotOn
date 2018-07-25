import React, { Component, Fragment } from 'react'
import {
	FunctionsResults,
	LoadingSpinner,
	ColorTag,
	ExportCSV,
	PercentileTour,
	AppContext
} from '../../components'
import { StickyTable, Row, Cell } from 'react-sticky-table'
import 'react-sticky-table/dist/react-sticky-table.css'
var _ = require('lodash')

const functionsResults = new FunctionsResults()

class PercentileReport extends Component {
	constructor() {
		super()
		this.state = {
			selectedAds: {},
			average: {}
		}
	}

	static defaultProps = {
		functionsResults
	}

	static getDerivedStateFromProps(nextProps, prevState, prevProps) {
		let percentile = nextProps.functionsResults.getPercentileScore(
			nextProps.ads,
			nextProps.selectedAds
		)
		const { selectedAds, average } = percentile

		// Update state
		return {
			selectedAds,
			average
		}
	}

	render() {
		const displayHeaderTable = () => {
			const self = this

			let cells = []
			let valuesCell = []
			_.mapValues(self.state.selectedAds, single => {
				valuesCell.push(single.shortname)
			})

			cells.push(
				<Cell key={0}>
					<ExportCSV
						ads={self.props.ads}
						toExport={self.state.selectedAds}
						countryNorms={this.props.countryNorms}
					/>
				</Cell>
			)
			// eslint-disable-next-line
			valuesCell.map((single, i) => {
				cells.push(<Cell key={i + 1}>{single}</Cell>)
			})

			return <Row>{cells}</Row>
		}

		const showColorTag = _.size(this.state.selectedAds) >= 5 ? true : false

		const displaySingleKPI = (kpi, nameOfClass, title) => {
			const self = this

			let cells = []
			let valuesCell = []
			_.mapValues(self.state.selectedAds, single => {
				//Get the percentile value
				let v =
					single['percentile'] == null ||
						isNaN(single['percentile'][kpi])
						? 0
						: single['percentile'][kpi]
				// push {country, value}
				valuesCell.push({
					country: single.country,
					value: Math.round(v)
				})
			})

			cells.push(<Cell key={0}>{title}</Cell>)
			// eslint-disable-next-line
			valuesCell.map((single, i) => {
				const kpiValue = self.state.average[kpi]
				cells.push(
					<Cell key={i + 1}>
						{single.value}th
						{
							/*
							showColorTag && (
								<AppContext>
									{context => (
										<ColorTag country={single.country} difference={single.value - kpiValue} standardDeviation={context.standardDeviation[single.country][kpi]} />
									)}
								</AppContext>
							)
							*/
						}
					</Cell>
				)
			})

			return <Row className={nameOfClass}>{cells}</Row>
		}

		const showTour = () => {
			if (this.props.profile.firstTime) {
				return (
					<AppContext>
						{context => (
							<PercentileTour finishTour={context.finishTour} />
						)}
					</AppContext>
				)
			} else {
				return null
			}
		}

		if (_.isEmpty(this.state.average) || this.state.average.length > 0) {
			return <LoadingSpinner />
		} else {
			return (
				<Fragment>
					{showTour()}
					<StickyTable stickyHeaderCount={1} stickyColumnCount={1}>
						{displayHeaderTable()}

						{displaySingleKPI('total', 'level1', 'SpotOn score')}

						{displaySingleKPI(
							'brandRelevance',
							'level2',
							'Brand Relevance'
						)}
						{displaySingleKPI(
							'brandRecall',
							'level3',
							'Brand Recall'
						)}
						{displaySingleKPI('relevance', 'level3', 'Relevance')}
						{displaySingleKPI('brandFit', 'level3', 'Brand Fit')}

						{displaySingleKPI(
							'viewerEngagement',
							'level2',
							'Viewer Engagement'
						)}
						{displaySingleKPI('adAppeal', 'level3', 'Ad Appeal')}
						{displaySingleKPI(
							'shareability',
							'level3',
							'Shareability'
						)}
						{displaySingleKPI(
							'callToAction',
							'level3',
							'Call to Action'
						)}

						{displaySingleKPI('adMessage', 'level2', 'Ad Message')}
						{displaySingleKPI(
							'toneOfVoice',
							'level3',
							'Tone of Voice'
						)}
						{displaySingleKPI('emotion', 'level3', 'Emotion')}
						{displaySingleKPI('uniqueness', 'level3', 'Uniqueness')}
						{displaySingleKPI('messaging', 'level3', 'Messaging')}
					</StickyTable>
				</Fragment>
			)
		}
	}
}

export default PercentileReport
