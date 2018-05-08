import React, { Component, Fragment } from 'react'
import Lightbox from 'lightbox-react'

class VideoLightbox extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isOpen: false
		}
	}

	render() {
		const { photoIndex, isOpen } = this.state
		let { url, image } = this.props
		url += '/preview'

		const iframe = <iframe src={url} width="640" height="480" />

		return (
			<Fragment>
				<div
					className="watch-ad"
					onClick={() => this.setState({ isOpen: true })}>
					<img src={image} alt="Watch the ad" />
					<span className="icon-play" />
				</div>

				{isOpen && (
					<Lightbox
						mainSrc={iframe}
						onCloseRequest={() => this.setState({ isOpen: false })}
						enableZoom={false}
						clickOutsideToClose={true}
					/>
				)}
			</Fragment>
		)
	}
}
export default VideoLightbox
