import React, { Component, Fragment } from 'react'
import {
	LoadingSpinner,
	ColorTag,
	ExportCSV,
	CountryNorm
} from '../../components'
import { StickyTable, Row, Cell } from 'react-sticky-table'
import 'react-sticky-table/dist/react-sticky-table.css'
var _ = require('lodash')

class WeightedReport extends Component {
	render() {
		const displayHeaderTable = () => {
			const self = this

			let cells = []
			let valuesCell = []
			let sampleSize = []
			_.mapValues(self.props.allResults, single => {
				valuesCell.push(single.ad.shortname)
				sampleSize.push(single.ad.sampleSize)
			})

			cells.push(
				<Cell key={0}>
					<ExportCSV toExport={self.props.allResults} />
				</Cell>
			)
			// eslint-disable-next-line
			valuesCell.map((single, i) => {
				cells.push(
					<Cell key={i + 1}>
						{single}
						<span className="sampleSize">{sampleSize[i]}</span>
					</Cell>
				)
			})

			return <Row>{cells}</Row>
		}

		const displaySingleKPI = (kpi, nameOfClass, title) => {
			const self = this

			let cells = []
			let valuesCell = []
			let countries = []
			// eslint-disable-next-line
			_.mapValues(self.props.allResults, single => {
				let v =
					single['kpis'] == null || isNaN(single['kpis'][kpi])
						? 0
						: single['kpis'][kpi]
				valuesCell.push(Math.round(v))
				countries.push(single.ad.country)
			})

			cells.push(<Cell key={0}>{title}</Cell>)
			// eslint-disable-next-line
			valuesCell.map((single, i) => {
				cells.push(
					<Cell key={i + 1}>
						{single}
						{displayColorTag(single, [countries[i]], kpi)}
					</Cell>
				)
			})

			return <Row className={nameOfClass}>{cells}</Row>
		}

		const displayColorTag = (single, countryName, kpi) => {
			if (this.props.countryNorms[countryName] !== undefined) {
				return (
					<ColorTag
						difference={
							single - this.props.countryNorms[countryName][kpi]
						}
					/>
				)
			} else {
				return <ColorTag difference={0} />
			}
		}

		if (_.isEmpty(this.props.countryNorms)) {
			return <LoadingSpinner />
		} else {
			return (
				<Fragment>
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
					<CountryNorm countryNorm={this.props.countryNorms} />
				</Fragment>
			)
		}
	}
}

export default WeightedReport
