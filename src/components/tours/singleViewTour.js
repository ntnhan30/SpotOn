import React, { Component } from 'react'
import Joyride from 'react-joyride'
//import ReactDelayRender from 'react-delay-render'
import jQuery from 'jquery'
const $ = (window.$ = window.jQuery = jQuery)

class SingleViewTour extends Component {
	constructor() {
		super()
		this.state = {
			autoStart: true,
			type: 'click',
			run: true,
			stepIndex: 0,
			steps: [
				{
					title: 'Watch the ad',
					text: 'Click on the photo to watch the ad',
					selector: '.move-up',
					position: 'top'
				},
				{
					title: 'Ad messages',
					text:
						'These are the messages of the ad, with the main message always in bold',
					selector: '.ad-messages',
					position: 'left'
				},
				{
					title: 'Ad summary',
					text:
						'Want to know what happens without watching the ad? Read our summary!',
					selector: '.summary',
					position: 'left'
				},
				{
					title: 'View more details',
					text:
						'Click on the details you wish to view to get more info. We use four colours to represent the score, ranging from green for high and red for low!',
					selector: '.single.details',
					position: 'top'
				},
				{
					title: 'Return to the ad list',
					text:
						'Click ‘SpotON’ or ‘Reports’ to go back to the ad list!',
					selector: 'nav ul li:first-child a',
					position: 'bottom',
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
		this.props.activateLastStepOfTour()
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
				showBackButton={false}
				showSkipButton={true}
				allowClicksThruHole={true}
				callback={this.handleJoyrideCallback}
				keyboardNavigation={true}
			/>
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
		}
	}
}
export default SingleViewTour
