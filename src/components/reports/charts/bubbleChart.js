import React, { Component } from 'react'
import { ColorChart } from '../../constants'
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	ZAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts'

const colorChart = new ColorChart()

class BubbleChart extends Component {
	static defaultProps = {
		colorChart
	}

	render() {
		let { selectedAds } = this.props

		let thisResults = []
		for (let i in selectedAds) {
			thisResults.push(selectedAds[i])
		}

		const bubbles = thisResults.map((obj, i) => {
			const dataForStats = [
				{
					brandRelevance: parseInt(obj['kpis']['brandRelevance'], 10),
					viewerEngagement: parseInt(
						obj['kpis']['viewerEngagement'],
						10
					),
					adMessage: parseInt(obj['kpis']['adMessage'], 10)
				}
			]
			return (
				<Scatter
					key={i}
					data={dataForStats}
					name={obj.shortname}
					fill={this.props.colorChart.getColor(i)}
					shape="circle"
				/>
			)
		})
		return (
			<div>
				<ResponsiveContainer width="95%" height="100%" minHeight={300}>
					<ScatterChart
						margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
						<XAxis
							type="number"
							dataKey={'brandRelevance'}
							name="Brand Relevance"
							domain={[0, 100]}
						/>
						<YAxis
							type="number"
							dataKey={'adMessage'}
							name="Ad Message"
							domain={[0, 100]}
						/>
						<ZAxis
							dataKey={'viewerEngagement'}
							range={[2000, 5000]}
							name="Viewer Engagement"
						/>
						<CartesianGrid />
						<Tooltip cursor={{ strokeDasharray: '9 9' }} />
						<Legend />
						{bubbles}
					</ScatterChart>
				</ResponsiveContainer>
			</div>
		)
	}
}

export default BubbleChart
