import React, { Component } from 'react'
import { Api, NamingCodes, MultiselectFormElement } from '../../components'

class Notifications extends Component {
	constructor(...args) {
		super(...args)

		this.api = new Api()
		this.namingCodes = new NamingCodes()
		this.state = {
			values: {
				industries: [],
				countries: []
			}
		}
	}

	static getDerivedStateFromProps(nextProps, prevState, prevProps) {
		let { subscriptions } = nextProps.profile
		return subscriptions !== undefined
			? {
				values: subscriptions
			}
			: null
	}

	render() {
		const self = this
		let { values } = this.state
		const { industries, countries } = this.namingCodes

		const getValuesFromInputs = newObj => {
			for (var key in newObj) {
				values[key] = newObj[key]
			}

			self.setState({ values })
		}

		return (
			<div className="container">
				<div className="row notification-screen boxed">
					<div className="col-12">
						<h1>Hi, this is your notifications page!</h1>
						<p>
							Here you can pick brands and industries which you
							wish to follow. Once subscribed, you’ll receive
							notifications both via email and in SpotON whenever
							new content matching your interests is uploaded,
							which you'll find right here.
							<br />
							Enjoy!
						</p>
					</div>

					<div className="col-6">
						<h4>Countries:</h4>
						<MultiselectFormElement
							name={'countries'}
							data={countries}
							passData={getValuesFromInputs}
							values={values.countries}
						/>
					</div>

					<div className="col-6">
						<h4>Industries:</h4>
						<MultiselectFormElement
							name={'industries'}
							data={industries}
							passData={getValuesFromInputs}
							values={values.industries}
						/>
					</div>

					<div className="col-12">
						<button
							className="btn download"
							onClick={async () => {
								const update = await this.api.updateUserSubscriptions(this.props.profile.email, values)
								console.log(update)
							}}
						>
							Save changes
						</button>
						{

						}
					</div>
				</div>
			</div>
		)
	}
}

export default Notifications
