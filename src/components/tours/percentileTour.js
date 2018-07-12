import React, { Component } from 'react'
import Joyride from 'react-joyride'
import Delay from 'react-delay'

class PercentileTour extends Component {
	constructor() {
		super()
		this.state = {
			autoStart: true,
			run: true,
			stepIndex: 0,
			steps: [
				{
					title: 'What is the Percentile report?',
					text:
						'The percentile report is calculated by the weighted shore and shows how a spot compares to other ads in the same country. Want to know more? Check out our User Guidelines!',
					selector: '.col-8.main-content',
					position: 'top',
					isFixed: true
				},
				{
					title: 'Chart report',
					text: 'Next is the ‘Chart’ report, click here!',
					selector: '.chartButton',
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
					showBackButton={false}
					showSkipButton={true}
					allowClicksThruHole={true}
					callback={this.handleJoyrideCallback}
					keyboardNavigation={true}
				/>
			</Delay>
		)
	}
	handleJoyrideCallback = data => {
		// After closing the step
		if (data.type === 'step:before') {
			if (data.step.rule === 'click') {
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
}
export default PercentileTour
