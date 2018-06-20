import React, { Component } from 'react'
import Joyride from 'react-joyride'
import jQuery from 'jquery'
const $ = (window.$ = window.jQuery = jQuery)

class HomeTour extends Component {
	constructor() {
		super()
		this.state = {
			autoStart: true,
			type: 'click',
			run: true,
			stepIndex: 0,
			steps: [
				{
					title: ' Hi! Let’s take a tour of SpotON',
					textAlign: 'center',
					selector: '.logo img',
					position: 'right',
					isFixed: true,
					style: {
						arrow: {
							display: 'none'
						}
					}
				},
				{
					title: 'Reports',
					text:
						'On this page you will find the main list of ads, allowing you to select ads you’re interested in finding out the performance of',
					selector: '.col-8.main-content',
					position: 'bottom-left',
					isFixed: true
				},
				{
					title: 'Filter',
					text:
						'Allows you to browse ads to your specific needs, like industry, channel and length of ad',
					selector: '#filter',
					position: 'right',
					isFixed: true
				},
				{
					title: 'Select an ad',
					text: 'Select your first ad by clicking on the check box',
					selector:
						'.col-8.main-content tbody tr:first-child td span',
					position: 'bottom-left',
					isFixed: true,
					style: {
						button: {
							display: 'none'
						}
					}
				},
				{
					title: 'Select more!',
					text: 'Don’t stop there - select more ads!',
					selector:
						'.col-8.main-content tbody tr:nth-child(2) td span',
					position: 'bottom-left',
					isFixed: true,
					rule: 'checkbox1',
					style: {
						button: {
							display: 'none'
						}
					}
				},
				{
					title: 'Types of reports',
					text: 'Now you can take a look at the reports!',
					selector: '.selectedButtons td div',
					position: 'bottom',
					isFixed: true,
					rule: 'checkbox2'
				},
				{
					title: 'Weighted Report',
					text:
						'Let’s start by viewing the Weighted report, click here',
					selector: '.weightedButton',
					position: 'right',
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
			if (data.step.rule === 'checkbox1') {
				if (
					$(
						'.col-8.main-content tbody tr:first-child .rc-checkbox.rc-checkbox-checked'
					).length > 0
				) {
				} else {
					const { steps } = this.state
					steps.splice(0, data.index - 1)
					this.setState({
						steps
					})
					this.joyride.reset(true)
				}
			} else if (data.step.rule === 'checkbox2') {
				if (
					$(
						'.col-8.main-content tbody tr:nth-child(2) .rc-checkbox.rc-checkbox-checked'
					).length > 0
				) {
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
		$(
			'.col-8.main-content tbody tr:first-child td span, .col-8.main-content tbody tr:nth-child(2) td span'
		).on('click', function() {
			console.log('click clik')
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

export default HomeTour
