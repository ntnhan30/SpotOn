import React, { Component } from 'react'
import { ColorChart } from '../../constants'
import {
	Radar,
	RadarChart,
	PolarGrid,
	Legend,
	Tooltip,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer
} from 'recharts'

class RadarCharts extends Component {
	constructor() {
		super()

		this.colorChart = new ColorChart()
	}

	render() {
		let { selectedAds } = this.props

		let thisResults = []
		for (let i in selectedAds) {
			thisResults.push(selectedAds[i])
		}

		let dataForChart = this.props.kpis
		// eslint-disable-next-line
		dataForChart.map(single => {
			// eslint-disable-next-line
			thisResults.map(i => {
				const kpiValue = i.kpis
					? parseInt(i['kpis'][single['nameInDB']], 10)
					: 0
				single[i.shortname] = kpiValue
			})
		})

		const data = thisResults.map((obj, i) => {
			return (
				<Radar
					key={i}
					name={obj.shortname}
					dataKey={obj.shortname}
					stroke={this.colorChart.getColor(i)}
					fill={this.colorChart.getColor(i)}
					fillOpacity={0.4}
				/>
			)
		})

		return (
			<div>
				<ResponsiveContainer width="95%" height="95%" minHeight={200}>
					<RadarChart
						outerRadius={'90%'}
						height={'20%'}
						data={dataForChart}
						margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
						<PolarGrid />
						<PolarAngleAxis dataKey="name" />
						<PolarRadiusAxis angle={73} domain={[0, 100]} />
						{data}
						<Legend />
						<Tooltip
							cursor={{ stroke: 'red', strokeWidth: 2 }}
							position={{ x: 20, y: 100 }}
						/>
					</RadarChart>
				</ResponsiveContainer>
			</div>
		)
	}
}

export default RadarCharts
