class UserRights {
	/**
	 * Get the user right
	 *
	 * @param {String} email                 Email address of the logged in user
	 * @returns {Object}                     User rights - Countries available
	 */
	init(email) {
		let result = {}
		switch (email) {
			case 'mats.diedrichsen@deliveryhero.com':
			case 'dan.zbijowski@deliveryhero.com':
			case 'andres.guevara@deliveryhero.com':
			case 'sofia.tavares@deliveryhero.com':
			case 'marina.kramer@deliveryhero.com':
			case 'michael.wicke@deliveryhero.com':
			case 'ross.mcpheat@deliveryhero.com':
			case 'caroline.stephenson@deliveryhero.com':
			case 'cristina.dohi@deliveryhero.com':
			case 'julien.hubert@deliveryhero.com':
			case 'katarzyna.zablocka@deliveryhero.com':
			case 'ines.fernandez@deliveryhero.com':
			case 'frederic.lamotte@deliveryhero.com':
			case 'aleksej.koscejev@deliveryhero.com':
			case 'isabella.homann@deliveryhero.com':
			case 'sophie.connolly@deliveryhero.com':
			case 'filippo.gallignani@deliveryhero.com':
			case 'nikolay.abrosov@pizza.de':
				result.country = ['Colombia', 'Germany']
				result.right = 'admin'
				break
			case 'anna.permyakova@deliveryhero.com':
				result.country = ['Germany']
				result.right = 'limited'
				break
			case 'koviljka.neskovic@deliveryhero.com':
				result.country = ['Colombia']
				result.right = 'admin'
				break
			default:
				result.country = ['']
				result.right = 'none'
				break
		}
		return result
	}
}

export default UserRights
