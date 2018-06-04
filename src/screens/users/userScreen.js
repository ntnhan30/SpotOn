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
				<AddUserLightbox refreshUserList={refreshUserList} />
				<UserList users={users} refreshUserList={refreshUserList} />
			</div>
		)
	}
}

export default UserDashboardScreen
