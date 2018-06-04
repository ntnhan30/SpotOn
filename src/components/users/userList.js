import React, { Component } from 'react'
import { Api } from '../../components'

class UserList extends Component {
	deleteUser = async email => {
		const api = new Api()

		await api.removeUser(email)

		this.props.refreshUserList()
	}

	render = () => {
		let { users } = this.props

		const tableHeader = (
			<tr>
				<th scope="col">Email</th>
				<th scope="col">Right</th>
				<th scope="col">Countries</th>
				<th scope="col">Opened SpotOn</th>
				<th scope="col">Remove</th>
			</tr>
		)

		const listOfUsers = users.map((user, i) => {
			const firstTime = user.firstTime ? 'no' : 'yes'
			const countries =
				user.right === 'admin' ? 'all' : user.countries.join(', ')
			return (
				<tr key={i}>
					<td>{user.email}</td>
					<td>{user.right}</td>
					<td>{countries}</td>
					<td>{firstTime}</td>
					<td>
						<span
							className="icon-trash"
							onClick={() => {
								this.deleteUser(user.email)
							}}
						/>
					</td>
				</tr>
			)
		})

		return (
			<table className="table table-striped table-hover table-fixed">
				<thead className="">{tableHeader}</thead>
				<tbody>{listOfUsers}</tbody>
			</table>
		)
	}
}

export default UserList
