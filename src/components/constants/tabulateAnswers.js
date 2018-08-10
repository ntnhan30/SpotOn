import { Api, CountAnswers } from '../../components'
//import FuzzySet from 'fuzzyset.js'

var _ = require('lodash')

class TabulateAnswers {
	constructor() {
		this.api = new Api()
		this.countAnswers = new CountAnswers()
		this.ads = {}
	}

	/**
	 * This Class takes an array with all the results from an AD and tabulates the, and
	 * analyses it to give the score for each KPI of Weighted Top Box.
	 *
	 * @param {Array} results                 Array of Object of counted results
	 * @returns {Array}                       Array of Object with the results of each spot
	 */
	init = async results => {
		let result = []
		var partitionedByAd = _(results)
			.groupBy('VidDum')
			.values()
			.value()

		// eslint-disable-next-line
		await Promise.all(
			partitionedByAd.map(async single => {
				let count = this.countAnswers.countAnswers(single)
				console.log(count)
				let kpis = await this.kpiCalculation(count)
				let mainKpis = this.mainKPI(kpis)
				result.push(mainKpis)
			})
		)

		return result
	}

	binaryScale = arr => {
		let result = 0
		let count = 0
		let maxCount = 0
		for (let i in arr) {
			if (parseFloat(i) === 1) {
				count += arr[i]
			}
			maxCount += arr[i]
		}
		result = maxCount > 0 ? parseFloat(count / maxCount * 100) : 0
		// Invert result
		result = 100 - result
		return result
	}

	checkBrandRecall = (arr, adname) => {
		//this.ads
		//console.log(this.ads)
		//let thisAd = _.find(this.ads, o => o.adname === adname)
		//console.log(this.ads[adname].brand)
		//console.log(arr)

		let result = 0
		let count = 0
		let maxCount = 0
		for (let i in arr) {
			// for each name
			if (parseFloat(i) === 1) {
				/*
				let a = FuzzySet(['Lieferheld'])
				a.get(i)
				*/
				count += arr[i]
			}
			maxCount += arr[i]
		}
		result = maxCount > 0 ? parseFloat(count / maxCount * 100) : 0
		// Invert result
		result = 100 - result
		return result
	}

	likertScale = arr => {
		let result = 0
		let count = 0
		let maxCount = 0
		for (let i in arr) {
			switch (parseFloat(i)) {
				case 1:
					count += arr[i] * 3.4
					maxCount += arr[i] * 3.4
					break
				case 2:
					count += arr[i] * 1.4
					maxCount += arr[i] * 1.4
					break
				case 3:
					maxCount += arr[i] * 0.4
					break
				case 4:
					maxCount += arr[i] * 1.4
					break
				case 5:
					maxCount += arr[i] * 3.4
					break
				default:
			}
		}
		result = maxCount > 0 ? parseFloat(count / maxCount * 100) : 0
		return result
	}

	messagingCalculation = async (arr, nameOfAd) => {
		console.log('===============================')
		console.log('===============================')
		console.log('nameOfAd')
		console.log(nameOfAd)

		let result = 0
		// Sample Size

		// CHECK THIS PLEASE **********
		// this is only for now, because the user selected 3 options. Delete later
		let sampleSize = 0
		_.forEach(arr, function (v, k) {
			console.log('===')
			console.log('[' + k + '] => ' + v)

			//const value = k === '98' ? v * 3 : v
			//sampleSize += value
			const value = v
			sampleSize += value

			console.log(value + ' -- ' + sampleSize)
		})
		/*
		console.log(nameOfAd)
		console.log(arr)
		console.log(sampleSize)
		console.log('+++++++++++++++++++')
		*/

		const singleAd = this.ads[nameOfAd]

		console.log('thisAd')
		console.log(singleAd)

		// Get the Main Messages from the Ad
		const mainMessage = singleAd.mainMessage
		const secondaryMessage = singleAd.secondaryMessage
		const tertiaryMessage = singleAd.tertiaryMessage

		// Weighted values of main messages
		const valueMainMessage = arr[mainMessage]
		const valueSecondaryMessage = arr[secondaryMessage] * 0.6
		const valueTertiaryMessage = arr[tertiaryMessage] * 0.5

		if (secondaryMessage === null || secondaryMessage === 0) {
			// If there is only a Primary Message
			const A = valueMainMessage / sampleSize * 100
			const B = (sampleSize - arr[mainMessage]) / 9 / sampleSize * 100
			result = A + B
		} else if (tertiaryMessage === null || tertiaryMessage === 0) {
			// If there is a Primary and Secondary message
			console.log('valueMainMessage')
			console.log(valueMainMessage)
			console.log('valueSecondaryMessage')
			console.log(valueSecondaryMessage)
			console.log('sampleSize')
			console.log(sampleSize)
			result =
				(valueMainMessage / sampleSize +
					valueSecondaryMessage / sampleSize) *
				100
		} else {
			// If there is a Primary, Secondary and Tertiary message
			const A =
				(valueMainMessage / sampleSize +
					valueSecondaryMessage / sampleSize) *
				100
			const randomness =
				(sampleSize - (arr[mainMessage] + arr[secondaryMessage])) / 8
			const C = (valueTertiaryMessage - randomness) / sampleSize * 100
			result = A + C
		}

		console.log('result')
		console.log(result)
		return result
	}

