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
	async componentDidMount() {
		let allResults = await this.props.functionsResults.getPercentileScore(
			this.props.toExport
		)
		this.setState({
			allResults: allResults.selectedAds
		})
	}

	// The Workbook plugin demands the array to be ordered in a different way.
	// This takes the name of the type report (keyname) and set them grouped by kpi
	getOrderedValuesForCSV(typeOfReport) {
		let weightedValues = _.map(this.state.allResults, typeOfReport)
		const weighted = {}
		for (let kpi in weightedValues[0]) {
			let kpisVal = {}
			kpisVal['kpi'] = kpi
			weightedValues = _.pickBy(weightedValues, _.identity)
			for (let v in weightedValues) {
				kpisVal[weightedValues[v]['adID']] = weightedValues[v][kpi]
			}
			weighted[kpi] = kpisVal
		}

		// Returns an ordered array§ of results
		let result = []
		result.push(weighted.total)
		result.push(weighted.brandRelevance)
		result.push(weighted.brandRecall)
		result.push(weighted.relevance)
		result.push(weighted.brandFit)
		result.push(weighted.viewerEngagement)
		result.push(weighted.adAppeal)
		result.push(weighted.shareability)
		result.push(weighted.callToAction)
		result.push(weighted.adMessage)
		result.push(weighted.toneOfVoice)
		result.push(weighted.emotion)
		result.push(weighted.uniqueness)
		result.push(weighted.messaging)

		return result
	}

	render() {
		const weightedValues = this.getOrderedValuesForCSV('kpis')
		const percentileValues = this.getOrderedValuesForCSV('percentile')
		let selectedAds = _.values(this.state.allResults)

		// Returns the name of the kpis
		const headerCSV = () => {
			return <Workbook.Column key={0} label="KPI" value="kpi" />
		}

		// Creates the columns for the Excel export
		const columns = selectedAds.map(function(s, i) {
			return (
				<Workbook.Column
					key={i + 1}
					label={s.ad.adname}
					value={row => Math.round(row[s.ad.adname])}
				/>
			)
		})

		const percentilColumns = selectedAds.map(function(s, i) {
			return (
				<Workbook.Column
					key={i + 1}
					label={s.ad.adname}
					value={row => Math.round(row[s.ad.adname]) + 'th'}
				/>
			)
		})
		// ----

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
							<button className="btn">
								<span className="icon-in" />Download as Excel
							</button>
						}
					>
						<Workbook.Sheet
							data={weightedValues}
							name="Weighted Report"
						>
							{columns}
						</Workbook.Sheet>
						<Workbook.Sheet
							data={percentileValues}
							name="Percentile Report"
						>
							{percentilColumns}
						</Workbook.Sheet>
					</Workbook>
				</Fragment>
			)
		}
	}
}

export default ExportCSV
