var _ = require('lodash')

class CountAnswers {
	/**
	 * This takes an array with all the results from an AD and tabulates the, and
	 * analyses it to give the score for each KPI of Weighted Top Box.
	 *
	 * @param {Array} results        Array of objects of the ads
	 * @returns {Array}              Array of objects of single ad with the amount of answers
	 */
	init = results => {
		let result = []
		var partitionedByAd = _(results)
			.groupBy('VidDum')
			.values()
			.value()

		// eslint-disable-next-line
		partitionedByAd.map(single => {
			let countanswers = this.countAnswers(single)
			let cleaned = this.cleanOutput(countanswers)
			result.push(cleaned)
		})
		console.log(result)
		return result
	}

	/**
	 * This function counts the different values in the questionnaire
	 *
	 * @param {Array} ans            Array of objects od the ads
	 * @returns {Object}             Key is value, Values is the times it has been repeated
	 */
	countAnswers = ans => {
		let result = {}
		// eslint-disable-next-line
		ans.map(single => {
			for (let key in single) {
				const qKey = key.split('r')

				let k = qKey.length > 1 ? qKey[0] : key
				let i = qKey.length > 1 ? qKey[1] : single[key]

				result[k] = result[k] == null ? {} : result[k]
				result[k][i] = result[k][i] == null ? 0 : result[k][i]

				if (
					(qKey.length === 2 &&
						(single[key] === '1' || single[key] === 1)) ||
					qKey.length === 1
				) {
					result[k][i]++
				}
			}
			return true
		})
		return result
	}

	cleanOutput = single => {
		let result = {}

		const nameOfAd = this.getNameOfAd(single.VidDum)
		result['adName'] = nameOfAd
		result['toneOfVoice'] = single.Q3
		result['emotion'] = single.Q4
		result['sampleSize'] = this.getSampleSize(single.VidDum)

		return result
	}

	/**
	 * This function gets the adname
	 *
	 * @param {Array} arr            Array of objects where the adname is
	 * @returns {String}             Adname
	 */
	getNameOfAd = arr => {
		let result = ''
		for (let i in arr) {
			result = i
		}
		return result
	}

	/**
	 * This function gets the sample size
	 *
	 * @param {Array} arr            Array of objects where the adname is
	 * @returns {String}             Amount of sample size
	 */
	getSampleSize = arr => {
		let result = ''
		for (let i in arr) {
			result = arr[i]
		}
		return result
	}
}

export default CountAnswers
