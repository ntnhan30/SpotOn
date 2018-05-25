import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../Assets/imgs/logo.svg'
import UsageGuidelinesPDF from '../../Assets/pdf/UsageGuidelinesPDF.pdf'

class Header extends Component {
	render() {
		const { profile } = this.props

		return (
			<header>
				<div className="container-fluid">
					<div className="col-2">
						<div className="logo">
							<Link to="/">
								<img src={Logo} alt="SpotOn" />
							</Link>
						</div>
					</div>

					<div className="col-10">
						<nav>
							<ul>
								<li>
									<Link to="/">Reports</Link>
								</li>
								<li>
									<Link to="/featured">Featured Ads</Link>
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
								<li>
									<Link to="/name_generator">
										Name Generator
									</Link>
								</li>
								<li>
									<a
										href={UsageGuidelinesPDF}
										target="_blank"
										id="usageGuidelinesPDF">
										User Guidelines
									</a>
								</li>
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
