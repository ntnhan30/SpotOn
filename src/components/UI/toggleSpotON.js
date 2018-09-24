import React, { Component, Fragment } from 'react'
import ToggleButton from 'react-toggle-button'
import Modal from 'react-modal';
import { NamingCodes } from '../../components';


class ToggleSpotON extends Component {
	constructor(...args) {
		super(...args)

		this.state = {
			value: false,
			lightboxOpen: false
		}

		this.namingCodes = new NamingCodes()
	}

	closeModal = () => {
		this.setState({ lightboxOpen: false });
	}

	static getDerivedStateFromProps(nextProps, prevState, prevProps) {
		let { mode } = nextProps

		let value = mode === 'TV' ? true : false

		if (prevState.value !== value) {
			return { value }
		} else {
			return {}
		}
	}

	getNextMode = () => {
		let { mode } = this.props
		mode = mode === 'TV' ? 'YT' : 'TV'

		return (this.namingCodes.channels[mode])
	}

	render() {
		const self = this
		const { lightboxOpen } = this.state
		const { reset } = this.props


		const customStyles = {
			overlay: {
				backgroundColor: 'rgba(0, 0, 0, 0.75)'
			},
			content: {
				background: '#1c1e35',
				border: 'none',
				top: '50%',
				left: '50%',
				right: 'auto',
				bottom: 'auto',
				marginRight: '0',
				transform: 'translate(-50%, -50%)',
				WebkitOverflowScrolling: 'touch',
				padding: '70px'
			}
		}

		const colorFont = { color: '#010000' }
		return (
			<Fragment>
				<div className="modeToggleButton">
					<ToggleButton
						inactiveLabel={'YT'}
						activeLabel={'TV'}
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
							self.setState({
								value: !value,
								lightboxOpen: true
							})
						}}
					/>
				</div>


				<Modal
					isOpen={lightboxOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Changing SpotOn"
				>
					<div>
						<h1>You are changing to the {this.getNextMode()} section</h1>
						<button
							className="edit user btn"
							onClick={() => {
								this.closeModal()
								reset()
							}
							}>
							Yes, Take me there
						</button>
						<button
							className="edit user btn grey"
							onClick={() => {
								this.closeModal()
							}
							}>
							No, I don't want that
						</button>
					</div>
				</Modal>
			</Fragment>
		)
	}
}

export default ToggleSpotON
