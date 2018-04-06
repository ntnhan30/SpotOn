import React, { Component } from 'react'
import Joyride from 'react-joyride'

class Tour extends Component {
	render() {
		const autoStart = false
		const joyrideSteps = [
			{
				title: 'This is the filter',
				textAlign: 'center',
				selector: '#filter',
				position: 'right',
				type: 'hover',
				isFixed: true
			},
			{
				text: 'this is the spots',
				selector: '.table-fixed tbody',
				position: 'left',
				type: 'hover',
				isFixed: true
			},
			{
				title: 'This is selected ads',
				text: 'This step tests what happens when a target is missing',
				selector: '#selected',
				position: 'right',
				type: 'hover',
				isFixed: true
			}
		]

		return (
			<Joyride
				debug={true}
				disableOverlay={false}
				scrollToFirstStep
				type="continuous"
				run={true}
				autoStart={autoStart}
				steps={joyrideSteps}
				ref={c => (this.joyride = c)}
				callback={this.handleJoyrideCallback}
			/>
		)
	}
}

export default Tour
