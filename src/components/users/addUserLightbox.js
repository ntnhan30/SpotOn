import React, { Component, Fragment } from 'react'
import Lightbox from 'lightbox-react'
import { AddUser } from '../../components'

class AddUserLightbox extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isOpen: false
		}
	}

	render() {
		const { isOpen } = this.state
		const { refreshUserList } = this.props

		return (
			<Fragment>
				<button
					className="edit user btn"
					onClick={() => this.setState({ isOpen: true })}>
					Add new user
				</button>

				{isOpen && (
					<Lightbox
						mainSrc={<AddUser refreshUserList={refreshUserList} />}
						onCloseRequest={() => this.setState({ isOpen: false })}
						enableZoom={false}
						clickOutsideToClose={true}
					/>
				)}
			</Fragment>
		)
	}
}
export default AddUserLightbox
