import React, { Component } from 'react'

class Favourite extends Component {
	handleClick = () => {
		const { adname, isFavorite } = this.props
		this.props.updateFavourites(adname, !isFavorite)
	}

	render() {
		const { isFavorite } = this.props

		return (
			<span
				onClick={this.handleClick}
				className={(isFavorite ? 'favourite' : '') + ' icon-heart'}
			/>
		)
	}
}

export default Favourite
