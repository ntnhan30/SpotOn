import React, { Component } from 'react'
import Joyride from 'react-joyride'

class HomeFinalTour extends Component {
	constructor() {
		super()
		this.state = {
			autoStart: true,
			run: true,
			stepIndex: 0,
			steps: [
				{
					title: 'Thanks for taking our tour!',
					text:
						'We’ve reached the end of our tour - thanks for joining us! Still want to know more? Check out our ‘User Guidelines’. Enjoy SpotON!',
					selector: '#usageGuidelinesPDF',
					position: 'bottom',
					isFixed: true
				}
			]
		}
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
				callback={this.handleJoyrideCallback}
				showBackButton={false}
				showSkipButton={false}
				allowClicksThruHole={true}
				keyboardNavigation={true}
			/>
		)
	}

	handleJoyrideCallback = data => {
		// After closing the step
		if (data.type === 'finished') {
			this.props.finishTour()
		}
	}
}

export default HomeFinalTour
