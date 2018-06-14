import React, { Component, Fragment } from 'react'
import { Api, NamingCodes, MultiselectFormElement } from '../../components'


class Notifications extends Component {
	constructor(...args) {
		super(...args)

		this.api = new Api()
		this.namingCodes = new NamingCodes()
		this.state = {
			values: {
				industries: [],
				brands: []
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
		const { brands, industries } = this.namingCodes

		const getValuesFromInputs = newObj => {
			for (var key in newObj) {
				values[key] = newObj[key]
			}

			self.setState({ values })

			this.api.updateUserSubscriptions(this.props.profile.email, values)
		}

		return (
			<Fragment>
				<div className="container">
					<h1>Notifications</h1>
					<br />

					<h4>Brands:</h4>
					<MultiselectFormElement
						name={'brands'}
						data={brands}
						passData={getValuesFromInputs}
						values={values.brands}
					/>

					<h4>Industries:</h4>
					<MultiselectFormElement
						name={'industries'}
						data={industries}
						passData={getValuesFromInputs}
						values={values.industries}
					/>
				</div>
			</Fragment>
		)
	}
}

export default Notifications
