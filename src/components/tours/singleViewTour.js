import React, { Component } from 'react'
import Joyride from 'react-joyride'
import jQuery from 'jquery'
const $ = (window.$ = window.jQuery = jQuery)

class SingleViewTour extends Component {
	constructor() {
		super()
		this.state = {
			autoStart: true,
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
						'Click on the area you wish to view more details about.  We use four colours to represent the score, ranging from green for high and red for low!',
					selector: '.single.details',
					position: 'top'
				},
				{
					title: 'View Viewer Engagement',
					text:
						'For example, to find out more about ‘Viewer Engagement’, simply click on the circle and view the details below',
					selector: '#react-tabs-4',
					position: 'top',
					style: {
						button: {
							display: 'none'
						}
					}
				},
				{
					title: 'View Viewer Engagement',
					text: 'Now you can see this details',
					selector: '#react-tabs-5',
					position: 'bottom',
					rule: 'inside-circle'
				},
				{
					title: 'Return to the ad list',
					text:
						'Click ‘SpotON’ or ‘Reports’ to go back to the ad list!',
					selector: 'nav ul li:first-child a',
					position: 'bottom',
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
	componentDidMount() {
		this.props.activateLastStepOfTour()
		this.jqueryClickHandlers()
	}

	render() {
		const { autoStart, run, stepIndex, steps } = this.state

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
		if (data.type === 'step:before') {
			if (
				data.step.rule === 'click' ||
				data.step.rule === 'inside-circle'
			) {
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
		$('#react-tabs-4').on('click', function() {
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
export default SingleViewTour
