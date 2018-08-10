import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../Assets/imgs/logo.svg'
import UsageGuidelinesPDF from '../../Assets/pdf/UsageGuidelinesPDF.pdf'
import { AppContext, ToggleSpotON } from "../../components";

class Header extends Component {
	render() {
		const { profile, mode } = this.props

		const menuItem = (link, text, isPublic) => {
			if (isPublic) {
				return (
					<li>
						<Link to={link}>{text}</Link>
					</li>
				)
			} else {
				if (profile.right === 'admin') {
					return (
						<li>
							<Link to={link}>{text}</Link>
						</li>
					)
				} else {
					return null
				}
			}
		}

		return (
			<header>
				<div className="container-fluid">
					<div className="col-2">
						<div className="logo">
							<Link to={'/' + mode}>
								<img src={Logo} alt="SpotOn" />
							</Link>
							<AppContext>
								{context => (
									<ToggleSpotON
										init={context.init}
										reset={context.reset}
										mode={context.mode}
									/>
								)}
							</AppContext>
						</div>
					</div>

					<div className="col-10">
						<nav>
							<ul>
								{menuItem('/' + mode, 'Reports', true)}
								{menuItem('/' + mode + '/featured', 'Featured Ads', true)}
								{menuItem('/import', 'Import', false)}
								{menuItem(
									'/notifications',
									'Notifications',
									true
								)}
								{menuItem(
									'/name_generator',
									'Name Generator',
									true
								)}
								{menuItem('/users', 'Users', false)}
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
