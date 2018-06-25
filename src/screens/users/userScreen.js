import React, { Component } from 'react'
import { Api, UserList, AddUserLightbox } from '../../components'

class UserDashboardScreen extends Component {
	constructor() {
		super()

		this.state = {
			users: []
		}

		this.api = new Api()
	}

	async componentDidMount() {
		// Get all Users from the server and set the state
		const users = await this.api.fetchAllUsers()
		this.setState({ users })
	}

	render() {
		const refreshUserList = async () => {
			// Get all Users from the server and set the state
			const users = await this.api.fetchAllUsers()
			this.setState({ users })
		}

		const { users } = this.state
		return (
			<div className="container">
				<div className="row user-screen boxed">
					<div className="col-8">
						<h1>User dashboard</h1>
					</div>
					<div className="col-4">
						<AddUserLightbox refreshUserList={refreshUserList} />
					</div>
					<div className="col-12">
						<UserList
							users={users}
							refreshUserList={refreshUserList}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default UserDashboardScreen
