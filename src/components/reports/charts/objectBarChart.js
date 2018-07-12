import React, { Component } from 'react'
import { ColorChart } from '../../constants'
import {
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar,
	BarChart,
	ResponsiveContainer,
	LabelList
} from 'recharts'
var _ = require('lodash')

class ObjectBarChart extends Component {
	constructor() {
		super()

		this.colorChart = new ColorChart()
	}

	render() {
		let results = this.props.selectedAds

		const sumOfAll = _.sum(
			_.values(_.omit(this.props.selectedAds, ['adName']))
		)

		let resultsPercentage = {}
		_.mapKeys(results, (v, key) => {
			v = Math.round(v / sumOfAll * 100)
			//v =  (v / sumOfAll) * 100
			resultsPercentage[key] = v
		})

		//results['adName'] = this.props.kpis;
		results = [resultsPercentage]

		let thisKeys = []

		for (let i in this.props.selectedAds) {
			thisKeys.push(i)
		}

		const renderCustomLabel = props => {
			const { x, y, width, value } = props
			const radius = 10

			return (
				<g>
					<text
						x={x + width / 2}
						y={y - radius}
						fill="#fff"
						textAnchor="middle"
						dominantBaseline="middle">
						{value}%
					</text>
				</g>
			)
		}

		const bars = thisKeys.map((obj, i) => {
			return (
				<Bar key={i} dataKey={obj} fill={this.colorChart.getColor(i)}>
					<LabelList
						dataKey={thisKeys[i]}
						position="top"
						content={renderCustomLabel}
					/>
				</Bar>
			)
		})

		console.log('results')
		console.log(results)

		return (
			<ResponsiveContainer width="95%" height="95%" minHeight={300}>
				<BarChart
					width={730}
					data={results}
					margin={{ top: 20, right: 0, left: 0, bottom: 90 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="adName" />
					<YAxis
						domain={[0, 'dataMax + 5']}
						tickCount={10}
						unit="%"
						label={{
							value: 'Percentage',
							angle: -90,
							position: 'insideLeft'
						}}
						allowDecimals={true}
					/>
					<Tooltip active={false} cursor={false} />
					<Legend />
					{bars}
				</BarChart>
			</ResponsiveContainer>
		)
	}
}

export default ObjectBarChart
