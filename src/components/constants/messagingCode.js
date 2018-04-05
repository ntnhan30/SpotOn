class MessagingCode {
	/**
	 * Turns the Messaging code on the Questionnaire to the respective text
	 *
	 * @param {Int} num                  Code of the selected message
	 * @returns {String}                 Equivalent Message
	 */
	init = num => {
		let result = ''
		switch (num) {
			case 1:
				result = 'We have a promotion, a deal or a discount'
				break
			case 2:
				result = 'We are easy to use'
				break
			case 3:
				result = 'We are for everyone'
				break
			case 4:
				result = 'We have the best quality'
				break
			case 5:
				result = 'We are the fastest in delivery'
				break
			case 6:
				result = 'We have the biggest variety'
				break
			case 7:
				result = "We have something other brands don't have"
				break
			case 8:
				result = 'We have something new to tell you'
				break
			case 9:
				result = 'We are a brand you can rely on'
				break
			default:
		}
		return result
	}
}

export default MessagingCode
