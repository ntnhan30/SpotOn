import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class RedirectToModeScreen extends Component {

	render() {
		return (
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
		)
	}
}

export default RedirectToModeScreen
