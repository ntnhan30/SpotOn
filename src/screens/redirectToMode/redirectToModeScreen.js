import React, { Component } from 'react'
import TvIcon from '../../Assets/imgs/tv-icon-upload.svg'
import YtIcon from '../../Assets/imgs/yt-icon-upload.svg'
import { Link } from 'react-router-dom'

class RedirectToModeScreen extends Component {

	render() {
		const { reset } = this.props
		return (
			<div className="container">
				<div className="row import-main boxed">
					<div className="col-6">
						<div>
							<img src={TvIcon} alt="TV" />
							<br />
							<Link
								to={{ pathname: '/TV' }}
								onClick={() => reset()}
							>
								<button className="btn">
									TV TESTING
								</button>
							</Link>
						</div>
					</div>

					<div className="col-6">
						<div>
							<img src={YtIcon} alt="YT" />
							<br />
							<Link
								to={{ pathname: '/YT' }}
								onClick={() => reset()}
							>
								<button className="btn">
									YOUTUBE TESTING
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default RedirectToModeScreen
