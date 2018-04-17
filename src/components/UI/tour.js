import React, { Component } from 'react'
//import Joyride from 'react-joyride'

class Tour extends Component {
	render() {
		const autoStart = false // Change to true
		const type = 'click' // Change to 'hover'
		const joyrideSteps = [
			{
				title: 'This is the filter',
				textAlign: 'center',
				selector: '#filter',
				position: 'right',
				type: type,
				isFixed: true
			},
			{
				text: 'this is the spots',
				selector: '.table-fixed tbody',
				position: 'left',
				type: type,
				isFixed: true
			},
			{
				title: 'This is selected ads',
				text: 'This step tests what happens when a target is missing',
				selector: '#selected',
				position: 'right',
				type: type,
				isFixed: true
			}
		]

		return (
			/*
			<Joyride
				debug={false}
				disableOverlay={false}
				scrollToFirstStep
				type="continuous"
				run={true}
				autoStart={autoStart}
				steps={joyrideSteps}
				ref={c => (this.joyride = c)}
				callback={this.handleJoyrideCallback}
			/>
			*/

			<div>Tour</div>
		)
	}
}

export default Tour
