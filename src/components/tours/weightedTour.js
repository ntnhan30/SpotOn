import React, { Component } from 'react'
import Joyride from 'react-joyride'
import Delay from 'react-delay'
import jQuery from 'jquery'
const $ = (window.$ = window.jQuery = jQuery)

class WeightedTour extends Component {
	constructor() {
		super()
		this.state = {
			autoStart: true,
			run: true,
			stepIndex: 0,
			steps: [
				{
					title: 'What is the Weighted report?',
					text:
						'The weighted report is calculated by weighted survey answers. Want to know more? Check out our ‘User Guidelines’ at the top of the page!',
					selector: '.col-8.main-content',
					position: 'left',
					isFixed: true
				},
				{
					title: 'What is the SpotON Score?',
					text:
						'The SpotON Score is calculated by the Brand Relevance, Viewer Engagement and Ad Message scores',
					selector:
						'.sticky-table-y-wrapper .sticky-table-row.level1',
					position: 'right',
					isFixed: true
				},
				{
					title: 'View Country norm',
					text: 'Click on this tab to view the "Country norm"',
					selector: '.toggle-sidebar',
					position: 'left',
					isFixed: true,
					style: {
						button: {
							display: 'none'
						}
					}
				},
				{
					title: 'Country norm colour coding',
					text:
						'We will always display the comparison vs country norm when is +- 7 points by colour tags, green for positive, red for negative',
					selector: '.green',
					position: 'bottom',
					isFixed: true,
					rule: 'color coding'
				},
				{
					title: 'Download a report',
					text:
						'Want to save the results? Click here to download them in Excel!',
					selector: '.download',
					position: 'bottom-left',
					isFixed: true
				},
				{
					title: 'Percentile Report',
					text: 'Now let’s view the Percentile report, click here!',
					selector: '.percentileButton',
					position: 'bottom-left',
					isFixed: true,
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

	render() {
		const { autoStart, run, stepIndex, steps } = this.state
		return (
			<Delay wait={1000}>
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
			</Delay>
		)
	}

	handleJoyrideCallback = data => {
		// After closing the step
		if (data.type === 'step:before') {
			if (data.step.rule === 'color coding') {
				if ($('.active.pull-in-sidebar').length > 0) {
				} else {
					const { steps } = this.state
					steps.splice(0, data.index - 1)
					this.setState({
						steps
					})
					this.joyride.reset(true)
				}
			} else if (data.step.rule === 'click') {
				const { steps } = this.state
				steps.splice(0, data.index - 1)
				this.setState({
					steps
				})
				this.joyride.reset(true)
			}
		} else if (data.type === 'step:after') {
			if (data.action === 'skip' || data.action === 'close') {
				this.props.finishTour()
			}
		}
	}

	jqueryClickHandlers() {
		const self = this
		$('.toggle-sidebar').on('click', function() {
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

export default WeightedTour
