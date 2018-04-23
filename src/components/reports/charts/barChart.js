import React, { Component } from 'react'
import { ColorChart, FunctionsResults } from '../../constants'
import {
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar,
	ComposedChart,
	ReferenceLine,
	ResponsiveContainer
} from 'recharts'
var _ = require('lodash')

const colorChart = new ColorChart()
const functionsResults = new FunctionsResults()

class BarCharts extends Component {
	static defaultProps = {
		colorChart,
		functionsResults
	}

	render() {
		let { countryNorms } = this.props

		// Convert the object into array
		let thisResults = _.values(this.props.thisResults)

		// Prepare the data for the chart
		let dataForChart = []
		// eslint-disable-next-line
		this.props.kpis.map(kpi => {
			const set = {
				name: kpi.nameInDB
			}
			// eslint-disable-next-line
			thisResults.map(obj => {
				const kpiValue = obj.kpis
					? parseInt(obj['kpis'][kpi.nameInDB], 10)
					: 0
				set[obj.ad.shortname] = kpiValue
			})
			dataForChart.push(set)
		})

		// Unique key for iterating
		let k = 0
		const bars = thisResults.map(obj => {
			return (
				<Bar
					key={k++}
					dataKey={obj.ad.shortname}
					fill={this.props.colorChart.getColor(k)}
				/>
			)
		})

		// Check if there are more than once country selected
		const moreThanOneCountry =
			_.size(this.props.countryNorms) > 1 ? true : false

		/* This is the reference line for the country norm
		It will only show up if there's only 1 country */
		const references = this.props.kpis.map(single => {
			if (!moreThanOneCountry) {
				const self = this
				// Get value pf the norm
				let countryNorm = {}
				for (let country in countryNorms) {
					countryNorm = countryNorms[country][single.nameInDB]
				}

				return (
					<ReferenceLine
						key={k++}
						y={countryNorm}
						label={{
							value: single.name + ' country norm',
							position: 'insideBottomLeft'
						}}
						stroke={self.props.colorChart.getNormColor(0)}
						strokeDasharray="10 10"
					/>
				)
			} else {
				return null
			}
		})

		return (
			<div>
				<ResponsiveContainer width="95%" height="100%" minHeight={300}>
					<ComposedChart width={730} data={dataForChart}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis domain={[0, 100]} />
						<Tooltip cursor={false} />
						<Legend />
						{bars}
						{references}
					</ComposedChart>
				</ResponsiveContainer>
			</div>
		)
	}
}

export default BarCharts
