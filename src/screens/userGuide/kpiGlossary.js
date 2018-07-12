import React, { Component, Fragment } from 'react'

class KPIGlossary extends Component {
	render() {
		return (
			<Fragment>
				<div>
					<h4>Brand Relevance</h4>
					The weighted average of the related Level 2 KPIs
					<strong>
						(Brand Recall 30%, Relevance 40%, Brand Fit 30%)
					</strong>
				</div>
				<div>
					<h4>Viewer Engagement</h4>
					The weighted average of the related Level 2 KPIs
					<strong>
						(Ad Appeal 30%, Sharibility 10%, Call To Action 60%)
					</strong>
				</div>
				<div>
					<h4>Ad Message</h4>
					The weighted average of the related Level 2 KPIs.
					<strong>
						(Tone of Voice 30%, Emotion 30%, Uniqueness 20%,
						Messaging 20%)
					</strong>
				</div>
			</Fragment>
		)
	}
}

export default KPIGlossary
