import React, { Component, Fragment } from 'react'
import { ColorChart } from '../../constants'
import {
	BarChart,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar,
	ResponsiveContainer
} from 'recharts'

const colorChart = new ColorChart()

class HorizontalChart extends Component {
	static defaultProps = {
		colorChart
	}

	render() {
		let { selectedAds } = this.props

		let thisResults = []
		for (let i in selectedAds) {
			thisResults.push(selectedAds[i])
		}

		let dataForChart = []
		// eslint-disable-next-line
		thisResults.map(singleResult => {
			const set = {
				name: singleResult.shortname
			}
			// eslint-disable-next-line
			this.props.kpis.map(kpi => {
				set[kpi.name] = parseInt(
					singleResult['kpis'][kpi.nameInDB] * kpi.weight,
					10
				)
			})
			dataForChart.push(set)
		})

		const bars = this.props.kpis.map((kpi, i) => {
			return (
				<Bar
					key={i}
					dataKey={kpi.name}
					stackId="a"
					layout="vertical"
					fill={this.props.colorChart.getColor(i)}
				/>
			)
		})
		return (
			<Fragment>
				<ResponsiveContainer width="95%" height={120} minHeight={120}>
					<BarChart
						width={730}
						data={dataForChart}
						layout="vertical"
						margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
						<XAxis type="number" domain={[0, 100]} />
						<YAxis type="category" dataKey="name" hide={true} />
						<Legend />
						<Tooltip cursor={false} />
						{bars}
					</BarChart>
				</ResponsiveContainer>
			</Fragment>
		)
	}
}

export default HorizontalChart
