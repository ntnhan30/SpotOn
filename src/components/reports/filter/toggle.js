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
		const { placeholder, keyName, filter, disabled } = this.props

		const colorFont = { color: '#010000' }


		const disabledClasss = disabled ? 'disabled' : null;

		return (
			<div className={"toggleButton " + disabledClasss}>
				{placeholder}
				<ToggleButton
					inactiveLabel={'OFF'}
					activeLabel={'ON'}
					disabled={disabled}
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
					value={self.state.value}
					onToggle={value => {
						if (!value === true) {
							filter([!value], keyName)
						} else {
							filter('', keyName)
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
