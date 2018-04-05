import React, { Component, Fragment } from 'react'
import { SelectReports, Login } from '../../screens'

class HomeScreen extends Component {
	render() {
		const isAuthenticated = this.props.auth.isAuthenticated()
		return (
			<Fragment>
				{!isAuthenticated && <Login auth={this.props.auth} />}
				{isAuthenticated && <SelectReports auth={this.props.auth} />}
			</Fragment>
		)
	}
}

export default HomeScreen
