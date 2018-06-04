import React, { Component } from 'react'

class InputFormElement extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			value: ''
		}
	}

	render() {
		const { name, placeholder, passData } = this.props
		const { value } = this.state

		return (
			<input
				type="text"
				className="form-control form-control-lg rw-widget-container"
				placeholder={placeholder}
				value={value}
				onChange={e => {
					const textFromInput = e.target.value
					let result = {}
					result[name] = textFromInput
					passData(result)

					this.setState({
						value: textFromInput
					})
				}}
			/>
		)
	}
}

export default InputFormElement
