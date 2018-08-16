import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import {
	AppContext,
} from '../../components'

class RedirectToModeScreen extends Component {

	render() {

		const { reset } = this.props

		const changeMode = () => {
			reset()
		}

		return (
			<AppContext.Consumer>
				{context => (
					<div className="container">
						<div className="row boxed">
							<div className="container">
								<h1>Go to</h1>
							</div>
							<div className="container">
								<Link to={{ pathname: '/TV' }}>
									TV
								</Link>
								<br />
								<Link to={{ pathname: '/YT' }}>
									YoutTube
								</Link>
							</div>
						</div>
					</div>
				)}
			</AppContext.Consumer>
		)
	}
}

export default RedirectToModeScreen
