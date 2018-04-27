import React, { Component } from 'react'
import Joyride from 'react-joyride'
import { findDOMNode } from 'react-dom'
import jQuery from 'jquery'
const $ = (window.$ = window.jQuery = jQuery)

class HomeFinalTour extends Component {
	constructor() {
		super()
		this.state = {
			autoStart: true,
			type: 'click',
			run: true,
			stepIndex: 0,
			steps: [
				{
					title: 'Thanks for taking our tour!',
					text:
						'We’ve reached the end of our tour - thanks for joining us! Still want to know more? Check out our ‘User Guidelines’. Enjoy SpotON!',
					selector: '.col-8.main-content',
					position: 'left',
					isFixed: true,
					button: {
						arrow: {
							display: 'none'
						}
					}
				}
			]
		}
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
		if (data.type === 'finished') {
			console.log('finished')
			this.props.finishTour()
		}
	}
}

export default HomeFinalTour
