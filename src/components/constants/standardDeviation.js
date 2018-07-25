class StandardDeviation {
	/**
	 * This takes an array with all the results from an AD and tabulates the, and
	 * analyses it to give the score for each KPI of Weighted Top Box.
	 *
	 * @param {Array} values        Array of objects of the ads
	 * @returns {Array}              Array of objects of single ad with the amount of answers
	 */
	init = values => {
		var avg = this.average(values);

		var squareDiffs = values.map(function (value) {
			var diff = value - avg;
			var sqrDiff = diff * diff;
			return sqrDiff;
		});

		var avgSquareDiff = this.average(squareDiffs);

		var stdDev = Math.sqrt(avgSquareDiff);
		return stdDev;
	}

	average = data => {
		var sum = data.reduce(function (sum, value) {
			return sum + value;
		}, 0);

		var avg = sum / data.length;
		return avg;
	}
}

export default StandardDeviation
