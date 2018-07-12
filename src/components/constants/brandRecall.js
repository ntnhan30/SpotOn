import FuzzySet from 'fuzzyset.js'
//var _ = require('lodash')

class BrandRecall {
	init = (nameToCheck, correctName) => {
		const length = this.checkLenghtOfWord(nameToCheck, correctName)

		let a = FuzzySet(['Lieferheld'])
		a.get('micael asiak')

		//console.log(a.get('Liefer Held'))

		//console.log(length)
		return length
	}

	checkLenghtOfWord = (nameToCheck, correctName) => {
		const lengthToCheck = nameToCheck.length
		const length = correctName.length

		let diff = length - lengthToCheck
		diff = diff < 0 ? diff * -1 : diff

		let percentage = diff / length

		return percentage
	}

	checkLenghtOfWord = (nameToCheck, correctName) => {
		const lengthToCheck = nameToCheck.length
		const length = correctName.length

		let diff = length - lengthToCheck
		diff = diff < 0 ? diff * -1 : diff

		let percentage = diff / length

		return percentage
	}
}

export default BrandRecall
