import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../Assets/imgs/logo.svg'

class Header extends Component {
	render() {
		const profile = this.props.auth.getUserInfo()
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
