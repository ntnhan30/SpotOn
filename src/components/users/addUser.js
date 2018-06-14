import React, { Component } from 'react'
import {
	InputFormElement,
	NamingCodes,
	DropdownFormElement,
	MultiselectFormElement,
	Api
} from '../../components'
var _ = require('lodash')

class AddUser extends Component {
	constructor(...args) {
		super(...args)

		this.api = new Api()
		this.namingCodes = new NamingCodes()
		this.state = {
			values: {},
			error: '',
			done: false
		}
	}

	validation = () => {
		const { values } = this.state

		// eslint-disable-next-line
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim

		if (!re.test(values.email)) {
			return 'Please enter a valid email'
		}
		if (values.right === undefined || values.right <= 0) {
			return 'Please select a right for the user'
		}
		if (values.right === 'limited') {
			if (values.countries === undefined || values.countries <= 0) {
				return 'Please select countries'
			}
		}
		return ''
	}

	addUserToServer = async () => {
		const { values } = this.state
		const error = this.validation()

		if (error.length <= 0) {
			const created = await this.api.addUser(
				values.email,
				values.countries,
				values.right
			)
			if (created) {
				this.props.refreshUserList()
				this.setState({ done: true })
			}
		} else {
			this.setState({ error })
		}
	}

	render() {
		const self = this

		let { values, error, done } = this.state
		const rights = ['admin', 'limited']
		const { countries } = this.namingCodes

		const getValuesFromInputs = newObj => {
			values = _.merge(values, newObj)
			self.setState({ values })
		}

		const formToAdd = (
			<div className="lightbox">
				<h1>Add User</h1>
				<div className={'form'}>
					{error !== '' && <span>{error}</span>}

					<InputFormElement
						name={'email'}
						placeholder={'Enter Email'}
						passData={getValuesFromInputs}
					/>

					<DropdownFormElement
						name={'right'}
						data={rights}
						passData={getValuesFromInputs}
					/>

					{values.right === 'limited' && (
						<MultiselectFormElement
							name={'countries'}
							data={countries}
							passData={getValuesFromInputs}
							values={values.countries}
						/>
					)}

					<p className={'btn'} onClick={this.addUserToServer}>
						Add User
					</p>
				</div>
			</div>
		)

		const successfullMessage = (
			<div className="lightbox">
				<h2>
					User created for: <strong>{values.email}</strong>
				</h2>
			</div>
		)

		if (!done) {
			return formToAdd
		} else {
			return successfullMessage
		}
	}
}
export default AddUser
