import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../Assets/imgs/logo.svg'

class Header extends Component {
	constructor() {
		super()
		this.state = {
			profile: {}
		}
	}

	async componentDidMount() {
		const profile = await this.props.auth.getUserInfo()
		this.setState({
			profile
		})
	}
	render() {
		const { profile } = this.state

		return (
			<header>
				<div className="container-fluid">
					<div className="col-2">
						<div className="logo">
							<img src={Logo} alt="SpotOn" />
						</div>
					</div>

					<div className="col-10">
						<nav>
							<ul>
								<li>
									<Link to="/">Reports</Link>
								</li>
								{profile.right === 'admin' && (
									<li>
										<Link to="/import">Import</Link>
									</li>
								)
								/*
                                    (profile.right === 'admin' ) && (
                                    <li>
                                        <Link to='/notifications'>Notifications</Link>
                                    </li>
                                    )

                                    (profile.right === 'admin' ) && (
                                        <li>
                                            <Link to='/users'>Users</Link>
                                        </li>
									)
									<li>
										<Link to="/FAQ">FAQ</Link>
									</li>
                                */
								}
							</ul>
							<Link to="/logout">Logout</Link>
						</nav>
					</div>
				</div>
			</header>
		)
	}
}

export default Header
