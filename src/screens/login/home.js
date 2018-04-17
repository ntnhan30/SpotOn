import React, { Component, Fragment } from 'react'
import { SelectReports, Login } from '../../screens'
import { ErrorBoundary } from '../../components'

class HomeScreen extends Component {
	render() {
		const isAuthenticated = this.props.auth.isAuthenticated()
		return (
			<ErrorBoundary>
				<Fragment>
					{!isAuthenticated && <Login auth={this.props.auth} />}
					{isAuthenticated && (
						<SelectReports auth={this.props.auth} />
					)}
				</Fragment>
			</ErrorBoundary>
		)
	}
}

export default HomeScreen
