import React, { Component, Fragment } from 'react'
import {
	//BrowserRouter as Router,
	Router,
	Switch,
	Route,
	Redirect,
	withRouter
} from 'react-router-dom'
import { Header, AppContext, ErrorBoundary } from './components'
import {
	Import,
	Notifications,
	SingleAd,
	Login,
	Logout,
	Callback,
	HomeScreen,
	UserGuideScreen,
	FeaturedScreen,
	NameGenerator,
	UserDashboardScreen
} from './screens'

import Auth from './components/auth/auth.js'
import history from './components/auth/history'

// Import the minified css
import './Assets/css/default.min.css'

const auth = new Auth()

const AuthButton = withRouter(
	({ history }) =>
		auth.isAuthenticated() ? (
			<AppContext.Consumer>
				{context => <Header auth={auth} profile={context.profile} />}
			</AppContext.Consumer>
		) : null
)

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			auth.isAuthenticated() ? (
				<AppContext.Consumer>
					{context => (
						<ErrorBoundary>
							<Component
								auth={auth}
								ads={context.ads}
								profile={context.profile}
								{...props}
							/>
						</ErrorBoundary>
					)}
				</AppContext.Consumer>
			) : (
				<Redirect
					to={{
						pathname: '/',
						state: { from: props.location }
					}}
				/>
			)
		}
	/>
)

class App extends Component {
	render() {
		return (
			<Router history={history}>
				<Fragment>
					<AuthButton />
					<Switch>
						<PrivateRoute path="/import" component={Import} />
						<PrivateRoute
							path="/featured"
							component={FeaturedScreen}
						/>
						<PrivateRoute
							path="/notifications"
							component={Notifications}
						/>
						<PrivateRoute path="/ad/:id" component={SingleAd} />
						<Route
							exact
							path="/FAQ"
							render={props => (
								<UserGuideScreen auth={auth} {...props} />
							)}
						/>
						<Route
							exact
							path="/name_generator"
							render={props => (
								<NameGenerator auth={auth} {...props} />
							)}
						/>
						<PrivateRoute
							path="/users"
							component={UserDashboardScreen}
						/>
						<Route
							exact
							path="/login"
							render={props => <Login auth={auth} {...props} />}
						/>
						<Route
							exact
							path="/logout"
							render={props => <Logout auth={auth} {...props} />}
						/>
						<Route
							exact
							path="/callback"
							render={props => {
								return (
									<AppContext.Consumer>
										{context => (
											<Callback
												auth={auth}
												changeLogin={this.changeLogin}
												init={context.init}
												{...props}
											/>
										)}
									</AppContext.Consumer>
								)
							}}
						/>
						<Route
							path="/"
							render={props => (
								<HomeScreen auth={auth} {...props} />
							)}
						/>
					</Switch>
				</Fragment>
			</Router>
		)
	}
}

export default App