	toneOfVoiceCalculation = arr => {
		let result = 0
		let count = 0
		let maxCount = 0
		for (let i in arr) {
			switch (parseFloat(i)) {
				case 1:
				case 2:
				case 3:
				case 4:
					count += arr[i] * 3.5
					maxCount += arr[i] * 3.5
					break
				case 5:
				case 6:
				case 7:
				case 8:
					count += arr[i] * 1.5
					maxCount += arr[i] * 1.5
					break
				case 9:
				case 10:
				case 11:
				case 12:
					maxCount += arr[i] * 1.5
					break
				case 13:
				case 14:
				case 15:
				case 16:
					maxCount += arr[i] * 3.5
					break
				default:
			}
		}
		result = maxCount > 0 ? parseFloat(count / maxCount * 100) : 0
		return result
	}

	emotionCalculation = arr => {
		let result = 0
		let count = 0
		let maxCount = 0
		for (let i in arr) {
			switch (parseFloat(i)) {
				case 1:
				case 2:
				case 3:
					count += arr[i] * 3.5
					maxCount += arr[i] * 3.5
					break
				case 4:
				case 5:
				case 6:
					count += arr[i] * 1.5
					maxCount += arr[i] * 1.5
					break
				case 7:
				case 8:
				case 9:
					maxCount += arr[i] * 1.5
					break
				case 10:
				case 11:
				case 12:
					maxCount += arr[i] * 3.5
					break
				default:
			}
		}
		result = maxCount > 0 ? parseFloat(count / maxCount * 100) : 0
		return result
	}

	getNameOfAd = arr => {
		let result = ''
		for (let i in arr) {
			result = i
		}
		return result
	}

	kpiCalculation = async arr => {
		const self = this
		let result = {}

		// Get info of the Ad from the server
		const nameOfAd = this.getNameOfAd(arr.VidDum)
		const singleAd = await this.api.fetchSingleAd(nameOfAd)
		this.ads[nameOfAd] = singleAd

		for (let i in arr) {
			switch (i) {
				/*** Binary scale
				case 'Q1o1':
                    - Brand Recal
                    
					result.brandRecall = this.checkBrandRecall(
						arr[i],
						this.getNameOfAd(arr['VidDum'])
					)
					break
				*/
				/*** Binary scale
				 * Brand Recall
				*/
				case 'Q1o2':
					result.brandRecall = this.binaryScale(arr[i])
					break

				case 'Q2':
					/*** Likert Scale
					- Ad appeal
					*/
					result.adAppeal = this.likertScale(arr[i])
					break
				case 'Q5o1':
					/*** Likert Scale
					- Uniqueness
					*/
					result.uniqueness = this.likertScale(arr[i])
					break
				case 'Q5o2':
					/*** Likert Scale
					- Relevance
					*/
					result.relevance = this.likertScale(arr[i])
					break
				case 'Q5o3':
					/*** Likert Scale
					- Shareability
					*/
					result.shareability = this.likertScale(arr[i])
					break
				case 'Q6':
					/*** Likert Scale
					- Call to action
					*/
					result.callToAction = this.likertScale(arr[i])
					break
				case 'Q8':
					/*** Likert Scale
                    - Brand fit
                    */
					result.brandFit = this.likertScale(arr[i])
					break
				case 'Q3':
					/*** Tone of voice
					 */
					result.toneOfVoice = this.toneOfVoiceCalculation(arr[i])
					break
				case 'Q4':
					/*** Emotion
					 */
					result.emotion = this.emotionCalculation(arr[i])
					break
				case 'Q7':
					/*** MessagingCalculation
					 */
					const nameOfAd = self.countAnswers.getNameOfAd(arr.VidDum)
					result.messaging = await this.messagingCalculation(
						arr[i],
						nameOfAd
					)
					break
				case 'VidDum':
					result['adname'] = this.getNameOfAd(arr[i])
					break
				default:
			}
		}
		return result
	}

	mainKPI = arr => {
		let result = arr

		result.brandRelevance =
			parseFloat(arr.brandRecall) * 0.3 +
			parseFloat(arr.relevance) * 0.4 +
			parseFloat(arr.brandFit) * 0.3
		result.viewerEngagement =
			parseFloat(arr.adAppeal) * 0.3 +
			parseFloat(arr.shareability) * 0.1 +
			parseFloat(arr.callToAction) * 0.6
		result.adMessage =
			parseFloat(arr.toneOfVoice) * 0.3 +
			parseFloat(arr.emotion) * 0.3 +
			parseFloat(arr.uniqueness) * 0.2 +
			parseFloat(arr.messaging) * 0.2
		result.total =
			parseFloat(result.brandRelevance) * 0.3 +
			parseFloat(result.viewerEngagement) * 0.4 +
			parseFloat(result.adMessage) * 0.3

		return result
	}
}

export default TabulateAnswers
