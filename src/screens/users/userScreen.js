import React, { Component } from 'react'

class Users extends Component {
	render() {
		return (
			<div className="container-fluid">
				<h1>Users</h1>

				<h4>Here are the functionalities:</h4>
				<ul>
					<li>
						<b>Auth0 Login / Logout </b>
					</li>
					<li>
						<b>Set user rights -> </b>
						<ul>
							<li>
								<b>Admin (Views everything, set permissions)</b>
							</li>
							<li>
								<b>Manager (Views everything)</b>
							</li>
							<li>
								<b>Limited (only sees his brands reports)</b>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		)
	}
}

export default Users
