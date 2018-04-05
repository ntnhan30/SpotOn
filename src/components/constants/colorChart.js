class ColorChart {
	/**
	 * Get a color to use for the charts.
	 *
	 * @param {Int} num              Key of the color
	 * @returns {String}             The color in HEX to use
	 */
	getColor = num => {
		let colorToReturn = ''
		switch (num % 10) {
			case 0:
				colorToReturn = '#232aa8'
				break
			case 1:
				colorToReturn = '#414bff'
				break
			case 2:
				colorToReturn = '#5697ff'
				break
			case 3:
				colorToReturn = '#6ae3ff'
				break
			case 4:
				colorToReturn = '#6752ff'
				break
			case 5:
				colorToReturn = '#8c5aff'
				break
			case 6:
				colorToReturn = '#b850d6'
				break
			case 7:
				colorToReturn = '#c32d83'
				break
			case 8:
				colorToReturn = '#e60a3b'
				break
			case 9:
				colorToReturn = '#bf0a1b'
				break
			default:
		}
		return colorToReturn
	}

	/**
	 * Get a color to use for the charts in the norm lines.
	 *
	 * @param {Int} num              Key of the color
	 * @returns {String}             The color in HEX to use
	 */
	getNormColor = num => {
		let colorToReturn = ''
		switch (num) {
			case 0:
				colorToReturn = '#bd4f1e'
				break
			case 1:
				colorToReturn = '#d26c24'
				break
			case 2:
				colorToReturn = '#e68829'
				break
			default:
		}
		return colorToReturn
	}

	/**
	 * Get a color to use for the progress circles. This color depends on the value.
	 *
	 * @param {Int} num              Key of the color
	 * @returns {String}             The color in HEX to use
	 */
	getProgressColor = num => {
		const step = Math.floor(num / 25)
		let colorToReturn = ''
		switch (step) {
			case 0:
				colorToReturn = '#bf0a1b'
				break
			case 1:
				colorToReturn = '#ec9034'
				break
			case 2:
				colorToReturn = '#cfbb3c'
				break
			case 3:
			case 4:
				colorToReturn = '#4db53c'
				break
			default:
		}
		return colorToReturn
	}
}

export default ColorChart
