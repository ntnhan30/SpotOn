import React, { Component } from 'react'
import { ColorChart } from '../../constants'
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

class BarCharts extends Component {
	constructor() {
		super()

		this.colorChart = new ColorChart()
	}

	render() {
		let { countryNorms, selectedAds } = this.props

		// Convert the object into array
		selectedAds = _.values(selectedAds)

		// Prepare the data for the chart
		let dataForChart = []
		// eslint-disable-next-line
		this.props.kpis.map(kpi => {
			const set = {
				name: kpi.nameInDB
			}
			// eslint-disable-next-line
			selectedAds.map(obj => {
				const kpiValue = obj.kpis
					? parseInt(obj['kpis'][kpi.nameInDB], 10)
					: 0
				set[obj.shortname] = kpiValue
			})
			dataForChart.push(set)
		})

		// Unique key for iterating
		let k = 0
		const bars = selectedAds.map(obj => {
			return (
				<Bar
					key={k++}
					dataKey={obj.shortname}
					fill={this.colorChart.getColor(k)}
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
					<ComposedChart
						width={730}
						data={dataForChart}
						margin={{ top: 20, right: 0, left: 0, bottom: 30 }}>
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
