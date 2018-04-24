import React, { Component, Fragment } from 'react'
import { SelectReports, Login } from '../../screens'
import { ErrorBoundary, AppContext } from '../../components'

class HomeScreen extends Component {
	render() {
		const isAuthenticated = this.props.auth.isAuthenticated()
		return (
			<AppContext.Consumer>
				{context => (
					<ErrorBoundary>
						<Fragment>
							{!isAuthenticated && (
								<Login auth={this.props.auth} />
							)}
							{isAuthenticated && (
								<SelectReports
									auth={this.props.auth}
									isInsideReport={context.isInsideReport}
								/>
							)}
						</Fragment>
					</ErrorBoundary>
				)}
			</AppContext.Consumer>
		)
	}
}

export default HomeScreen
