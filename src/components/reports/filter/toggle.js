import React, { Component } from 'react'
import ToggleButton from 'react-toggle-button'

class CreateToggle extends Component {
	constructor(...args) {
		super(...args)

		this.state = {
			value: false
		}
	}

	render() {
		const self = this
		const key = this.props.keyName

		const colorFont = { color: '#010000' }

		return (
			<div className="toggleButton">
				Only favourites?
				<ToggleButton
					inactiveLabel={'OFF'}
					activeLabel={'ON'}
					colors={{
						activeThumb: {
							base: '#414bff'
						},
						inactiveThumb: {
							base: '#010000'
						},
						active: {
							base: 'rgba(255,255,255,0.7)',
							hover: 'rgba(255,255,255,0.65)'
						},
						inactive: {
							base: 'rgba(255,255,255,0.7)',
							hover: 'rgba(255,255,255,0.65)'
						}
					}}
					activeLabelStyle={colorFont}
					inactiveLabelStyle={colorFont}
					thumbAnimateRange={[0, 34]}
					//thumbIcon={<ThumbIcon />}
					value={self.state.value}
					onToggle={value => {
						if (!value === true) {
							self.props.filter([!value], key)
						} else {
							self.props.filter([!value, value], key)
						}
						self.setState({
							value: !value
						})
					}}
				/>
			</div>
		)
	}
}

export default CreateToggle
