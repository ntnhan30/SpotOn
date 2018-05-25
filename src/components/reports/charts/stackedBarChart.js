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
	ResponsiveContainer
} from 'recharts'
var _ = require('lodash')

class StackedBarCharts extends Component {
	constructor() {
		super()

		this.colorChart = new ColorChart()
	}

	render() {
		let thisResults = _.values(this.props.selectedAds)

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
			return (
				<Bar
					key={i}
					dataKey={kpi.name}
					stackId="a"
					fill={this.colorChart.getColor(i)}
				/>
			)
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
					</BarChart>
				</ResponsiveContainer>
			</div>
		)
	}
}

export default StackedBarCharts
