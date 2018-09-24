import React, { Component } from 'react'
import { ColorChart } from '../../constants'
import {
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar,
	ReferenceLine,
	ResponsiveContainer
} from 'recharts'
var _ = require('lodash')

class StackedBarCharts extends Component {
	constructor() {
		super()

		this.colorChart = new ColorChart()
	}

	render() {
		let { countryNorms, selectedAds } = this.props

		let thisResults = _.values(selectedAds)

		let dataForChart = []
		// eslint-disable-next-line
		thisResults.map(singleResult => {
			const set = {
				name: singleResult.shortname
			}
			// eslint-disable-next-line
			this.props.kpis.map(kpi => {
				const kpiValue = singleResult.kpis
					? parseInt(
						singleResult['kpis'][kpi.nameInDB] * kpi.weight,
						10
					)
					: 0
				set[kpi.name] = kpiValue
			})
			dataForChart.push(set)
		})

		const bars = this.props.kpis.map((kpi, i) => {
			let color = this.props.kpis.length > 1 ? i : 1
			return (
				<Bar
					key={i}
					dataKey={kpi.name}
					stackId="a"
					fill={this.colorChart.getColor(color)}
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
						key={1}
						y={countryNorm}
						label={{
							value: single.name + ' country norm',
							position: 'insideBottomLeft'
						}}
						stroke={self.colorChart.getNormColor(0)}
						strokeDasharray="10 10"
					/>
				)
			} else {
				return null
			}
		})

		return (
			<div>
				<ResponsiveContainer width="95%" height="95%" minHeight={300}>
					<BarChart
						width={730}
						data={dataForChart}
						margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
						<XAxis dataKey="name" />
						<YAxis domain={[0, 100]} />
						<CartesianGrid strokeDasharray="3 3" />
						<Tooltip />
						<Legend />
						{bars}
						{references}
					</BarChart>
				</ResponsiveContainer>
			</div>
		)
	}
}

export default StackedBarCharts
