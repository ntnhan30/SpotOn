import React, { Component } from 'react'
import Joyride from 'react-joyride'
import jQuery from 'jquery'
const $ = (window.$ = window.jQuery = jQuery)

class ChartTour extends Component {
	constructor() {
		super()
		this.state = {
			selectedAds: {},
			autoStart: true,
			type: 'click',
			run: true,
			stepIndex: 0,
			steps: [
				{
					title: 'What does the Chart report show?',
					text:
						'The chart report features six different tabs, ranging from an overall level to a more detailed insight at KPIs!',
					selector: '.react-tabs__tab-list',
					position: 'top',
					isFixed: true
				},
				{
					title: 'What does "SpotON Score" show?',
					text:
						'The SpotON Score chart shows the results for each ad selected. Want more info? Just hover over the columns! If viewing ads from the same country, you’ll be able to see the county norm',
					selector: '#react-tabs-1',
					position: 'bottom',
					isFixed: true
				},
				{
					title: 'What does "L1 KPIs" show?',
					text:
						'L1KPIs chart shows how each ad performed per KPI. Want more info? Just hover over each KPI for exact numbers!',
					selector: '#react-tabs-2',
					position: 'top',
					isFixed: true
				},
				{
					title: 'What does each L2 KPI tab show?',
					text:
						'Each L2 KPI is then broken into L3 KPIs per ad. Simply click the KPI you wish to view and hover over each column for exact numbers!',
					selector: '#react-tabs-4',
					position: 'top',
					isFixed: true
				},
				{
					title: 'What does "KPIs Details" show?',
					text:
						'KPIs Details contains all L3 KPIs scores. Here you can compare them to one another across all selected ads',
					selector: '#react-tabs-10',
					position: 'top',
					isFixed: true
				},
				{
					title: 'Deselecting ads',
					text:
						'Want to delete an ad? Simply click the ‘X’ on the right hand side of it on the list!',
					selector: '.icon-close',
					position: 'bottom-left',
					isFixed: true,
					style: {
						button: {
							display: 'none'
						}
					}
				},
				{
					title: 'View the ad!',
					text:
						'You can view an ad and more details by clicking on the three dots below the ‘X’',
					selector: '.selected-icons > a',
					position: 'bottom-left',
					isFixed: true,
					rule: 'delete',
					style: {
						button: {
							display: 'none'
						}
					}
				},
				{
					title: 'View Single Ad',
					text:
						'You can also view the ad itself and more details by clicking on the three dots',
					selector: '.selected-icons > a',
					position: 'bottom-left',
					isFixed: true,
					rule: 'view single',
					style: {
						button: {
							display: 'none'
						}
					}
				},
				{
					title: 'THIS STEP DOESNT EXIST',
					selector: 'nav ul li:first-child a',
					rule: 'click'
				}
			]
		}
	}

	componentDidMount() {
		this.jqueryClickHandlers()
		this.setState({
			selectedAds: this.props.selectedAds
		})
	}

	render() {
		const { autoStart, type, run, stepIndex, steps } = this.state
		return (
			<Joyride
				debug={false}
				disableOverlay={false}
				scrollToFirstStep
				type="continuous"
				run={run}
				autoStart={autoStart}
				stepIndex={stepIndex}
				steps={steps}
				ref={c => (this.joyride = c)}
				callback={this.handleJoyrideCallback}
				showBackButton={false}
				showSkipButton={true}
				allowClicksThruHole={true}
				keyboardNavigation={true}
			/>
		)
	}

	handleJoyrideCallback = data => {
		// After closing the step
		if (data.type === 'step:before') {
			if (data.step.rule === 'delete') {
				if (this.state.selectedAds === this.props.selectedAds) {
					const { steps } = this.state
					steps.splice(0, data.index - 1)
					this.setState({
						steps
					})
					this.joyride.reset(true)
				}
			} else if (data.step.rule === 'view single') {
				const { steps } = this.state
				steps.splice(0, data.index - 1)
				this.setState({
					steps
				})
				this.joyride.reset(true)
			} else if (data.step.rule === 'click') {
				const { steps } = this.state
				steps.splice(0, data.index - 1)
				this.setState({
					steps
				})
				this.joyride.reset(true)
			}
		}
	}

	jqueryClickHandlers() {
		const self = this
		$('.icon-close').on('click', function() {
			self.joyrideMoveUp()
		})
	}

	joyrideMoveUp() {
		const index = this.joyride.state.index

		const { steps } = this.state
		steps.splice(0, index + 1)
		this.setState({
			steps
		})
		this.joyride.reset(true)
	}
}

export default ChartTour
