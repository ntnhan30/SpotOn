import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Logout extends Component {
	logout() {
		this.props.auth.logout()
	}

	render() {
		this.logout()

		return (
			<Redirect
				to={{
					pathname: '/'
				}}
			/>
		)
	}
}

export default Logout
