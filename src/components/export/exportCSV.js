import React, { Component, Fragment } from 'react'
import Workbook from 'react-excel-workbook'
import { FunctionsResults, SmallLoadingSpinner } from '../../components'
var _ = require('lodash')

const functionsResults = new FunctionsResults()

class ExportCSV extends Component {
	constructor() {
		super()
		this.state = {
			allResults: []
		}
	}

	static defaultProps = {
		functionsResults
	}

	// Calculate the percentile values of the selceted Ads
	componentDidMount = async () => {
		let allResults = await this.props.functionsResults.getPercentileScore(
			this.props.toExport
		)
		this.setState({
			allResults: allResults.selectedAds
		})
	}

	componentDidUpdate = async (prevProps, prevState, snapshot) => {
		let { toExport } = this.props
		let oldToExport = prevProps.toExport

		if (toExport !== oldToExport) {
			let allResults = await this.props.functionsResults.getPercentileScore(
				this.props.toExport
			)
			this.setState({
				allResults: allResults.selectedAds
			})
		}
	}

	render() {
		let weightedValues = _.map(this.state.allResults, 'kpis')
		const percentileValues = _.map(this.state.allResults, 'percentile')

		// Returns the name of the kpis
		const headerCSV = () => {
			return <Workbook.Column key={0} label="Ad name" value="adID" />
		}

		const kpis = [
			'total',
			'brandRelevance',
			'brandRecall',
			'relevance',
			'brandFit',
			'viewerEngagement',
			'adAppeal',
			'shareability',
			'callToAction',
			'adMessage',
			'toneOfVoice',
			'emotion',
			'uniqueness',
			'messaging'
		]

		// Prepend the country norms into the weighted sheet
		let { countryNorms } = this.props
		for (let c in countryNorms) {
			countryNorms[c]['adID'] = c
		}
		countryNorms = _.values(countryNorms)
		weightedValues = _.concat(weightedValues, countryNorms)

		const columns = kpis.map(function(s, i) {
			return (
				<Workbook.Column
					key={i + 1}
					label={s}
					value={row => Math.round(row[s])}
				/>
			)
		})

		const percentilColumns = kpis.map(function(s, i) {
			return (
				<Workbook.Column
					key={i + 1}
					label={s}
					value={row => Math.round(row[s]) + 'th'}
				/>
			)
		})

		// prepend the nameof the KPIs as the first column
		columns.unshift(headerCSV())
		percentilColumns.unshift(headerCSV())

		if (_.isEmpty(this.state.allResults)) {
			return <SmallLoadingSpinner />
		} else {
			return (
				<Fragment>
					<Workbook
						filename="SpotOnReport.xlsx"
						element={
							<button className="btn download">
								<span className="icon-file-excel" />
								Download as Excel
							</button>
						}>
						<Workbook.Sheet
							data={weightedValues}
							name="Weighted Report">
							{columns}
						</Workbook.Sheet>

						<Workbook.Sheet
							data={percentileValues}
							name="Percentile Report">
							{percentilColumns}
						</Workbook.Sheet>
					</Workbook>
				</Fragment>
			)
		}
	}
}

export default ExportCSV
